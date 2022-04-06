# hoth
A Node.js framework based on [Fastify](https://github.com/fastify/fastify).

[![npm version](https://img.shields.io/npm/v/@hoth/cli.svg)](https://www.npmjs.com/package/@hoth/cli)
[![downloads](https://img.shields.io/npm/dm/@hoth/cli.svg)](https://www.npmjs.com/package/@hoth/cli)
[![Build Status](https://github.com/searchfe/hoth/actions/workflows/ci.yml/badge.svg)](https://github.com/searchfe/hoth/actions?query=workflow:CI)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/hoth/badge.svg?branch=main)](https://coveralls.io/github/searchfe/hoth?branch=main)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/searchfe/hoth)

### Requirements

Node.js v12+

## 安装
hoth 提供了一个命令行工具，为开发 san ssr、vue ssr 等应用快速搭建脚手架。

```sh
npm install @hoth/cli --global
```

## 快速开始

创建项目:

```sh
hoth generate myproject
```

脚手架需要选择项目类型，目前支持 4 种项目类型：

- Normal：适合常规的 nodejs 服务端项目，没有前端编译，适合有服务端逻辑，且前端编译需要自定义的项目 [示例](https://github.com/searchfe/hoth/tree/main/example/hoth-quickstart)
- Molecue：适合只有简单渲染逻辑的服务端项目，无服务端逻辑，且需要自己定义前端相关编译的项目 [示例](https://github.com/searchfe/hoth/tree/main/example/hoth-molecule)
- Vue SSR App：开箱即用，使用 vue 3.0 + vue-cli，包含服务端渲染、vue 文件的编译配置
- San SSR App：开箱即用，使用 san + san-cli + san-ssr，包含服务端渲染、san 文件的编译配置

创建完成以后进入项目目录下安装依赖：

```sh
cd myproject && npm install
```

本地开发：

```sh
npm run dev
```

## 目录结构

推荐使用如下目录结构：

```
└── application/
    └── src                              # 源代码目录
        └── controller/                  # API resources
            └── result/                  # /${APP_NAME}/result 路由相关代码
                └── result.controller.ts # 处理器，自动加载
                └── result.service.ts    # 处理器特定的 Service
                └── result.schema.ts     # 编写输入输出 schema 的类型定义，可以通过工具转为 json schema，
                └── result.service.test.ts    # Service 的单测文件
        └── lib/                         # 通用的 Service 和工具函数库
        └── config/                      # 配置文件，自动加载
            └── default.ts               # 默认配置
            └── development.ts           # development 配置
            └── production.ts            # production 配置
            └── plugin.ts                # 插件相关配置
        └── plugin/                      # 模版文件目录
            └── segmentEngine.ts           # 业务相关插件，自动加载
        └── view/                        # 模版文件目录
            └── home.swig                  # 模版文件
        └── warmup/                      # 预热目录
            └── result.json            # 预热数据
        └── app.ts                       # 入口文件
    └── tsconfig.json                    # ts 配置
    └── package.json                     # npm 配置
    └── jest.config.js                   # jest 配置
```

## 示例项目

https://github.com/searchfe/hoth/tree/main/example/hoth-quickstart