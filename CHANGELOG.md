# Changelog

## [2.0.4](https://github.com/phun-ky/eslint-config/compare/2.0.3...2.0.4) (2026-06-04)

### Tasks

* 🤖 bump the minor-and-patch group with 5 updates ([fc450bb](https://github.com/phun-ky/eslint-config/commit/fc450bb301575024751d522c01faea4b0c7f91f8))

## [2.0.3](https://github.com/phun-ky/eslint-config/compare/2.0.2...2.0.3) (2026-05-26)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([0e58f18](https://github.com/phun-ky/eslint-config/commit/0e58f188b4427f16c78a36db6dd01b4065e1a6e7))

## [2.0.2](https://github.com/phun-ky/eslint-config/compare/2.0.1...2.0.2) (2026-05-19)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([0454e9c](https://github.com/phun-ky/eslint-config/commit/0454e9c321c75df40ac0ddf41d5d8945e53c4900))

## [2.0.1](https://github.com/phun-ky/eslint-config/compare/2.0.0...2.0.1) (2026-05-13)

### Tasks

* 🤖 bump typescript-eslint in the minor-and-patch group ([83e7125](https://github.com/phun-ky/eslint-config/commit/83e7125ffe14e791ad48fdf695040d61a6cceded))

## [2.0.0](https://github.com/phun-ky/eslint-config/compare/1.0.35...2.0.0) (2026-05-11)

### ⚠ BREAKING CHANGES

* 🧨 Import-related rules are now provided through `eslint-plugin-import-x` and use the `import-x/*` rule namespace instead of `import/*`. Consumers overriding `import/*` rules must update their overrides to `import-x/*`.
* 🧨 `eslint-plugin-import` and `eslint-import-resolver-typescript` are no longer part of the runtime dependency set. Consumers relying on those packages through this config must install/configure them directly or migrate to `eslint-plugin-import-x`.
* 🧨 The ESLint peer dependency now requires ESLint ^10.0.0.

### Tasks

* 🤖 bump the major-updates group across 1 directory with 5 updates ([fd4f462](https://github.com/phun-ky/eslint-config/commit/fd4f4627a8fbbe1396cb5d132486babc31081bd1))

### Feature

* 🎸 Migrate import rules to eslint-plugin-import-x ([e4923f0](https://github.com/phun-ky/eslint-config/commit/e4923f06f98279d790949606e5e0a92b7f1c4399))

### Bug

* 🐛 Make prettier a peer dependency only ([43c15db](https://github.com/phun-ky/eslint-config/commit/43c15db414c10dce7714a818cdd7695ba21de9ce))
* 🐛 Move eslint-plugin-import-x to runtime dependencies ([b1931b7](https://github.com/phun-ky/eslint-config/commit/b1931b7064a36d4756b6f5f078d3f72ee3971e57))

## [1.0.35](https://github.com/phun-ky/eslint-config/compare/1.0.34...1.0.35) (2026-03-03)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([b399444](https://github.com/phun-ky/eslint-config/commit/b39944400d4f7db391555121bd728244243dee73))

## [1.0.34](https://github.com/phun-ky/eslint-config/compare/1.0.33...1.0.34) (2026-02-24)

### Tasks

* 🤖 bump the minor-and-patch group across 1 directory with 5 updates ([c0574bf](https://github.com/phun-ky/eslint-config/commit/c0574bf116568b0836cadc32d3233e935fa69706))

## [1.0.33](https://github.com/phun-ky/eslint-config/compare/1.0.32...1.0.33) (2026-01-27)

### Tasks

* 🤖 bump the minor-and-patch group with 6 updates ([12e313e](https://github.com/phun-ky/eslint-config/commit/12e313e185892189d86695e0be811a7e10dc2be3))

## [1.0.32](https://github.com/phun-ky/eslint-config/compare/1.0.31...1.0.32) (2026-01-21)

### Tasks

* 🤖 bump the minor-and-patch group with 3 updates ([e7be66a](https://github.com/phun-ky/eslint-config/commit/e7be66a2420d74be57d1ad1bccee57d91e815ed6))

## [1.0.31](https://github.com/phun-ky/eslint-config/compare/1.0.30...1.0.31) (2026-01-13)

### Tasks

* 🤖 bump the minor-and-patch group with 3 updates ([399656e](https://github.com/phun-ky/eslint-config/commit/399656ec40f3064a359da4dd40617fa4ade2242f))

## [1.0.30](https://github.com/phun-ky/eslint-config/compare/1.0.29...1.0.30) (2026-01-06)

### Tasks

* 🤖 bump globals from 16.5.0 to 17.0.0 in the major-updates group ([80cd808](https://github.com/phun-ky/eslint-config/commit/80cd808ec0ddcd13967c9c32225bc724da0f49d4))

## [1.0.29](https://github.com/phun-ky/eslint-config/compare/1.0.28...1.0.29) (2026-01-06)

### Tasks

* 🤖 bump typescript-eslint in the minor-and-patch group ([506fe4f](https://github.com/phun-ky/eslint-config/commit/506fe4fc5b544f3b1421694d0254a7b5a27b5089))

## [1.0.28](https://github.com/phun-ky/eslint-config/compare/1.0.27...1.0.28) (2026-01-05)

### Tasks

* 🤖 bump the minor-and-patch group across 1 directory with 3 updates ([2c462e7](https://github.com/phun-ky/eslint-config/commit/2c462e79b1a75eefeaf0229e29de5d4a5b59b8ea))
* 🤖 bump the minor-and-patch group with 4 updates ([9d192e3](https://github.com/phun-ky/eslint-config/commit/9d192e308aa08c9ba0e064f348be1168162e573f))

### Bug

* 🐛 Release with trusted publishing ([0440b6f](https://github.com/phun-ky/eslint-config/commit/0440b6fac87debacf95ddfd9a518ce8d92d84011))

## [1.0.27](///compare/1.0.26...1.0.27) (2025-12-08)

## [1.0.26](///compare/1.0.25...1.0.26) (2025-11-17)

## [1.0.25](https://github.com/phun-ky/eslint-config/compare/1.0.24...1.0.25) (2025-11-13)

### Tasks

* 🤖 bump the minor-and-patch group with 4 updates ([073dc71](https://github.com/phun-ky/eslint-config/commit/073dc715eb484b59d51e08347b047b5bd31fff17))

## [1.0.24](https://github.com/phun-ky/eslint-config/compare/1.0.23...1.0.24) (2025-11-03)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([aea29cb](https://github.com/phun-ky/eslint-config/commit/aea29cb75f2b1121e7aac37609d67b71e25a3e7b))

## [1.0.23](https://github.com/phun-ky/eslint-config/compare/1.0.22...1.0.23) (2025-10-28)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([7ed9361](https://github.com/phun-ky/eslint-config/commit/7ed9361c248aa7a550188e297d79a96885a7d7b7))

## [1.0.22](https://github.com/phun-ky/eslint-config/compare/1.0.21...1.0.22) (2025-10-20)

### Tasks

* 🤖 bump the minor-and-patch group with 3 updates ([9d6ddb2](https://github.com/phun-ky/eslint-config/commit/9d6ddb293d8eb5eac4bc1c01f52599d3456b6ee1))
* 🤖 Make sure we can release ([65e7356](https://github.com/phun-ky/eslint-config/commit/65e73563cd75b22f278d3373929a2175cad6a444))

## [1.0.21](https://github.com/phun-ky/eslint-config/compare/1.0.20...1.0.21) (2025-10-14)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([79f9272](https://github.com/phun-ky/eslint-config/commit/79f927246a4dbb95e7ca93734a89a3c0ab419e71))

## [1.0.20](https://github.com/phun-ky/eslint-config/compare/1.0.19...1.0.20) (2025-10-07)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([be3b4cc](https://github.com/phun-ky/eslint-config/commit/be3b4cca1a3723e06dfc354eacac0386d9220e7e))

## [1.0.19](https://github.com/phun-ky/eslint-config/compare/1.0.18...1.0.19) (2025-09-30)

### Tasks

* 🤖 bump the minor-and-patch group with 5 updates ([03c4391](https://github.com/phun-ky/eslint-config/commit/03c439123420e59cea34e331d14b9fd571376103))

## [1.0.18](https://github.com/phun-ky/eslint-config/compare/1.0.17...1.0.18) (2025-09-15)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([d6e6d52](https://github.com/phun-ky/eslint-config/commit/d6e6d52d29fe5d6bbd0971a55eaae4bfc44e5841))

## [1.0.17](https://github.com/phun-ky/eslint-config/compare/1.0.16...1.0.17) (2025-09-09)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([5cb8e55](https://github.com/phun-ky/eslint-config/commit/5cb8e55b92ecf49b7ba41accf602a79a00b5fea4))

## [1.0.16](https://github.com/phun-ky/eslint-config/compare/1.0.15...1.0.16) (2025-09-02)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([e5114b2](https://github.com/phun-ky/eslint-config/commit/e5114b21babf458f8994ec69c63e24c98975d83f))

## [1.0.15](https://github.com/phun-ky/eslint-config/compare/1.0.14...1.0.15) (2025-08-26)

### Tasks

* 🤖 bump the minor-and-patch group with 3 updates ([c90052a](https://github.com/phun-ky/eslint-config/commit/c90052a97318eb2cc1c3015ef1fbad4d13c9f7ac))

## [1.0.14](https://github.com/phun-ky/eslint-config/compare/1.0.13...1.0.14) (2025-08-19)

### Tasks

* 🤖 bump typescript-eslint in the minor-and-patch group ([e343622](https://github.com/phun-ky/eslint-config/commit/e3436226afa3d098379ecc6530253d20bbb2c8f0))

## [1.0.13](https://github.com/phun-ky/eslint-config/compare/1.0.12...1.0.13) (2025-08-12)

### Tasks

* 🤖 bump the minor-and-patch group with 5 updates ([8ecf08c](https://github.com/phun-ky/eslint-config/commit/8ecf08c3ae6555c2af49f967b7e5e690b7c55fed))

## [1.0.12](https://github.com/phun-ky/eslint-config/compare/1.0.11...1.0.12) (2025-07-22)

### Tasks

* 🤖 bump the minor-and-patch group with 5 updates ([cf83fcb](https://github.com/phun-ky/eslint-config/commit/cf83fcb79bae8172af5db89ba9e7ce79804844aa))

## [1.0.11](https://github.com/phun-ky/eslint-config/compare/1.0.10...1.0.11) (2025-07-20)

### Tasks

* 🤖 bump @eslint/markdown in the major-updates group ([3e33a8c](https://github.com/phun-ky/eslint-config/commit/3e33a8cfef167135e8be69bcbf3703d1b0ba41b0))

## [1.0.10](https://github.com/phun-ky/eslint-config/compare/1.0.9...1.0.10) (2025-07-20)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([e2887e6](https://github.com/phun-ky/eslint-config/commit/e2887e6c52e6a32f9f25c89161b12f096d09baf4))

## [1.0.9](https://github.com/phun-ky/eslint-config/compare/1.0.8...1.0.9) (2025-07-07)

### Tasks

* 🤖 bump the minor-and-patch group across 1 directory with 7 updates ([7b6e05d](https://github.com/phun-ky/eslint-config/commit/7b6e05db8b551b3b700406457c7078c1133eb24a))

## [1.0.8](https://github.com/phun-ky/eslint-config/compare/1.0.7...1.0.8) (2025-06-23)

### Tasks

* 🤖 bump the minor-and-patch group with 5 updates ([062389b](https://github.com/phun-ky/eslint-config/commit/062389bc38ee7fa85e83241840499a6b21dd5150))

## [1.0.7](https://github.com/phun-ky/eslint-config/compare/1.0.6...1.0.7) (2025-06-23)

### Tasks

* 🤖 bump @stylistic/eslint-plugin in the major-updates group ([e524c9e](https://github.com/phun-ky/eslint-config/commit/e524c9ea0188e88745bd5f63df0cd2929799ae36))

## [1.0.6](https://github.com/phun-ky/eslint-config/compare/1.0.5...1.0.6) (2025-06-16)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([665d0cd](https://github.com/phun-ky/eslint-config/commit/665d0cd2ac8d618e40a40e78f9b5ae163fd8d4b3))

## [1.0.5](https://github.com/phun-ky/eslint-config/compare/1.0.4...1.0.5) (2025-06-09)

### Tasks

* 🤖 bump the minor-and-patch group with 4 updates ([fe30964](https://github.com/phun-ky/eslint-config/commit/fe30964688e21e780edc469c7ca8fd84e88ef0e9))

## [1.0.4](https://github.com/phun-ky/eslint-config/compare/1.0.3...1.0.4) (2025-06-02)

### Tasks

* 🤖 bump the minor-and-patch group with 5 updates ([b0bdfa8](https://github.com/phun-ky/eslint-config/commit/b0bdfa8c0fc1bb3dd112ed9ba6ae1a92f3e0470f))

## [1.0.3](https://github.com/phun-ky/eslint-config/compare/1.0.2...1.0.3) (2025-05-26)

### Tasks

* 🤖 bump the minor-and-patch group with 3 updates ([ba744c9](https://github.com/phun-ky/eslint-config/commit/ba744c9ec32139c8a2f4296828bf0269eeb0e679))

## [1.0.2](https://github.com/phun-ky/eslint-config/compare/1.0.1...1.0.2) (2025-05-20)

### Tasks

* 🤖 bump the minor-and-patch group with 3 updates ([dae8283](https://github.com/phun-ky/eslint-config/commit/dae8283d858e98f09e617264971945dc668f232f))

## [1.0.1](https://github.com/phun-ky/eslint-config/compare/1.0.0...1.0.1) (2025-05-12)

### Tasks

* 🤖 Add custom labels for PR size addon ([431e86e](https://github.com/phun-ky/eslint-config/commit/431e86e522624eb4ffe5a50a11c13398fb5e45d5))
* 🤖 bump the minor-and-patch group with 2 updates ([96cb13a](https://github.com/phun-ky/eslint-config/commit/96cb13aee893c7acbafe16eff19855d885658592))

## [1.0.0](https://github.com/phun-ky/eslint-config/compare/0.1.12...1.0.0) (2025-05-06)

### ⚠ BREAKING CHANGES

* 🧨 To follow the "standard" with ESLint config naming, I've renamed the
package to `eslint-config-phun-ky`. The previous package is to be
deprecated

### Tasks

* 🤖 Reinstall ([b12fd31](https://github.com/phun-ky/eslint-config/commit/b12fd31c86d745ed48318a9fa5b4ab7b4f9ae210))
* 🤖 Rename package to `eslint-config-phun-ky` ([8822fc6](https://github.com/phun-ky/eslint-config/commit/8822fc6d55f025fb0aeddb183fa85dc531e1dc00))

### Documentation

* ✏️ Add more documentation about the rules and files ([c8653c1](https://github.com/phun-ky/eslint-config/commit/c8653c1290d3f5856e232bc457ed8286b84a37a2))

### Feature

* 🎸 Add `tsx` into files array ([9cea048](https://github.com/phun-ky/eslint-config/commit/9cea048fb8e45f9b7e945771dda5a0d6659127c7))

### Bug

* 🐛 Remove deprecated rule, turn on `no-alert` ([644ef78](https://github.com/phun-ky/eslint-config/commit/644ef7826c18fecf6271a9f7b569f3867a6ef153))

## [0.1.12](https://github.com/phun-ky/eslint-config/compare/0.1.11...0.1.12) (2025-05-06)

### Tasks

* 🤖 Move eslint related stuff from dev dep to dep ([a4e1931](https://github.com/phun-ky/eslint-config/commit/a4e1931bcc782a0f068ad84b5d08711066f941be))
* 🤖 Sort `package.json` ([3349c0c](https://github.com/phun-ky/eslint-config/commit/3349c0c81b4cbf70afe6bbf0b41fd0742421fdb5))

## [0.1.11](https://github.com/phun-ky/eslint-config/compare/0.1.10...0.1.11) (2025-05-05)

### Tasks

* 🤖 bump the minor-and-patch group with 4 updates ([6d036e5](https://github.com/phun-ky/eslint-config/commit/6d036e58f1c78841418a0ae11419a8d3d91de076))

## [0.1.10](https://github.com/phun-ky/eslint-config/compare/0.1.9...0.1.10) (2025-05-04)

### Bug

* 🐛 Turn off some rules for markdown linting that is broken ([d168096](https://github.com/phun-ky/eslint-config/commit/d168096217fe5535479a29f19b7cdb08cc94a3cc))

## [0.1.9](https://github.com/phun-ky/eslint-config/compare/0.1.8...0.1.9) (2025-05-02)

### Tasks

* 🤖 Add more files to trigger `check` ([916bfe2](https://github.com/phun-ky/eslint-config/commit/916bfe266615d93b0760e87a3faa67a341a32461))

## [0.1.8](https://github.com/phun-ky/eslint-config/compare/0.1.7...0.1.8) (2025-05-02)

## [0.1.7](https://github.com/phun-ky/eslint-config/compare/0.1.6...0.1.7) (2025-05-02)

## [0.1.6](https://github.com/phun-ky/eslint-config/compare/0.1.5...0.1.6) (2025-04-29)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([527792c](https://github.com/phun-ky/eslint-config/commit/527792cf72978e6cba741b2586c4bf7452468589))

## [0.1.5](https://github.com/phun-ky/eslint-config/compare/0.1.4...0.1.5) (2025-04-22)

### Tasks

* 🤖 bump release-it in the major-updates group ([0b22ed5](https://github.com/phun-ky/eslint-config/commit/0b22ed5c6c56a16395e458480620111183ac386b))

## [0.1.4](https://github.com/phun-ky/eslint-config/compare/0.1.3...0.1.4) (2025-04-21)

### Tasks

* 🤖 bump the minor-and-patch group with 5 updates ([eed6a2c](https://github.com/phun-ky/eslint-config/commit/eed6a2c5a43408658f7d07a8194c0d22b397b08b))

## [0.1.3](https://github.com/phun-ky/eslint-config/compare/0.1.2...0.1.3) (2025-04-15)

### Tasks

* 🤖 bump the minor-and-patch group with 2 updates ([95248f2](https://github.com/phun-ky/eslint-config/commit/95248f24629fc7ce50c9722e2136c4f95fe770cf))

## [0.1.2](https://github.com/phun-ky/eslint-config/compare/0.1.1...0.1.2) (2025-04-08)

### Tasks

* 🤖 bump eslint-import-resolver-typescript ([403565a](https://github.com/phun-ky/eslint-config/commit/403565a96b6ae6dae81195b4242df026ce78cb7c))

## [0.1.1](https://github.com/phun-ky/eslint-config/compare/0.1.0...0.1.1) (2025-04-04)

### Tasks

* 🤖 bump prettier from 3.5.1 to 3.5.3 in the minor-and-patch group ([5957a33](https://github.com/phun-ky/eslint-config/commit/5957a33b38cb524f3282df576e88313b2f358769))

## 0.1.0 (2025-04-04)

### Tasks

* 🤖 bump eslint-import-resolver-typescript ([fc969e3](https://github.com/phun-ky/eslint-config/commit/fc969e354a040a9026b356ed687de1f552292ecc))

### Documentation

* ✏️ Remove old banner ([2f52358](https://github.com/phun-ky/eslint-config/commit/2f523588bed6f8bda0031cfdf2fc4bc0bd49d4dc))

### Feature

* 🎸 First version of my opinionated eslintconfig ([0adea9e](https://github.com/phun-ky/eslint-config/commit/0adea9eae45280f942bce200b0b7d5781aaf24ba))

### Bug

* 🐛 Add missing dev deps ([df8db08](https://github.com/phun-ky/eslint-config/commit/df8db08d3dcce48a46d6c850cc8e8b13fe937ba3))
* 🐛 Add missing script ([7670fe0](https://github.com/phun-ky/eslint-config/commit/7670fe014267abb440eca82d3d3c4136f8ba24f2))
* 🐛 Fix release it process ([1bed20c](https://github.com/phun-ky/eslint-config/commit/1bed20c88992ed9f045807b83cc0662c38162b47))
