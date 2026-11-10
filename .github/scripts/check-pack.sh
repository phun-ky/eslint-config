#!/usr/bin/env bash
# Checks the package the way a consumer gets it.
#
# Packs eslint-config-phun-ky, installs the tarball with ESLint 10 and
# Prettier in an empty project, uses the README usage example as that
# project's eslint.config.js, and lints JS, TS and Markdown fixtures:
#
# - clean fixtures (and the README example itself) have no problems,
# - test files are linted, with Node globals,
# - problem fixtures report the expected rule ids,
# - no file has a parsing error or is ignored,
# - ESLint doesn't crash on the config, and --fix finds no circular fixes.
#
# Needs network access for npm install. Set KEEP=1 to keep the project.
set -euo pipefail

repo=$(cd "$(dirname "$0")/../.." && pwd)
work=$(mktemp -d)

if [[ "${KEEP:-}" == "1" ]]; then
  echo "Keeping $work"
else
  trap 'rm -rf "$work"' EXIT
fi

echo "Packing $repo"
tarball=$(cd "$repo" && npm pack --silent --pack-destination "$work")

cd "$work"
cat > package.json << 'EOF'
{ "name": "check-pack", "private": true, "type": "module" }
EOF
cp "$repo/.prettierrc" .

echo "Installing $tarball with ESLint 10 and Prettier 3"
npm install --silent --no-audit --no-fund \
  "./$tarball" 'eslint@^10' 'prettier@^3'

# The first ```js block under "## Usage" in the README
awk '
  /^## Usage/ { usage = 1; next }
  usage && /^```js/ { block = 1; next }
  block && /^```/ { exit }
  block { print }
' "$repo/README.md" > eslint.config.js

if [[ ! -s eslint.config.js ]]; then
  echo "error: no \`\`\`js block found under ## Usage in README.md" >&2
  exit 1
fi

mkdir -p src docs

# A string with a single quote in it is printed with double quotes by
# Prettier, which @stylistic/quotes must accept (#92)
cat > src/clean.js << 'EOF'
const description = "It's a string with a single quote";

export const greet = (name) => {
  if (!name) {
    return description;
  }

  return `Hello ${name}`;
};
EOF

cat > src/clean.ts << 'EOF'
export interface Point {
  x: number;
  y: number;
}

export const origin: Point = { x: 0, y: 0 };
EOF

# DOM types aren't globals ESLint knows; TypeScript checks these names
cat > src/types.ts << 'EOF'
export type Callback = FrameRequestCallback;
EOF

cat > docs/clean.md << 'EOF'
# Fixture

A paragraph with a [link](https://example.com).
EOF

cat > src/problems.js << 'EOF'
var a = 1, b = 2;
console.log(a, b);
EOF

cat > src/problems.ts << 'EOF'
export const value: any = 1;
EOF

cat > docs/problems.md << 'EOF'
# Fixture

An [empty link]().
EOF

# Tests are linted, not ignored, and know Node's globals (#93)
mkdir -p src/__tests__

cat > src/__tests__/clean.test.ts << 'EOF'
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('clean', () => {
  it('knows Node globals', () => {
    assert.equal(typeof process.env, 'object');
  });
});
EOF

cat > src/clean.test.js << 'EOF'
import assert from 'node:assert/strict';
import { test } from 'node:test';

test('knows Node globals', () => {
  assert.ok(Buffer.from('a'));
});
EOF

cat > src/__tests__/problems.test.ts << 'EOF'
var a = 1, b = 2;

export { a, b };
EOF

cat > src/__tests__/notes.md << 'EOF'
# Notes

Markdown next to tests is linted as Markdown.
EOF

# Outside tests, Node globals stay unknown
cat > src/node-only.js << 'EOF'
export const env = process.env;
EOF

echo "Linting"
status=0
npx eslint --format json . > results.json 2> eslint.stderr || status=$?

if [[ $status -gt 1 ]]; then
  echo "error: ESLint exited with $status" >&2
  cat eslint.stderr >&2
  exit 1
fi

WORK="$work" node --input-type=module << 'EOF'
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

const work = process.env.WORK;
const results = JSON.parse(readFileSync(`${work}/results.json`, 'utf8'));
const byFile = new Map(
  results.map((r) => [relative(work, r.filePath), r.messages])
);

// Files to rule ids that must be reported; an empty list means no problems
const expected = {
  'eslint.config.js': [],
  'src/clean.js': [],
  'src/clean.ts': [],
  'src/types.ts': [],
  'docs/clean.md': [],
  'src/problems.js': ['one-var', 'no-console'],
  'src/problems.ts': ['@typescript-eslint/no-explicit-any'],
  'docs/problems.md': ['markdown/no-empty-links'],
  'src/__tests__/clean.test.ts': [],
  'src/clean.test.js': [],
  'src/__tests__/notes.md': [],
  'src/__tests__/problems.test.ts': ['one-var'],
  'src/node-only.js': ['no-undef']
};

const failures = [];

for (const [file, ruleIds] of Object.entries(expected)) {
  const messages = byFile.get(file);

  if (!messages) {
    failures.push(`${file}: not linted`);
    continue;
  }

  const found = messages.map((m) => m.ruleId);
  const describe = (m) => `${m.line}:${m.column} ${m.ruleId ?? 'fatal'} ${m.message}`;

  for (const m of messages.filter((m) => m.ruleId === null)) {
    failures.push(`${file}: ${describe(m)}`);
  }

  if (ruleIds.length === 0) {
    for (const m of messages.filter((m) => m.ruleId !== null)) {
      failures.push(`${file}: unexpected ${describe(m)}`);
    }
  }

  for (const ruleId of ruleIds.filter((id) => !found.includes(id))) {
    failures.push(`${file}: expected ${ruleId}, got ${found.join(', ') || 'nothing'}`);
  }
}

if (failures.length > 0) {
  console.error(`check:pack found ${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`Lint results as expected for ${Object.keys(expected).length} files`);
EOF

echo "Checking --fix for circular fixes"
npx eslint --fix . > /dev/null 2> fix.stderr || true

if grep -q 'Circular fixes' fix.stderr; then
  echo "error: eslint --fix reports circular fixes:" >&2
  cat fix.stderr >&2
  exit 1
fi

echo "check:pack passed"
