import eslint from '@eslint/js';
import markdown from '@eslint/markdown';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import compat from 'eslint-plugin-compat';
import { importX } from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

const code = '{js,mjs,cjs,ts,tsx}';
const testFiles = [
  `**/__tests__/**/*.${code}`,
  `**/__mocks__/**/*.${code}`,
  `tests/**/*.${code}`,
  `**/*.{test,spec}.${code}`
];

export default [
  {
    ignores: ['**/dts', '**/node_modules', '**/coverage', '**/dist']
  },
  { files: ['**/*.{js,mjs,cjs,ts,tsx,md}'] },
  ...markdown.configs.recommended,
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  compat.configs['flat/recommended'],
  // typescript-eslint/base sets its parser without `files`, which would also
  // apply to .md files and make prettier/prettier parse Markdown as JS
  ...tsConfigs.recommended.map((config) =>
    config.files ? config : { ...config, files: ['**/*.{js,mjs,cjs,ts,tsx}'] }
  ),
  eslintPluginPrettierRecommended,
  {
    plugins: {
      '@stylistic': stylistic
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          classes: true
        }
      }
    },

    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true
        })
      ]
    },

    rules: {
      'import-x/no-named-as-default': 0,
      'import-x/order': [
        'error',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          pathGroupsExcludedImportTypes: ['internal'],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },

          'newlines-between': 'always'
        }
      ],
      'no-alert': 1,
      'no-console': 1,
      'no-undef': 2,
      'no-unreachable': 1,
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'one-var': ['error', 'never'],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/max-len': [
        'error',
        {
          code: 80,
          tabWidth: 2,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],
      // avoidEscape matches Prettier, which uses double quotes for a string
      // that contains a single quote; without it, eslint --fix loops
      '@stylistic/quotes': [1, 'single', { avoidEscape: true }],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/comma-dangle': 'error',
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'export'
        },
        {
          blankLine: 'always',
          prev: 'export',
          next: 'export'
        },
        {
          blankLine: 'always',
          prev: 'export',
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'if'
        },
        {
          blankLine: 'always',
          prev: 'if',
          next: '*'
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'const'
        },
        {
          blankLine: 'always',
          prev: 'let',
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'let'
        },
        {
          blankLine: 'always',
          prev: 'var',
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'var'
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'let'
        },
        {
          blankLine: 'never',
          prev: 'const',
          next: 'const'
        },
        {
          blankLine: 'never',
          prev: 'let',
          next: 'let'
        },
        {
          blankLine: 'never',
          prev: 'var',
          next: 'var'
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'let'
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'var'
        },
        {
          blankLine: 'always',
          prev: 'let',
          next: 'var'
        }
      ],
      '@stylistic/indent': [
        'error',
        2,
        {
          MemberExpression: 1,
          SwitchCase: 1,
          ArrayExpression: 1,
          ObjectExpression: 1,
          offsetTernaryExpressions: true
        }
      ],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/no-extra-semi': 1,
      '@stylistic/no-trailing-spaces': [
        1,
        {
          skipBlankLines: true
        }
      ],
      '@stylistic/semi': 1
    }
  },
  // typescript-eslint turns no-undef off for TypeScript, which reports
  // undefined names itself, and the rule doesn't know type-only globals like
  // FrameRequestCallback; the rules above turn it back on
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-undef': 'off'
    }
  },
  // Tests are linted with the same rules, but they run in Node, not in a
  // browser: add Node's globals and skip the browser support checks
  {
    files: testFiles,
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'compat/compat': 'off',
      // Test libraries are often used through their default export, as in
      // fast-check's `fc.assert(fc.property(...))` or `sinon.stub()`
      'import-x/no-named-as-default-member': 'off'
    }
  },
  {
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
      '@stylistic/indent': 'off'
    }
  }
];
