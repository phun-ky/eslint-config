import { ESLint } from 'eslint';
import * as prettier from 'prettier';

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import config from '../index.js';

// The configuration on its own, as a consumer's eslint.config.js would use it
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: config
});
/** The rule ids reported for `code`, linted as if it were `filePath`. */
const ruleIdsFor = async (code, filePath) => {
  const [result] = await eslint.lintText(code, { filePath });

  return result.messages.map((message) => message.ruleId);
};
/** The severity of `rule` for `filePath`: 0 off, 1 warn, 2 error. */
const severityFor = async (rule, filePath) => {
  const { rules } = await eslint.calculateConfigForFile(filePath);

  return rules[rule]?.[0];
};

describe('the exported configuration', () => {
  it('is an array of flat config objects', () => {
    assert.ok(Array.isArray(config));
    assert.ok(config.length > 0);

    for (const block of config) assert.equal(typeof block, 'object');
  });

  it('ignores build output and dependencies, not tests', async () => {
    assert.equal(await eslint.isPathIgnored('node_modules/a/index.js'), true);
    assert.equal(await eslint.isPathIgnored('dist/index.js'), true);
    assert.equal(await eslint.isPathIgnored('coverage/index.js'), true);
    assert.equal(await eslint.isPathIgnored('src/__tests__/a.ts'), false);
    assert.equal(await eslint.isPathIgnored('tests/a.js'), false);
    assert.equal(await eslint.isPathIgnored('src/a.test.js'), false);
  });
});

describe('JavaScript', () => {
  it('reports its own rules', async () => {
    assert.ok(
      (
        await ruleIdsFor('var a = 1, b = 2;\n\nexport { a, b };\n', 'src/a.js')
      ).includes('one-var')
    );
  });

  it('accepts double quotes that avoid escaping a single quote (#92)', async () => {
    assert.deepEqual(
      await ruleIdsFor('export const a = "It\'s";\n', 'src/a.js'),
      []
    );
  });

  it('still wants single quotes otherwise', async () => {
    assert.ok(
      (await ruleIdsFor('export const a = "plain";\n', 'src/a.js')).includes(
        '@stylistic/quotes'
      )
    );
  });

  it("doesn't know Node's globals outside tests", async () => {
    assert.deepEqual(
      await ruleIdsFor('export const env = process.env;\n', 'src/a.js'),
      ['no-undef']
    );
  });
});

describe('TypeScript', () => {
  it('leaves undefined names to the type checker', async () => {
    assert.deepEqual(
      await ruleIdsFor('export type C = FrameRequestCallback;\n', 'src/a.ts'),
      []
    );
  });

  it('accepts how Prettier indents a curried arrow function', async () => {
    const code = [
      'export class RemoteTaskError extends Error {}',
      '',
      'export const isRemoteError =',
      '  (message: RegExp, check: (error: RemoteTaskError) => boolean = () => true) =>',
      '  (error: unknown) =>',
      '    error instanceof RemoteTaskError &&',
      '    message.test(error.message) &&',
      '    check(error);',
      ''
    ].join('\n');
    const filePath = fileURLToPath(new URL('../src/a.ts', import.meta.url));
    const options = await prettier.resolveConfig(filePath);

    assert.equal(
      await prettier.format(code, { ...options, filepath: filePath }),
      code
    );
    assert.deepEqual(await ruleIdsFor(code, 'src/a.ts'), []);
  });

  it('reports typescript-eslint rules', async () => {
    assert.deepEqual(
      await ruleIdsFor('export const value: any = 1;\n', 'src/a.ts'),
      ['@typescript-eslint/no-explicit-any']
    );
  });
});

describe('Markdown', () => {
  it('is parsed as Markdown, not JavaScript (#87)', async () => {
    assert.deepEqual(
      await ruleIdsFor(
        '# Title\n\nSome text, and a [link](https://a.b).\n',
        'a.md'
      ),
      []
    );
  });

  it('reports Markdown rules', async () => {
    assert.ok(
      (await ruleIdsFor('# Title\n\nAn [empty link]().\n', 'a.md')).includes(
        'markdown/no-empty-links'
      )
    );
  });
});

describe('test files', () => {
  for (const file of [
    'src/__tests__/a.ts',
    'src/__mocks__/a.js',
    'tests/a.js',
    'src/a.spec.ts'
  ]) {
    it(`${file} knows Node's globals`, async () => {
      assert.deepEqual(
        await ruleIdsFor('export const env = process.env;\n', file),
        []
      );
    });
  }

  it('still get the other rules', async () => {
    assert.ok(
      (
        await ruleIdsFor(
          'var a = 1, b = 2;\n\nexport { a, b };\n',
          'src/a.test.js'
        )
      ).includes('one-var')
    );
  });

  it('skip browser support checks and default-member warnings', async () => {
    const file = 'src/__tests__/a.test.js';

    assert.equal(await severityFor('compat/compat', file), 0);
    assert.equal(
      await severityFor('import-x/no-named-as-default-member', file),
      0
    );
    assert.equal(await severityFor('compat/compat', 'src/a.js'), 2);
  });
});

describe('the README rule table (#116)', () => {
  // The block in index.js with the project's own rules
  const own = config.find((block) => block.plugins?.['@stylistic']).rules;
  const rows = [
    ...readFileSync(new URL('../README.md', import.meta.url), 'utf8').matchAll(
      /^\| \[([^\]]+)\]\([^)]+\) +\| ([^|]+)\|/gm
    )
  ].map(([, rule, description]) => ({ rule, description: description.trim() }));

  it('lists exactly the rules index.js sets', () => {
    assert.deepEqual(
      rows.map(({ rule }) => rule).sort(),
      Object.keys(own).sort()
    );
  });

  it('describes every rule turned off as off', () => {
    for (const { rule, description } of rows) {
      const setting = [own[rule]].flat()[0];
      const off = setting === 0 || setting === 'off';

      assert.equal(
        description.startsWith('Off'),
        off,
        `${rule}: ${description}`
      );
    }
  });
});
