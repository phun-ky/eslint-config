# Assurance Case

Why the [security expectations](SECURITY.md#security-expectations) of
`eslint-config-phun-ky` hold, what they rest on, and where they don't hold yet.
It is kept short because the package is small: one file of configuration, ten
runtime dependencies, and a release pipeline.

## What is being protected

- **Users of the package:** importing the configuration must only configure
  ESLint: no network, no file writes and no code run beyond the plugins it
  declares.
- **The published package:** what users install from npm must be exactly what
  this repository released, with nothing added on the way.
- **The repository and its release pipeline:** the source, the workflows and the
  credentials that publish releases.

## Threat model

| Threat                               | Where                                                                  | How it is countered                                                                                                                                                                                                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A tampered or substituted release    | npm                                                                    | Releases are built and published only from GitHub Actions with npm trusted publishing (no long-lived token) and carry Sigstore-signed provenance, verifiable with `npm audit signatures`; each GitHub release has a CycloneDX SBOM                                               |
| A malicious or vulnerable dependency | The runtime plugins and their dependencies, development tools, Actions | Runtime dependencies chosen by a written policy and declared with caret ranges; `npm audit` blocks releases on high or critical runtime advisories; dependency review blocks pull requests; Dependabot proposes versions at least 14 days old; Actions are pinned to commit SHAs |
| A malicious change to the source     | Pull requests                                                          | Pull requests only, with required checks (lint, tests, the packed package, dependency review, CodeQL, the DCO) on `main`; no force pushes or deletion of `main`                                                                                                                  |
| Abuse of CI credentials              | Workflows                                                              | Read-only default permissions in every workflow, write only per job; pull requests from forks get no secrets; no untrusted value is interpolated into a script; secret scanning with push protection                                                                             |
| A malicious project being linted     | Configuration files in the linted project                              | Outside this package's control: ESLint and Prettier run JavaScript configuration files from the project they lint. Documented in the security expectations, with the advice to lint untrusted repositories only in a sandbox                                                     |

## Trust boundaries

1. **ESLint to this configuration:** ESLint imports `index.js` in your process,
   which imports the declared plugins and builds an array of configuration
   objects. From then on, the plugins run with your privileges whenever ESLint
   lints a file.
2. **Linted files to the plugins:** the plugins parse the files being linted;
   they don't run them. The configuration files of the linted project are loaded
   by ESLint and Prettier themselves, not by this package.
3. **Repository to npm:** only the publish workflow, after a merge to `main`,
   the release guard and the audit gate, can publish, through npm trusted
   publishing.
4. **npm to the user:** the user's package manager fetches the package;
   provenance and the registry's integrity hashes link it to this repository and
   build.

## Secure design principles

- **Economy of mechanism:** configuration only, in one file, with no options and
  no logic beyond building the array.
- **No dynamic code:** no `eval`, `new Function` or loading of code by path.
- **Minimal, declared dependencies:** each runtime dependency is an ESLint
  plugin, parser or config the configuration needs, declared with a caret range
  so users get its fixes.
- **Least privilege:** CI tokens are read-only by default and write only where a
  job needs it; publishing uses short-lived OIDC tokens.
- **Open design:** everything is public, including the release pipeline and this
  document.
- **Checked before release:** every release installs the packed package and
  lints fixtures with it, so a configuration that fails to load is never
  published.

## Common weaknesses countered

| Weakness                                           | Status                                                                                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| CWE-94 code injection                              | No dynamic code in the package                                                                                                     |
| CWE-829 inclusion from an untrusted control sphere | Declared runtime dependencies chosen by policy, provenance on releases, Actions pinned to SHAs                                     |
| CWE-494 download of code without integrity check   | npm verifies integrity hashes; releases carry signed provenance                                                                    |
| CWE-1395 dependency on a vulnerable component      | Dependency review and the release audit gate block high and critical advisories; the one moderate exception is recorded below      |
| CWE-400 uncontrolled resource consumption          | The minimatch advisory needs crafted glob patterns, which come only from configuration; see [`vex.openvex.json`](vex.openvex.json) |

## Known gaps

- **Third-party plugins run with your privileges.** The package can choose and
  track its dependencies, but not sandbox them.
- **Untrusted projects:** linting one runs its JavaScript configuration files,
  through ESLint and Prettier.
- **A moderate advisory in a dependency:** GHSA-g3hv-75wg-m249 in `minimatch`
  reaches users through `typescript-eslint` until it allows a fixed version
  ([#114](https://github.com/phun-ky/eslint-config/issues/114)).
- **One maintainer:** pull requests by the maintainer get no second review, and
  access to the repository and the package rests on one person; see
  [governance](GOVERNANCE.md#continuity).
- **Tags are not signed;** releases are verified through npm provenance instead.
