import eslint from '@eslint/js';
import markdown from '@eslint/markdown';
import stylistic from '@stylistic/eslint-plugin';
import compat from 'eslint-plugin-compat';
import {
  importX,
  createTypeScriptImportResolver
} from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/dts',
      '**/node_modules',
      '**/coverage',
      '**/dist',
      '**/__tests__',
      'tests/**',
      '**/__mocks__'
    ]
  },
  { files: ['**/*.{js,mjs,cjs,ts,tsx,md}'] },
  ...markdown.configs.recommended,
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  compat.configs['flat/recommended'],
  ...tsConfigs.recommended,
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
          alwaysTryTypes: true,
          project: true
        })
      ]
    },

    rules: {
      'import-x/no-named-as-default': 0,
      'import-x/no-unused-modules': [
        1,
        {
          unusedExports: true
        }
      ],
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
      '@stylistic/quotes': [1, 'single'],
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
  {
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
      '@stylistic/indent': 'off'
    }
  }
];
