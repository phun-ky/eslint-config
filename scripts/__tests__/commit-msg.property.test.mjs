import fc from 'fast-check';

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, describe, it } from 'node:test';

const hook = new URL('../../.githooks/commit-msg', import.meta.url).pathname;
const dir = mkdtempSync(join(tmpdir(), 'commit-msg-property-'));

after(() => rmSync(dir, { recursive: true, force: true }));

/** The hook's exit status for a message, written to a file as git does. */
const statusFor = (message) => {
  const file = join(dir, 'COMMIT_EDITMSG');

  writeFileSync(file, message);

  return spawnSync(hook, [file], { encoding: 'utf8' }).status;
};
const tools = [
  'copilot',
  'claude',
  'anthropic',
  'openai',
  'chatgpt',
  'codex',
  'gemini',
  'cursor'
];
const subject = 'fix: 🐛 a thing\n';
// Printable ASCII with no newline, so each value stays one line of the message
const line = fc.string();
const attribution = fc.oneof(
  line,
  fc.constantFrom(
    'Co-Authored-By: Claude <noreply@anthropic.com>',
    '🤖 Generated with [Claude Code](https://claude.com/claude-code)',
    'Made by AI'
  )
);

describe('.githooks/commit-msg properties', () => {
  it('rejects a Co-authored-by trailer naming an AI tool, in any case', () => {
    fc.assert(
      fc.property(
        fc.mixedCase(fc.constant('co-authored-by:')),
        fc.mixedCase(fc.constantFrom(...tools)),
        line,
        line,
        (key, tool, head, tail) => {
          assert.equal(
            statusFor(`${subject}\n${key}${head}${tool}${tail}\n`),
            1
          );
        }
      )
    );
  });

  it('accepts a human co-author', () => {
    fc.assert(
      fc.property(
        fc
          .stringMatching(/^[A-Z][a-z]{1,12} [A-Z][a-z]{1,12}$/)
          .filter((name) => !tools.some((t) => name.toLowerCase().includes(t))),
        (name) => {
          const [first] = name.toLowerCase().split(' ');

          assert.equal(
            statusFor(
              `${subject}\nCo-authored-by: ${name} <${first}@example.com>\n`
            ),
            0
          );
        }
      )
    );
  });

  it("ignores git's comment lines", () => {
    fc.assert(
      fc.property(fc.array(attribution), (lines) => {
        assert.equal(
          statusFor(subject + lines.map((l) => `#${l}\n`).join('')),
          0
        );
      })
    );
  });

  it('ignores everything below the scissors line', () => {
    fc.assert(
      fc.property(
        fc.nat(30),
        fc.nat(30),
        fc.array(attribution),
        (left, right, lines) => {
          const scissors = `# ${'-'.repeat(left)} >8 ${'-'.repeat(right)}\n`;

          assert.equal(
            statusFor(subject + scissors + lines.map((l) => `${l}\n`).join('')),
            0
          );
        }
      )
    );
  });
});
