# hoth
A Node.js framework based on fastify

[![npm version](https://img.shields.io/npm/v/@hoth/cli.svg)](https://www.npmjs.com/package/@hoth/cli)
[![downloads](https://img.shields.io/npm/dm/@hoth/cli.svg)](https://www.npmjs.com/package/@hoth/cli)
[![Build Status](https://github.com/searchfe/hoth/actions/workflows/ci.yml/badge.svg)](https://github.com/searchfe/hoth/actions?query=workflow:CI)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/hoth/badge.svg?branch=main)](https://coveralls.io/github/searchfe/hoth?branch=main)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/searchfe/hoth)

## Requirements

Node.js v12 or later.

## Install

```sh
npm install @hoth/cli --global
```

### Quick start

Create a project:

```sh
hoth generate myproj
```
#### project types

- `Normal`(with [fastify-decorators](https://github.com/L2jLiga/fastify-decorators)): [example](https://github.com/searchfe/hoth/tree/main/example/hoth-quickstart)
- `Vue SSR App`: normal template with vue 3.0 ssr
- `San SSR App`: normal template with san ssr

Install dependencies:

```sh
npm install
```

To start the service in dev mode:

```sh
npm run dev
```

## Development

> Node.js v16 is recommended while developing.
>
> The semantic-release needs Node.js v16 to install. You can still use Node.js v12 after install though, we don't need semantic-release while developing.

### Preparation
```sh
npm i lerna -g --registry https://registry.npmmirror.com
lerna bootstrap --registry https://registry.npmmirror.com
lerna link
```

### Cli development
```sh
# add npm package
lerna add config-enhanced --scope @hoth/app-autoload --registry https://registry.npmmirror.com

# watch packages
lerna exec "tsc --build -w tsconfig.json" --scope @hoth/cli
lerna exec "tsc --build -w tsconfig.json" --scope @hoth/decorators
lerna exec "tsc --build -w tsconfig.json" --scope @hoth/app-autoload
lerna exec "tsc --build -w tsconfig.json" --scope @hoth/logger

# debug for example
cd example/hoth-quickstart
npm i --registry https://registry.npmmirror.com
npm run dev

# unit test fro a package
npm run test packages/logger
npm run test packages/cli
npm run test packages/app-autoload

```

