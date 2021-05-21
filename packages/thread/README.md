# @hoth/thread

thread worker pool based on piscina.

## 使用方式

### main

- fastify 插件

    该插件会在 fastify 实例上新增两个属性，内部使用 fastify-plugin 来包裹，因此会在全局实例上增加：

    * `fastify.piscina` {`Piscina`} Piscina 实例
    * `fastify.runTask()` {`Function`} Piscina runTask 函数

    ```ts
    import {threadPlugin} from '@hoth/thread';
    import fastify from 'fastify';
    import path from 'path';

    const app = fastify();

    app.register(threadPlugin, {
        threadsNumber: 10,
        filename: path.resolve(__dirname, 'worker.js')
    })

    app.get('/', async (request, reply) => {
    reply.send({ hello: `world [${await app.runTask({ a: 1, b: 2 })}]` });
    });
    ```

- initThread

    如果不想在全局实例上增加属性，可以单独调用 initThread 方法：

    ```ts
    import {initThread} from '@hoth/thread';
    const pool = await initThread({
        threadsNumber: 10,
        filename: path.resolve(__dirname, 'worker.js')
    });

    // 自己处理 pool 的使用方式
    fastify.decorate('piscina', pool);
    fastify.decorate('runTask', (...args) => pool.runTask(...args));
    ```


### worker

```ts
import {
    workerWrapper,
    workerData
} from '@hoth/thread';

export default workerWrapper(function (args) {
    // use workerData
    // some task
});
```

## 异常处理

### 初始化时

当子线程创建失败，会有异常抛出，需要业务方自行处理。

```ts
try {
    await app.register(thread, {
        threadsNumber: 10
    });
}
catch (e) {
    // do something
}
```

或

```ts
app.register(thread, {
    threadsNumber: 10
});
try {
    await app.listen(3000);
}
catch (e) {
    // do something
}
```

initThread 时

```ts
try {
    const pool = await initThread({
        threadsNumber: 10,
        filename: path.resolve(__dirname, 'worker.js')
    });
}
catch (e) {
    // do something
}
```

### runTask 时

```ts
try {
    await fastifyInstance.runTask();
}
catch (e) {
    // do something
}
```