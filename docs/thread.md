# 子线程

不支持弹性伸缩，需设定子线程数量。

初始化时（调用 fastify.register）会创建固定数量的子线程，不会主动销毁。

## 配置项

在 src/config 目录下新增 thread.ts 文件可以开启子线程功能。

```ts
import path from 'path';
import type {HothThreadConf} from '@hoth/thread';

export default {
    threadsNumber: 10,
    filename: path.resolve(__dirname, '../worker/index.js'),
    warmupConfig: {
        warmupData: [''],
        basePath: path.resolve(__dirname, '../worker/warmupData'),
        maxConcurrent: 10
    }
} as HothThreadConf;
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
