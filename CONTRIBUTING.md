# Contributing to eslint-config-phun-ky

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the
[Table of Contents](#table-of-contents) for different ways to help and details
about how this project handles them. Please read the relevant section before
making your contribution. It makes it a lot easier for the maintainer and
smooths out the experience for everyone involved.

> And if you like the project, but don't have time to contribute, that's fine.
> There are other easy ways to support the project and show your appreciation:
>
> - Star the project
> - Mention it in your project's readme
> - Tell your friends and colleagues about it

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Contributing Code](#contributing-code)
    - [Architecture](#architecture)
    - [Development](#development)
    - [Coding Style](#coding-style)
    - [Tests](#tests)
    - [Developer Certificate of Origin](#developer-certificate-of-origin)
    - [Commits and Pull Requests](#commits-and-pull-requests)
    - [Releases](#releases)
- [Attribution](#attribution)

## Code of Conduct

This project and everyone participating in it is governed by the
[eslint-config-phun-ky Code of Conduct](https://github.com/phun-ky/eslint-config/blob/main/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report
unacceptable behaviour to <code-of-conduct@phun-ky.net>.

## I Have a Question

> If you want to ask a question, we assume that you have read the
> [README](https://github.com/phun-ky/eslint-config#readme).

Before you ask a question, search the existing
[issues](https://github.com/phun-ky/eslint-config/issues) that might help you.
If you find a suitable issue and still need clarification, write your question
in that issue.

If you still need to ask a question:

- Open an [issue](https://github.com/phun-ky/eslint-config/issues/new).
- Provide as much context as you can about what you're running into.
- Provide the versions of this package, ESLint, Prettier, Node.js and npm, and
  your `eslint.config.js`.

## I Want To Contribute

> ### Legal Notice
>
> When contributing to this project, you must agree that you have authored 100%
> of the content, that you have the necessary rights to the content and that the
> content you contribute may be provided under the project licence. You confirm
> this on every commit by signing it off under the
> [Developer Certificate of Origin](#developer-certificate-of-origin).

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more
information. Please:

- Make sure that you are using the latest version.
- Check that it's really a bug and not an error on your side, for example an
  unsupported ESLint or Node.js version. Read the
  [README](https://github.com/phun-ky/eslint-config#readme) first.
- Search the
  [bug tracker](https://github.com/phun-ky/eslint-config/issues?q=label%3A%22problems%3A+%F0%9F%90%9B+bug%22)
  to see if the bug has already been reported.
- Collect information about the bug:
  - the error message, or the rule and the problem it reports
  - the versions of this package, ESLint, Prettier, Node.js and npm
  - your `eslint.config.js` and Prettier configuration
  - the smallest file that shows the problem
  - whether you can reproduce it reliably, and with older versions

#### How Do I Submit a Good Bug Report?

> Never report security issues, vulnerabilities or bugs that include sensitive
> information in the issue tracker or elsewhere in public. Report them privately
> as described in the [security policy](SECURITY.md#reporting-a-vulnerability).

Bugs are tracked as GitHub issues. If you run into a problem:

- Open an [issue](https://github.com/phun-ky/eslint-config/issues/new).
- Explain the behaviour you expected and the actual behaviour.
- Describe the steps to reproduce it, ideally a file and the `npx eslint`
  command that shows the problem.
- Add the information you collected above.

Once it's filed, the maintainer labels it and tries to reproduce it. Without a
way to reproduce it, the issue is marked `pending: need repro` until there is
one.

### Suggesting Enhancements

Enhancements, from new rules to small improvements, are tracked as
[GitHub issues](https://github.com/phun-ky/eslint-config/issues).

Before suggesting one:

- Make sure that you are using the latest version, and read the
  [README](https://github.com/phun-ky/eslint-config#readme) to see if it's
  already possible.
- [Search](https://github.com/phun-ky/eslint-config/issues) for an existing
  suggestion, and add to it instead of opening a new one.
- Check that it fits the [roadmap](ROADMAP.md), including what is not planned.

A good suggestion has a clear title, describes the current behaviour and the
behaviour you'd like instead, and explains why it would be useful to most users.

### Contributing Code

Larger changes, such as a new rule or plugin, are best discussed in an issue
first, so the work fits the [roadmap](ROADMAP.md).

#### Architecture

There is no build: the package is published as written.

- **`index.js`** exports the configuration: an array of ESLint flat config
  objects built from the plugins in `dependencies`, followed by this project's
  own rules and the blocks for tests and Markdown.
- **`eslint.config.js`** lints this repository with `index.js` itself.
- **`.github/scripts/check-pack.sh`** packs the package, installs it in an empty
  project and lints fixtures with it; see [Tests](#tests).
- **`.github/scripts/should-release.sh`** decides whether a merge releases, and
  **`.github/scripts/sbom.mjs`** writes the software bill of materials for each
  release; see [Releases](#releases).

#### Development

You need Node.js 24 and npm 11.

```shell
npm ci
npm run lint
npm test
npm run check:pack
```

| Command                       | What it does                                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm test`                    | Runs the tests of the configuration, with coverage of `index.js`                                      |
| `npm run lint`                | Lints every file, Markdown included, with this configuration and Prettier                             |
| `npm run format:check`        | Checks the format of the JSON and YAML files with Prettier                                            |
| `npm run check:pack`          | Packs the package, installs it in an empty project and lints the fixtures with it                     |
| `npm run check:bestpractices` | Checks the OpenSSF Best Practices answers and the links in them                                       |
| `npm run release:dry-run`     | Shows whether merging would release, and the planned version and changelog                            |
| `npm run commit`              | Helps write a conventional commit message                                                             |
| `npm run bestpractices:url`   | Prints bestpractices.dev links that propose the answers in `.bestpractices.json` (for the maintainer) |

#### Coding Style

Code follows this project's own ESLint configuration and
[Prettier](https://prettier.io/) formatting. A contribution must pass
`npm run lint` and `npm run format:check` with no errors. Both run in CI on
every pull request, and a pull request that fails them can't be merged.

#### Tests

There are two kinds of tests, and both run in CI on every pull request:

- **`npm test`** runs the tests in `__tests__` with Node's test runner. They
  lint snippets with `index.js` through ESLint's Node API and check what is
  reported, and fail when the coverage of `index.js` drops below 99% of lines,
  100% of functions or 95% of branches.
- **`npm run check:pack`** lints fixtures with the packed package, as a consumer
  would get it, and checks the rule ids each fixture reports, that no file is
  ignored or fails to parse, and that `eslint --fix` doesn't loop. It runs on
  Node 24 and on Node 22.13.0, the oldest version `engines` allows.

What a change needs:

- **A rule change must come with a test** in `__tests__`: a snippet that the
  changed rule reports, or one it no longer reports.
- **Bug fixes must come with a test** that fails without the fix.
- **Packaging changes** are tested by `npm run check:pack` itself.

#### Developer Certificate of Origin

Every commit must be signed off under the
[Developer Certificate of Origin](https://developercertificate.org/) (DCO): a
statement that you wrote the change, or otherwise have the right to submit it
under the project's licence. You agree to it by adding a `Signed-off-by` line
with your name and email to the commit message:

```text
Signed-off-by: Your Name <you@example.com>
```

- **Per commit:** `git commit -s` adds the line for you.
- **Always:** `npm ci` sets `core.hooksPath` to `.githooks`, and the hook in
  `.githooks/prepare-commit-msg` adds the line to every commit, including those
  made by `npm run commit` or your editor.
- **Forgot?** Sign off every commit on your branch and push again:
  `git rebase --signoff main` then `git push --force-with-lease`.

The DCO check on every pull request fails if a commit isn't signed off.

#### Commits and Pull Requests

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, ...). `npm run commit` helps write them. Releases
  and the changelog are generated from them (see [Releases](#releases)), so pick
  the type that matches the change. A breaking change, such as a rule that
  reports more problems, needs a `type!:` and a `BREAKING CHANGE:` footer that
  says what to change.
- Pull requests are merged with a merge commit, so each commit message, not the
  pull request title, decides the release. A pull request that mixes a change to
  the configuration with tooling is split into a `fix:` or `feat:` commit and a
  `chore:` or `ci:` commit.
- Open a pull request against `main`. The Checks workflow lints, checks the
  format and runs `check:pack` on both Node versions; dependency review, CodeQL
  and the DCO check also run. All of them must pass.

#### Releases

The maintainer merges pull requests, and releases follow automatically from
GitHub Actions:

1. When a merged pull request changes what gets published, the publish workflow
   checks whether there is anything to release: a `feat`, `fix`, `perf` or
   `revert` commit, or a breaking change, that touches `index.js`,
   `package.json`, `README.md` or `LICENSE`. Other changes wait for the next
   release.
2. If so, it runs `npm audit` on the runtime dependencies, and release-it picks
   the version from the commits, updates the changelog, runs `check:pack` on the
   bumped package, and publishes it to npm with signed provenance.
3. The release commit and tag go to `main`, and a GitHub release is created with
   a software bill of materials attached.

`npm run release:dry-run` shows what a merge would release.

## Attribution

This guide is based on
[contributing-gen](https://github.com/bttger/contributing-gen).
