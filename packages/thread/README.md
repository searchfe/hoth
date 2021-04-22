# @hoth/thread

## 使用方式

### main

该插件会在 fastify 实例上新增两个属性：

* `fastify.piscina` {`Piscina`} Piscina 实例
* `fastify.runTask()` {`Function`} Piscina runTask 函数

```ts
import thread from '@hoth/thread/plugin';
import fastify from 'fastify';
import path from 'path';

const app = fastify();

app.register(thread, {
    threadsNumber: 10,
    filename: path.resolve(__dirname, 'worker.js')
})

app.get('/', async (request, reply) => {
  reply.send({ hello: `world [${await app.runTask({ a: 1, b: 2 })}]` });
});
```

### worker

```ts
import worker from '@hoth/thread/worker';

export default worker(function (args) {
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

### runTask 时

```ts
try {
    await fastifyInstance.runTask();
}
catch (e) {
    // do something
}
```