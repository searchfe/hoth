# 子线程

使用 `@hoth/thread` 来引入子进程能力。

不支持弹性伸缩，需设定子线程数量。

初始化时会创建固定数量的子线程，不会主动销毁。

## 通过 initThread 来使用

在 app.ts 中使用 initThread 来创建子线程。

```ts
import {initThread} from '@hoth/thread';
import path from 'path';
import {FastifyInstance} from 'fastify';
export default async function main(fastify: FastifyInstance, config) {
    const pool = await initThread({
        logConfig: {
            appName: config.name
        },
        threadsNumber: 10,
        filename: path.resolve(__dirname, 'worker.js')
    });

    // 自己处理 pool 的使用方式
    fastify.decorate('piscina', pool);
    fastify.decorate('runTask', (...args) => pool.runTask(...args));
    return fastify;
}
```

## 在 controller 中使用

```ts
import {Controller, GET, Inject, getFastifyInstanceByAppName} from '@hoth/decorators';
import {FastifyReply, FastifyRequest} from 'fastify';

@Controller('/index')
export default class AppController {
    private readonly runTask = getFastifyInstanceByAppName('myapp').runTask;

    @GET()
    async getHandler(req: FastifyRequest, reply: FastifyReply) {
        const res = await this.runTask('xxx');

        // 其他逻辑
    }
}
```

## worker.ts

子线程需要使用 `workerWrapper` 来进行封装。

第一个参数是 hothUtils，其中提供了 logger。

```ts
import {workerWrapper} from '@hoth/thread';

export default workerWrapper(async ({logger}, data) => {
    // do something
});
```

## 线程预热

`warmupConfig` 配置项可以用来配置子线程预热。

```ts
import path from 'path';
import type {HothThreadConf} from '@hoth/thread';

const conf = {
    threadsNumber: 10,
    filename: path.resolve(__dirname, '../worker/index.js'),
    warmupConfig: {
        warmupData: [''],
        basePath: path.resolve(__dirname, '../worker/warmupData'),
        maxConcurrent: 10
    }
} as HothThreadConf;
```
