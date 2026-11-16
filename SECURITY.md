# Security Policy

`eslint-config-phun-ky` is a shareable ESLint configuration. It has no code of
its own beyond the configuration in `index.js`, but it depends on ten packages
(ESLint plugins, parsers, configs and the `globals` list), which ESLint loads
and runs in your process. How those dependencies are chosen, tracked and kept
clear of known vulnerabilities is described under [Dependencies](#dependencies).

## Supported Versions

Support follows the major version:

| Release                  | Supported                                    |
| ------------------------ | -------------------------------------------- |
| `3.x`, the current major | ✅                                           |
| `2.x`, from 2.0.10       | High and critical fixes until 10 May 2027    |
| `2.0.0` to `2.0.9`       | ❌ Deprecated on npm: they crash or misparse |
| `1.x` and older          | ❌                                           |

- **The current major is supported as a whole.** Fixes are released as a new
  patch or minor of it, and upgrading within a major never breaks your lint
  setup.
- **The previous major gets fixes for high and critical vulnerabilities for 6
  months** after the next major is released (3.0.0 came out on 10 November
  2026), as a patch on its latest release.
- **Security comes before the deprecation grace period.** If a vulnerability
  can't be fixed without a breaking change, the fix may come in a patch or minor
  release instead of waiting for a major. The change is kept as small as
  possible, and the advisory and the release notes say what changed and why.

To get a fix, upgrade to the newest release of your major.

## Reporting a Vulnerability

Report vulnerabilities privately, either with GitHub's
[private vulnerability reporting](https://github.com/phun-ky/eslint-config/security/advisories/new)
or by email to <security@phun-ky.net>. Please don't open a public issue for a
security problem.

## How Reports Are Handled

1. **Acknowledgement:** you'll get a reply within 7 days confirming the report
   was received.
2. **Assessment:** the maintainer reproduces the issue and judges its severity,
   and may ask you for details.
3. **Fix:** a fix is developed in a private GitHub security advisory and
   released as a new version. The aim is a fix within 30 days for serious
   issues.
4. **Disclosure:** the advisory is published when the fix is released, with a
   CVE where one applies. Please keep the issue private until then.
5. **Credit:** reporters are credited in the advisory and the release notes,
   unless they ask to stay anonymous.

## Security Expectations

`index.js` exports an array of ESLint flat config objects. ESLint imports it in
your process when it loads your configuration.

What you can rely on:

- **No side effects of its own.** Importing the configuration imports its
  plugins and builds the array. It sends nothing over the network, writes no
  files and collects no data.
- **No dynamic code.** No `eval`, `new Function` or loading of code by path.
- **Releases are traceable.** Every release is published from GitHub Actions,
  with signed provenance (see below).

What you can't rely on:

- **Isolation from the project being linted.** ESLint, and Prettier through
  `eslint-plugin-prettier`, load configuration files from the project they lint,
  and JavaScript configuration files (such as `eslint.config.js` or
  `prettier.config.js`) run as code. The import resolver and
  `eslint-plugin-compat` also read the project's `tsconfig.json` and
  `package.json`. Lint a repository you don't trust only in a sandbox.
- **The plugins' own behaviour.** The plugins run with your privileges. They are
  third-party code, chosen and tracked as described under
  [Dependencies](#dependencies).

## Verifying Releases

Every release is published from GitHub Actions with npm trusted publishing, and
carries a signed provenance attestation (Sigstore) that links it to the commit
and workflow run that built it. To verify the package you've installed:

```shell
npm audit signatures
```

The provenance must name the repository `phun-ky/eslint-config` and the workflow
`.github/workflows/publish.yml`. The package's page on npm shows this under
"Provenance", and `npm view eslint-config-phun-ky@<version> dist.attestations`
lists the attestations.

From the first release after 3.0.0, each GitHub release also has a software bill
of materials attached, in CycloneDX format
(`eslint-config-phun-ky-<version>.cdx.json`), listing the runtime dependencies.

## Dependencies

**Choosing them.** The runtime dependencies are the ESLint plugins and configs
the configuration is built from; `eslint` and `prettier` are peer dependencies
that you install. A new runtime dependency is discussed in an issue first. It
must be widely used, actively maintained and under an OSI-approved licence
compatible with MIT; strong copyleft licences (GPL, AGPL) are not accepted.
Development dependencies follow the same rules, judged more loosely.

**Declaring them.** Runtime dependencies use caret ranges, so you get their
fixes without waiting for a release of this package. The `overrides` in this
repository apply to its own development only; they don't reach you.

**Obtaining them.** Packages come only from the npm registry, with exact
versions locked in `package-lock.json` and installed with `npm ci` in CI. GitHub
Actions are pinned to commit SHAs.

**Tracking them.** Dependabot proposes version updates weekly, for versions
published at least 14 days ago, and security updates as soon as an advisory is
published. Every pull request runs
[dependency review](https://github.com/phun-ky/eslint-config/blob/main/.github/workflows/dependency-review.yml),
and every release runs `npm audit` on runtime dependencies first.

**Fixing known vulnerabilities.** Findings are checked against the GitHub
Advisory Database:

| Finding                    | Where                  | What happens                                                                                     |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| Critical or high           | Runtime dependency     | Blocks merging (dependency review) and releasing (`npm audit`); fixed and released within 7 days |
| Critical or high           | Development dependency | Blocks merging when introduced; an existing one is fixed within 30 days                          |
| Moderate or low            | Any dependency         | Fixed with the next update, within 90 days                                                       |
| Licence outside the policy | New runtime dependency | Not merged                                                                                       |

**Accepted exceptions.** A vulnerability that can't be fixed from this
repository yet, and can't be exploited through it, is listed here, recorded as
an [OpenVEX](https://openvex.dev/) statement in
[`vex.openvex.json`](vex.openvex.json), and removed as soon as a fix is
reachable. Dependency review and the release audit fail only on high and
critical findings, so a moderate exception needs no entry there:

| Advisory                                                                            | Package          | Why it is accepted                                                                                                                                                                                                                                                               | Remove when                                                                                                          |
| ----------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) (moderate) | `minimatch` 10.x | A denial of service through crafted glob patterns. It reaches you through `typescript-eslint`, whose latest release (8.72.2) still requires `minimatch ^10.2.2`. ESLint and the plugins match only glob patterns written in configuration, not text from the files being linted. | `typescript-eslint` allows `minimatch` 11.0.1 or later ([#114](https://github.com/phun-ky/eslint-config/issues/114)) |

## Code Scanning

CodeQL analyses the JavaScript and the GitHub Actions workflows on every pull
request and every push to `main`. The ruleset on `main` blocks merging while
CodeQL reports an error, or a security alert of high or critical severity. Other
CodeQL alerts are fixed within 90 days, or dismissed with the reason when they
are false positives. OpenSSF Scorecard runs on every push to `main`, with
results at <https://scorecard.dev/viewer/?uri=github.com/phun-ky/eslint-config>.

## Secrets

The project keeps as few secrets as possible:

| Secret     | Used by       | For                                                                          |
| ---------- | ------------- | ---------------------------------------------------------------------------- |
| `GH_TOKEN` | `publish.yml` | Pushing release commits past the ruleset on `main`, tags and GitHub releases |

Publishing to npm needs no secret: it uses short-lived OIDC tokens from GitHub.

- **Storage:** secrets are kept only as encrypted GitHub Actions secrets, never
  in the repository. Secret scanning with push protection blocks commits that
  contain one.
- **Access:** only the maintainer can view or change them, and they are not
  available to workflows run from forks.
- **Rotation:** at least once a year, and immediately if one may have been
  exposed.

## Assurance Case

Why these expectations hold, where they don't hold yet, and the threat model and
trust boundaries behind them are set out in the [assurance case](ASSURANCE.md).
