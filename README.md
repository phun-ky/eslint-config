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
  - [Rules](#rules)
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

## Rules

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
