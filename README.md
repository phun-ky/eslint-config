# eslint-config-phun-ky

> An opinionated eslint-config that someone else could also use, with more than
> 450 helpful ESLint rules :)

[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/16758/badge)](https://www.bestpractices.dev/projects/16758)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/phun-ky/eslint-config/badge)](https://scorecard.dev/viewer/?uri=github.com/phun-ky/eslint-config)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](http://makeapullrequest.com)
[![SemVer 2.0](https://img.shields.io/badge/SemVer-2.0-green.svg)](http://semver.org/spec/v2.0.0.html)
![npm version](https://img.shields.io/npm/v/eslint-config-phun-ky)
![issues](https://img.shields.io/github/issues/phun-ky/eslint-config)
![license](https://img.shields.io/npm/l/eslint-config-phun-ky)
![size](https://img.shields.io/bundlephobia/min/eslint-config-phun-ky)
![npm](https://img.shields.io/npm/dm/eslint-config-phun-ky)
![GitHub Repo stars](https://img.shields.io/github/stars/phun-ky/eslint-config)

## Table of Contents<!-- omit from toc -->

- [eslint-config-phun-ky](#eslint-config-phun-ky)
  - [Install](#install)
  - [Usage](#usage)
    - [Files](#files)
      - [Tests](#tests)
  - [Rules](#rules)
    - [Extended](#extended)
  - [Contributing](#contributing)
  - [License](#license)
  - [Changelog](#changelog)
  - [Sponsor me](#sponsor-me)

## Install

```sh
npm i -D eslint eslint-config-phun-ky
```

Requires Node.js ^22.13.0 or >=24, ESLint 10 and
[flat config](https://eslint.org/docs/latest/use/configure/configuration-files).

## Usage

```js
// eslint.config.js
import { defineConfig } from 'eslint/config';
import customConfig from 'eslint-config-phun-ky';

export default defineConfig([
  {
    extends: [customConfig],

    // anything from here will override customConfig
    rules: {
      '@stylistic/no-extra-semi': 'off'
    }
  }
]);
```

### Files

By default, the config covers these files:

```js
['**/*.{js,mjs,cjs,ts,tsx,md}'];
```

To lint fewer of them, add a `files` pattern next to `extends`. A pattern like
`['**/*.js']` leaves out TypeScript and Markdown.

#### Tests

Tests are linted with the same rules as the rest of the code. Files in
`__tests__`, `__mocks__` and `tests` directories, and files named `*.test.*` or
`*.spec.*`, run in Node, so for them the config:

- adds Node's globals, like `process` and `Buffer`,
- turns off `compat/compat`, which checks browser support,
- turns off `import-x/no-named-as-default-member`, since test libraries are
  often used through their default export, like `fc.assert()` in fast-check.

Before 3.0.0, these files were ignored.

## Rules

The custom rules extends/overrides these configs and plugins:

```js
{
  …,
  {
    ...markdown.configs.recommended,
    eslint.configs.recommended,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    compat.configs['flat/recommended'],
    ...tsConfigs.recommended,
    eslintPluginPrettierRecommended,
  },
  plugins: {
    '@stylistic': stylistic
  },
  …
}
```

### Extended

🔧 Automatically fixable with
[`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Rule                                                                                                                          | Description                                                                                                                                              | 🔧  |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| [import-x/no-named-as-default](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default.md) | Off: a named import that shares its name with the default export is allowed.                                                                             |     |
| [import-x/order](https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md)                             | Enforces a consistent order for import statements.                                                                                                       | 🔧  |
| [no-alert](https://eslint.org/docs/latest/rules/no-alert)                                                                     | Disallows `alert`, `confirm`, and `prompt`.                                                                                                              |     |
| [no-console](https://eslint.org/docs/latest/rules/no-console)                                                                 | Disallows use of `console`.                                                                                                                              |     |
| [no-undef](https://eslint.org/docs/latest/rules/no-undef)                                                                     | Disallows the use of undeclared variables unless mentioned in `/*global */` comments. Off in TypeScript, where the type checker reports undefined names. |     |
| [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)                                                         | Off: `@typescript-eslint/no-unused-vars` reports unused variables in JavaScript and TypeScript instead.                                                  |     |
| [no-unreachable](https://eslint.org/docs/latest/rules/no-unreachable)                                                         | Disallows unreachable code after `return`, `throw`, `continue`, and `break`.                                                                             |     |
| [prefer-const](https://eslint.org/docs/latest/rules/prefer-const)                                                             | Suggests using `const` declaration for variables that are never reassigned.                                                                              | 🔧  |
| [one-var](https://eslint.org/docs/latest/rules/one-var)                                                                       | Enforces variables to be declared either together or separately in functions.                                                                            | 🔧  |
| [@stylistic/array-bracket-newline](https://eslint.style/rules/array-bracket-newline)                                          | Enforces line breaks inside brackets.                                                                                                                    | 🔧  |
| [@stylistic/max-len](https://eslint.style/rules/max-len)                                                                      | Enforces a maximum line length.                                                                                                                          |     |
| [@stylistic/quotes](https://eslint.style/rules/quotes)                                                                        | Enforces the consistent use of quotes.                                                                                                                   | 🔧  |
| [@stylistic/padded-blocks](https://eslint.style/rules/padded-blocks)                                                          | Enforces or disallows padding within blocks.                                                                                                             | 🔧  |
| [@stylistic/comma-dangle](https://eslint.style/rules/comma-dangle)                                                            | Requires or disallows trailing commas.                                                                                                                   | 🔧  |
| [@stylistic/padding-line-between-statements](https://eslint.style/rules/padding-line-between-statements)                      | Requires or disallows blank lines between statements.                                                                                                    | 🔧  |
| [@stylistic/indent](https://eslint.style/rules/indent)                                                                        | Off: Prettier owns indentation, and this rule disagrees with it on curried arrow functions.                                                              |     |
| [@stylistic/object-curly-spacing](https://eslint.style/rules/object-curly-spacing)                                            | Enforces consistent spacing inside braces.                                                                                                               | 🔧  |
| [@stylistic/no-extra-semi](https://eslint.style/rules/no-extra-semi)                                                          | Disallows unnecessary semicolons.                                                                                                                        | 🔧  |
| [@stylistic/no-trailing-spaces](https://eslint.style/rules/no-trailing-spaces)                                                | Disallows trailing whitespace at the end of lines.                                                                                                       | 🔧  |
| [@stylistic/semi](https://eslint.style/rules/semi)                                                                            | Enforces or disallows semicolons.                                                                                                                        | 🔧  |

In Markdown files, `no-irregular-whitespace` is turned off.

## Contributing

Want to contribute? Please read the
[CONTRIBUTING.md](https://github.com/phun-ky/eslint-config/blob/main/CONTRIBUTING.md)
and
[CODE_OF_CONDUCT.md](https://github.com/phun-ky/eslint-config/blob/main/CODE_OF_CONDUCT.md)

## License

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/phun-ky/eslint-config/blob/main/LICENSE) file for
details.

## Changelog

See the
[CHANGELOG.md](https://github.com/phun-ky/eslint-config/blob/main/CHANGELOG.md)
for details on the latest updates.

## Sponsor me

I'm an Open Source evangelist, creating stuff that does not exist yet to help
get rid of secondary activities and to enhance systems already in place, be it
documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to
maintain my projects, create new ones and contribute to the large community
we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).
