# [@hoth/app-autoload-v1.3.0](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.2.2...@hoth/app-autoload-v1.3.0) (2023-03-08)


### Features

* **autoload:** support fastify 4.x ([2866f4e](https://github.com/searchfe/hoth/commit/2866f4e5af4e88de19bd71f5421cfa7ebf8d24ef))

# [@hoth/app-autoload-v1.2.2](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.2.1...@hoth/app-autoload-v1.2.2) (2022-12-26)


### Bug Fixes

* not log ModuleNotFoundError ([eabee27](https://github.com/searchfe/hoth/commit/eabee27b43c4a2473e6e69ed2742a0a973130bfc))

# [@hoth/app-autoload-v1.2.1](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.2.0...@hoth/app-autoload-v1.2.1) (2022-12-25)


### Bug Fixes

* console require error ([76b2ece](https://github.com/searchfe/hoth/commit/76b2ece6b19f4935281ba0cd908d40157bda23c9))
* not log ModuleNotFoundError ([aa634c2](https://github.com/searchfe/hoth/commit/aa634c240a109586a41ea90798b469f4527014b3))

# [@hoth/app-autoload-v1.2.0](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.17...@hoth/app-autoload-v1.2.0) (2022-12-01)


### Features

* add basic perf time, udpate fastify version, support log.addField, better fatal log ([c617681](https://github.com/searchfe/hoth/commit/c6176819116fdb72730db8f9934d5d3e959b7070))

# [@hoth/app-autoload-v1.1.17](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.16...@hoth/app-autoload-v1.1.17) (2022-10-30)


### Bug Fixes

* node config fatal tip message ([793fbc1](https://github.com/searchfe/hoth/commit/793fbc18a86a5533fd4063e2f069c6a4e82365b4))

# [@hoth/app-autoload-v1.1.16](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.15...@hoth/app-autoload-v1.1.16) (2021-12-07)


### Bug Fixes

* controller 中的 hooks，比 autoload 中的 hook 靠前，导致 req.$appConfig 未定义 ([b06bdcf](https://github.com/searchfe/hoth/commit/b06bdcfbd1dc6865dc60d308b40b64391071847e))

# [@hoth/app-autoload-v1.1.15](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.14...@hoth/app-autoload-v1.1.15) (2021-08-16)


### Performance Improvements

* **app-autoload:** add init error catch ([995946c](https://github.com/searchfe/hoth/commit/995946cbf32d96ed2699a18c6589481265fc9050))

# [@hoth/app-autoload-v1.1.14](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.13...@hoth/app-autoload-v1.1.14) (2021-08-16)


### Bug Fixes

* **app-autoload:** molecule first ([9c851da](https://github.com/searchfe/hoth/commit/9c851da73785a1446473a23ca7dea26f2d0d792c))

# [@hoth/app-autoload-v1.1.13](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.12...@hoth/app-autoload-v1.1.13) (2021-08-13)


### Bug Fixes

* **app-autoload:** use symlink path ([e8c48f9](https://github.com/searchfe/hoth/commit/e8c48f9d006fcb109dc81ae1ee1819355192f6d4))

# [@hoth/app-autoload-v1.1.12](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.11...@hoth/app-autoload-v1.1.12) (2021-08-12)


### Performance Improvements

* **app-autoload:** plugin-autoload support symlink ([544b22d](https://github.com/searchfe/hoth/commit/544b22dd600acbef4a4a5d9c5893b65616b6275a))

# [@hoth/app-autoload-v1.1.11](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.10...@hoth/app-autoload-v1.1.11) (2021-08-11)


### Bug Fixes

* **app-autoload:** multi app config error ([66e11d7](https://github.com/searchfe/hoth/commit/66e11d71b954a70134f9c57771200cecea33fd7b))

# [@hoth/app-autoload-v1.1.10](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.9...@hoth/app-autoload-v1.1.10) (2021-08-09)


### Performance Improvements

* **app-autoload:** update hoth deps ([4ac4d85](https://github.com/searchfe/hoth/commit/4ac4d8573bb214e28e075c2f92bdd7cb2ebfa78e))

# [@hoth/app-autoload-v1.1.9](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.8...@hoth/app-autoload-v1.1.9) (2021-08-09)


### Performance Improvements

* **app-autoload:** logid beforehand ([2b6d9a6](https://github.com/searchfe/hoth/commit/2b6d9a69dcccc7732b37bf9d9af9b7371d2f9275))

# [@hoth/app-autoload-v1.1.8](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.7...@hoth/app-autoload-v1.1.8) (2021-07-16)


### Bug Fixes

* **app-autoload:** update decorators version ([f62126e](https://github.com/searchfe/hoth/commit/f62126e68c0bb131771c1d5da421a354a370d5d0))

# [@hoth/app-autoload-v1.1.7](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.6...@hoth/app-autoload-v1.1.7) (2021-07-16)


### Bug Fixes

* controller route scope error ([9ec461a](https://github.com/searchfe/hoth/commit/9ec461acb7f5838f43bbe06c8df5f1ad80feb30d))

# [@hoth/app-autoload-v1.1.6](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.5...@hoth/app-autoload-v1.1.6) (2021-06-02)


### Bug Fixes

* **app-autoload:** app prefix generate error ([aee22b6](https://github.com/searchfe/hoth/commit/aee22b686c8fdcb95382bbc2cadaf4be0309fd99))

# [@hoth/app-autoload-v1.1.5](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.4...@hoth/app-autoload-v1.1.5) (2021-06-01)


### Bug Fixes

* support app prefix config ([b4f82a6](https://github.com/searchfe/hoth/commit/b4f82a61ae9bed96843a8a5fa4c2aa17095eb215))

# [@hoth/app-autoload-v1.1.4](https://github.com/searchfe/hoth/compare/@hoth/app-autoload-v1.1.3...@hoth/app-autoload-v1.1.4) (2021-05-24)


### Reverts

* Revert "chore(ci): "npmPublish": false" ([5368438](https://github.com/searchfe/hoth/commit/5368438918d0db2c819c32fd0f60e1c01ae7123b))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.2](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.1.2) (2021-05-10)


### Bug Fixes

* load module plugins ([baf82fb](https://github.com/cxtom/hoth/commit/baf82fb1481be11a4835e9cc4da2f4e336318cd6))
* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))
* remove x-powered-by ([43cdda5](https://github.com/cxtom/hoth/commit/43cdda5f55c60189e334cf8bdc72469c005681fc))
* support get fastifyInstance in service ([2367f2b](https://github.com/cxtom/hoth/commit/2367f2b694fe3a50f0bf12af7c459d4e6b97153b))
* support molecule app ([876dc3b](https://github.com/cxtom/hoth/commit/876dc3babb068a64a3b7e89f8faa75ef1e2ffd2f))
* update fastify-warmup to 0.0.8 ([741b959](https://github.com/cxtom/hoth/commit/741b9596287e7908fe2d3580f8c15abf5f8cee70))
* update fastify-warmup to support timeout ([a2c4ba7](https://github.com/cxtom/hoth/commit/a2c4ba7c622ee660e22ea4a4f89729e097f57474))
* warmup ([d5a71d8](https://github.com/cxtom/hoth/commit/d5a71d8188cc6f7a0e08e1e19171b30d77d29d15))
* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))





## [1.1.1](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.1.1) (2021-05-10)


### Bug Fixes

* load module plugins ([baf82fb](https://github.com/cxtom/hoth/commit/baf82fb1481be11a4835e9cc4da2f4e336318cd6))
* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))
* remove x-powered-by ([43cdda5](https://github.com/cxtom/hoth/commit/43cdda5f55c60189e334cf8bdc72469c005681fc))
* support get fastifyInstance in service ([2367f2b](https://github.com/cxtom/hoth/commit/2367f2b694fe3a50f0bf12af7c459d4e6b97153b))
* support molecule app ([876dc3b](https://github.com/cxtom/hoth/commit/876dc3babb068a64a3b7e89f8faa75ef1e2ffd2f))
* update fastify-warmup to 0.0.8 ([741b959](https://github.com/cxtom/hoth/commit/741b9596287e7908fe2d3580f8c15abf5f8cee70))
* update fastify-warmup to support timeout ([a2c4ba7](https://github.com/cxtom/hoth/commit/a2c4ba7c622ee660e22ea4a4f89729e097f57474))
* warmup ([d5a71d8](https://github.com/cxtom/hoth/commit/d5a71d8188cc6f7a0e08e1e19171b30d77d29d15))
* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))





# [1.1.0](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.1.0) (2021-05-10)


### Bug Fixes

* load module plugins ([baf82fb](https://github.com/cxtom/hoth/commit/baf82fb1481be11a4835e9cc4da2f4e336318cd6))
* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))
* remove x-powered-by ([43cdda5](https://github.com/cxtom/hoth/commit/43cdda5f55c60189e334cf8bdc72469c005681fc))
* support get fastifyInstance in service ([2367f2b](https://github.com/cxtom/hoth/commit/2367f2b694fe3a50f0bf12af7c459d4e6b97153b))
* support molecule app ([876dc3b](https://github.com/cxtom/hoth/commit/876dc3babb068a64a3b7e89f8faa75ef1e2ffd2f))
* update fastify-warmup to 0.0.8 ([741b959](https://github.com/cxtom/hoth/commit/741b9596287e7908fe2d3580f8c15abf5f8cee70))
* update fastify-warmup to support timeout ([a2c4ba7](https://github.com/cxtom/hoth/commit/a2c4ba7c622ee660e22ea4a4f89729e097f57474))
* warmup ([d5a71d8](https://github.com/cxtom/hoth/commit/d5a71d8188cc6f7a0e08e1e19171b30d77d29d15))
* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))





## [1.0.13](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.13) (2021-05-10)


### Bug Fixes

* load module plugins ([baf82fb](https://github.com/cxtom/hoth/commit/baf82fb1481be11a4835e9cc4da2f4e336318cd6))
* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))
* remove x-powered-by ([43cdda5](https://github.com/cxtom/hoth/commit/43cdda5f55c60189e334cf8bdc72469c005681fc))
* support get fastifyInstance in service ([2367f2b](https://github.com/cxtom/hoth/commit/2367f2b694fe3a50f0bf12af7c459d4e6b97153b))
* support molecule app ([876dc3b](https://github.com/cxtom/hoth/commit/876dc3babb068a64a3b7e89f8faa75ef1e2ffd2f))
* update fastify-warmup to 0.0.8 ([741b959](https://github.com/cxtom/hoth/commit/741b9596287e7908fe2d3580f8c15abf5f8cee70))
* update fastify-warmup to support timeout ([a2c4ba7](https://github.com/cxtom/hoth/commit/a2c4ba7c622ee660e22ea4a4f89729e097f57474))
* warmup ([d5a71d8](https://github.com/cxtom/hoth/commit/d5a71d8188cc6f7a0e08e1e19171b30d77d29d15))
* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))





## [1.0.12](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.12) (2021-04-28)


### Bug Fixes

* load module plugins ([baf82fb](https://github.com/cxtom/hoth/commit/baf82fb1481be11a4835e9cc4da2f4e336318cd6))
* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))
* remove x-powered-by ([43cdda5](https://github.com/cxtom/hoth/commit/43cdda5f55c60189e334cf8bdc72469c005681fc))
* support get fastifyInstance in service ([2367f2b](https://github.com/cxtom/hoth/commit/2367f2b694fe3a50f0bf12af7c459d4e6b97153b))
* support molecule app ([876dc3b](https://github.com/cxtom/hoth/commit/876dc3babb068a64a3b7e89f8faa75ef1e2ffd2f))
* update fastify-warmup to 0.0.8 ([741b959](https://github.com/cxtom/hoth/commit/741b9596287e7908fe2d3580f8c15abf5f8cee70))
* update fastify-warmup to support timeout ([a2c4ba7](https://github.com/cxtom/hoth/commit/a2c4ba7c622ee660e22ea4a4f89729e097f57474))
* warmup ([d5a71d8](https://github.com/cxtom/hoth/commit/d5a71d8188cc6f7a0e08e1e19171b30d77d29d15))
* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))





## [1.0.11](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.11) (2021-04-20)


### Bug Fixes

* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))
* remove x-powered-by ([43cdda5](https://github.com/cxtom/hoth/commit/43cdda5f55c60189e334cf8bdc72469c005681fc))
* support get fastifyInstance in service ([2367f2b](https://github.com/cxtom/hoth/commit/2367f2b694fe3a50f0bf12af7c459d4e6b97153b))
* support molecule app ([876dc3b](https://github.com/cxtom/hoth/commit/876dc3babb068a64a3b7e89f8faa75ef1e2ffd2f))
* update fastify-warmup to 0.0.8 ([741b959](https://github.com/cxtom/hoth/commit/741b9596287e7908fe2d3580f8c15abf5f8cee70))
* update fastify-warmup to support timeout ([a2c4ba7](https://github.com/cxtom/hoth/commit/a2c4ba7c622ee660e22ea4a4f89729e097f57474))
* warmup ([d5a71d8](https://github.com/cxtom/hoth/commit/d5a71d8188cc6f7a0e08e1e19171b30d77d29d15))
* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))





## [1.0.10](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.10) (2021-04-01)


### Bug Fixes

* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* support get fastifyInstance in service ([2367f2b](https://github.com/cxtom/hoth/commit/2367f2b694fe3a50f0bf12af7c459d4e6b97153b))
* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.9](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.9) (2021-03-29)


### Bug Fixes

* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.8](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.8) (2021-03-25)


### Bug Fixes

* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.7](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.7) (2021-03-24)


### Bug Fixes

* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.6](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.6) (2021-03-23)


### Bug Fixes

* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* **app-autoload:** support fetch ral logid ([a875c28](https://github.com/cxtom/hoth/commit/a875c28a20f29444d10bae10dcb747bf08e29e5d))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.5](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.5) (2021-03-20)


### Bug Fixes

* use setErrorHandler ([996247f](https://github.com/cxtom/hoth/commit/996247f026754940bcfc415910d4ff89828c8bcd))


### Features

* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.4](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.4) (2021-03-11)

**Note:** Version bump only for package @hoth/app-autoload





## [1.0.3](https://github.com/cxtom/hoth/compare/@hoth/app-autoload@1.0.2...@hoth/app-autoload@1.0.3) (2021-03-11)

**Note:** Version bump only for package @hoth/app-autoload
