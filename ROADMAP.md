# Roadmap

What eslint-config-phun-ky intends to do, and not do, from November 2026 to
November 2027. It's a plan, not a promise: priorities can change, and changes to
this file are made in pull requests like any other. Individual pieces of work
are tracked as [GitHub issues](https://github.com/phun-ky/eslint-config/issues),
grouped in milestones.

## Planned

### Keeping 3.x stable

3.0 lints JavaScript, TypeScript and Markdown, test files included, with
ESLint 10. Every pull request is checked by installing the packed package and
linting fixtures with it, on Node 24 and on the oldest Node it supports, and
every release again on Node 24 before it is published. From here:

- **No breaking changes in 3.x.** A rule that reports more problems, or a new
  rule that fails a lint run, waits for the next major. The current major is
  supported as a whole and the previous one gets high and critical security
  fixes for 6 months; see the [security policy](SECURITY.md#supported-versions).
- **The minimatch advisory** reaching consumers through typescript-eslint is
  removed as soon as typescript-eslint allows a fixed version
  ([#114](https://github.com/phun-ky/eslint-config/issues/114)).

### Project health

- **OpenSSF Best Practices:** passing since November 2026. OSPS Baseline levels
  1 and 2 next; silver and Baseline level 3 need a second maintainer (access
  continuity and reviews by someone other than the author).
- **A second maintainer**, so that pull requests get a review from someone other
  than the author and access to the project doesn't rest on one person; see
  [governance](GOVERNANCE.md#continuity).

## Not planned

- **Configs for frameworks** (React, Vue and the like). This configuration
  covers JavaScript, TypeScript and Markdown; add framework plugins in your own
  configuration next to it.
- **Collecting data.** The package doesn't collect, store or send data anywhere.
