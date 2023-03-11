# [@hoth/logger-v1.7.0](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.6.0...@hoth/logger-v1.7.0) (2023-03-11)


### Features

* add getOuterIP,expose , env CONSOLE_LOG ([e4440c5](https://github.com/searchfe/hoth/commit/e4440c535c82a423226915f3434328bfc54d8f27))

# [@hoth/logger-v1.6.0](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.5.1...@hoth/logger-v1.6.0) (2022-12-01)


### Features

* add basic perf time, udpate fastify version, support log.addField, better fatal log ([c617681](https://github.com/searchfe/hoth/commit/c6176819116fdb72730db8f9934d5d3e959b7070))

# [@hoth/logger-v1.5.1](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.5.0...@hoth/logger-v1.5.1) (2022-10-30)


### Bug Fixes

* node config fatal tip message ([793fbc1](https://github.com/searchfe/hoth/commit/793fbc18a86a5533fd4063e2f069c6a4e82365b4))

### Features

# [@hoth/logger-v1.5.0](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.4.0...@hoth/logger-v1.5.0) (2022-10-10)

* product取值优化 ([b857005](https://github.com/searchfe/hoth/commit/b85700587d7f208e06698ce88e7069e770729be4))

# [@hoth/logger-v1.4.0](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.3.0...@hoth/logger-v1.4.0) (2022-03-29)


### Features

* cli use pino from logger ([708e7fa](https://github.com/searchfe/hoth/commit/708e7facecf03243cf67d6a83bd1347c081cb0cf))

# [@hoth/logger-v1.3.0](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.2.0...@hoth/logger-v1.3.0) (2022-03-29)


### Features

* remove fs-extra as much as possible ([f21c376](https://github.com/searchfe/hoth/commit/f21c376065d2a41d39da0c1ea6daf886270f436f))

# [@hoth/logger-v1.2.0](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.1.8...@hoth/logger-v1.2.0) (2021-12-14)


### Features

* remove cookie in logger ([3d8dba8](https://github.com/searchfe/hoth/commit/3d8dba8eed6c7c2ea7f393a9674d25deedfbf99a))

# [@hoth/logger-v1.1.8](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.1.7...@hoth/logger-v1.1.8) (2021-08-11)


### Bug Fixes

* **logger:** use file-stream-rotator ([f09efd9](https://github.com/searchfe/hoth/commit/f09efd915f7f5b1e514cf775170de17913eb1376))

# [@hoth/logger-v1.1.7](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.1.6...@hoth/logger-v1.1.7) (2021-08-09)


### Performance Improvements

* **logger:** skip warmup log ([98abe74](https://github.com/searchfe/hoth/commit/98abe742a625ac0e0cb1fe6fc7674954b72fca96))

# [@hoth/logger-v1.1.6](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.1.5...@hoth/logger-v1.1.6) (2021-08-09)


### Bug Fixes

* **cli:** entry module load ([772eb23](https://github.com/searchfe/hoth/commit/772eb2336120afd898d231cf04d8ec5248dccd08))

# [@hoth/logger-v1.1.5](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.1.4...@hoth/logger-v1.1.5) (2021-08-09)


### Performance Improvements

* **logger:** add log parser ([3de80e5](https://github.com/searchfe/hoth/commit/3de80e505ff4efc6e0d1aadaf14b889f01d85122))
* **logger:** use file-stream-rotating ([31bcdf4](https://github.com/searchfe/hoth/commit/31bcdf4a4b2fd5f9e2101459c335af2965366a11))

# [@hoth/logger-v1.1.4](https://github.com/searchfe/hoth/compare/@hoth/logger-v1.1.3...@hoth/logger-v1.1.4) (2021-05-24)


### Reverts

* Revert "chore(ci): "npmPublish": false" ([5368438](https://github.com/searchfe/hoth/commit/5368438918d0db2c819c32fd0f60e1c01ae7123b))

# @hoth/logger-v1.0.0 (2021-05-24)


### Bug Fixes

* **logger:** module pass error ([9bdaee3](https://github.com/cxtom/hoth/commit/9bdaee3ebc662d94afeb7711cc35e20ac417b1b6))
* log time ([463b628](https://github.com/cxtom/hoth/commit/463b628a26d1160972ce86f6b3549238dc2ac936))
* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **app-autoload:** entry file scope error ([78e28e6](https://github.com/cxtom/hoth/commit/78e28e6ef95fc02b0d33182346d631abaea842a2))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* app-autoload add config module ([24df2e3](https://github.com/cxtom/hoth/commit/24df2e36906820c9626b88dfae6a45e7ac231887))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))
* support request notice log & string log format ([c9eaa65](https://github.com/cxtom/hoth/commit/c9eaa659fd564542b95c165fa019316bb10f3e20))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.2](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.1.2) (2021-05-10)


### Bug Fixes

* **logger:** module pass error ([9bdaee3](https://github.com/cxtom/hoth/commit/9bdaee3ebc662d94afeb7711cc35e20ac417b1b6))
* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))





## [1.1.1](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.1.1) (2021-05-10)


### Bug Fixes

* **logger:** module pass error ([9bdaee3](https://github.com/cxtom/hoth/commit/9bdaee3ebc662d94afeb7711cc35e20ac417b1b6))
* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))





# [1.1.0](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.1.0) (2021-05-10)


### Bug Fixes

* **logger:** module pass error ([9bdaee3](https://github.com/cxtom/hoth/commit/9bdaee3ebc662d94afeb7711cc35e20ac417b1b6))
* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))





## [1.0.11](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.11) (2021-05-10)


### Bug Fixes

* **logger:** module pass error ([9bdaee3](https://github.com/cxtom/hoth/commit/9bdaee3ebc662d94afeb7711cc35e20ac417b1b6))
* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* **logger:** add parseTime & validationTime & pid ([e7a8304](https://github.com/cxtom/hoth/commit/e7a830402b70af1fe26029fbf87c159dacb3004e))
* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))





## [1.0.10](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.10) (2021-04-28)


### Bug Fixes

* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))





## [1.0.9](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.9) (2021-04-20)


### Bug Fixes

* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))





## [1.0.8](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.8) (2021-04-01)


### Bug Fixes

* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))


### Performance Improvements

* reuse the stream ([333a5fe](https://github.com/cxtom/hoth/commit/333a5fe2a36811c9d11c827f7a5745c6c35e696d))





## [1.0.7](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.7) (2021-03-29)


### Bug Fixes

* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* throw error when exit ([f290b80](https://github.com/cxtom/hoth/commit/f290b80a484d1ddd0e9dab376c5a48a5f0dd44a8))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.6](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.6) (2021-03-25)


### Bug Fixes

* logger notice format not valid ([a864b1e](https://github.com/cxtom/hoth/commit/a864b1e9ab56293935b6463642384d77c353a5aa))
* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* add log rotate ([de2a9a7](https://github.com/cxtom/hoth/commit/de2a9a7c57544bbee4ab818cf166e6d706a78c35))
* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.5](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.5) (2021-03-24)


### Bug Fixes

* **logger:** remove querystring in product ([426b3eb](https://github.com/cxtom/hoth/commit/426b3eb783c3f2714ba68e3f89be6a4148ce08dd))


### Features

* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.4](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.4) (2021-03-23)


### Features

* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.3](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.3) (2021-03-20)


### Features

* logger add notice & performace ([f3c73a0](https://github.com/cxtom/hoth/commit/f3c73a0ab5e480bef01476b922e3e319977ef9ff))





## [1.0.2](https://github.com/cxtom/hoth/compare/@hoth/logger@1.0.1...@hoth/logger@1.0.2) (2021-03-11)

**Note:** Version bump only for package @hoth/logger
