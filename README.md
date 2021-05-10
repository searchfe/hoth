# hoth
A Node.js framework based on fastify

## Requirements

Node.js v12 or later.

## Install

```sh
npm install @hoth/cli --global
```

### Quick start

Create a app:

```sh
hoth generate --app-name="myapp" myapp
```

> option `--app-name` is required

#### project types

- `Normal`(with [fastify-decorators](https://github.com/L2jLiga/fastify-decorators)): [example](https://github.com/searchfe/hoth/tree/main/example/hoth-quickstart)
- `Molecue` (ssr only): [example](https://github.com/searchfe/hoth/tree/main/example/hoth-molecule)

Install dependencies:

```sh
npm install
```

To start the app in dev mode:

```sh
npm run dev
```
