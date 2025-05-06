# eslint-config-phun-ky

> An opinionated eslint-config that someone else could also use, with more than
> 450 helpful ESLint rules :)

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
  - [Rules](#rules)
    - [Extended](#extended)
  - [Contributing](#contributing)
  - [License](#license)
  - [Changelog](#changelog)
  - [Sponsor me](#sponsor-me)

## Install

```
npm i -D eslint eslint-config-phun-ky
```

Requires ESLint >=9.20.0 and
[flat config](https://eslint.org/docs/latest/use/configure/configuration-files).

## Usage

```js
// eslint.config.js
import { defineConfig } from 'eslint/config';
import customConfig from 'eslint-config-phun-ky';

export default defineConfig([
  {
    files: ['**/*.js'],
    extends: [customConfig],

    // anything from here will override customConfig
    rules: {
      '@stylistic/no-extra-semi': '0'
    }
  }
]);
```

### Files

By default, the config covers these files:

```
['**/*.{js,mjs,cjs,ts,tsx,md}']
```

## Rules

The custom rules extends/overrides these configs and plugins:

```js
{
  …,
  {
    ...markdown.configs.recommended,
    eslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
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

| Rule                                                                                                                        | Description                                                                           | 🔧  |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --- |
| [import/no-named-as-default](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md) | Disallows named imports that may conflict with default exports.                       |     |
| [import/no-unused-modules](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md)     | Reports modules without any exports or imports used elsewhere.                        |     |
| [import/order](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md)                             | Enforces a consistent order for import statements.                                    | 🔧  |
| [no-alert](https://eslint.org/docs/latest/rules/no-alert)                                                                   | Disallows `alert`, `confirm`, and `prompt`.                                           |     |
| [no-console](https://eslint.org/docs/latest/rules/no-console)                                                               | Disallows use of `console`.                                                           |     |
| [no-undef](https://eslint.org/docs/latest/rules/no-undef)                                                                   | Disallows the use of undeclared variables unless mentioned in `/*global */` comments. |     |
| [no-unreachable](https://eslint.org/docs/latest/rules/no-unreachable)                                                       | Disallows unreachable code after `return`, `throw`, `continue`, and `break`.          |     |
| [prefer-const](https://eslint.org/docs/latest/rules/prefer-const)                                                           | Suggests using `const` declaration for variables that are never reassigned.           | 🔧  |
| [one-var](https://eslint.org/docs/latest/rules/one-var)                                                                     | Enforces variables to be declared either together or separately in functions.         | 🔧  |
| [@stylistic/array-bracket-newline](https://eslint.style/rules/array-bracket-newline)                                        | Enforces line breaks inside brackets.                                                 | 🔧  |
| [@stylistic/max-len](https://eslint.style/rules/max-len)                                                                    | Enforces a maximum line length.                                                       |     |
| [@stylistic/quotes](https://eslint.style/rules/quotes)                                                                      | Enforces the consistent use of quotes.                                                | 🔧  |
| [@stylistic/padded-blocks](https://eslint.style/rules/padded-blocks)                                                        | Enforces or disallows padding within blocks.                                          | 🔧  |
| [@stylistic/comma-dangle](https://eslint.style/rules/comma-dangle)                                                          | Requires or disallows trailing commas.                                                | 🔧  |
| [@stylistic/padding-line-between-statements](https://eslint.style/rules/padding-line-between-statements)                    | Requires or disallows blank lines between statements.                                 | 🔧  |
| [@stylistic/indent](https://eslint.style/rules/indent)                                                                      | Enforces consistent indentation.                                                      | 🔧  |
| [@stylistic/object-curly-spacing](https://eslint.style/rules/object-curly-spacing)                                          | Enforces consistent spacing inside braces.                                            | 🔧  |
| [@stylistic/no-extra-semi](https://eslint.style/rules/no-extra-semi)                                                        | Disallows unnecessary semicolons.                                                     | 🔧  |
| [@stylistic/no-trailing-spaces](https://eslint.style/rules/no-trailing-spaces)                                              | Disallows trailing whitespace at the end of lines.                                    | 🔧  |
| [@stylistic/semi](https://eslint.style/rules/semi)                                                                          | Enforces or disallows semicolons.                                                     | 🔧  |
| [no-irregular-whitespace](https://eslint.org/docs/latest/rules/no-irregular-whitespace)                                     | Disallows irregular whitespace.                                                       | 🔧  |

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

p.s. **Ukraine is still under brutal Russian invasion. A lot of Ukrainian people
are hurt, without shelter and need help**. You can help in various ways, for
instance, directly helping refugees, spreading awareness, putting pressure on
your local government or companies. You can also support Ukraine by donating
e.g. to [Red Cross](https://www.icrc.org/en/donate/ukraine),
[Ukraine humanitarian organisation](https://savelife.in.ua/en/donate-en/#donate-army-card-weekly)
or
[donate Ambulances for Ukraine](https://www.gofundme.com/f/help-to-save-the-lives-of-civilians-in-a-war-zone).
