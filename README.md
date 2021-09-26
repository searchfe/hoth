# hoth
A Node.js framework based on fastify

[![Coverage Status](https://coveralls.io/repos/github/searchfe/hoth/badge.svg?branch=main)](https://coveralls.io/github/searchfe/hoth?branch=main)

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
- `Molecue` (ssr only): [example](https://github.com/searchfe/hoth/tree/main/example/hoth-molecule)
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
