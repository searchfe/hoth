# 预热

在 src/config 目录下新增 warmup.ts 文件可以开启预热功能。

warmup.ts 中的内容为 [fastify-warmup](https://github.com/searchfe/fastify-warmup) 的配置项。

例如：

```ts
import type {WarmupConf} from 'fastify-warmup';
export default {
    warmupData: {
        '/index': 'a.json'
    },
    maxConcurrent: 3,
    basePath: '/path/to/your/app/warmupData'
} as WarmupConf;
```

---

**注意: 配置文件中的路径，不需要增加 prefix，例如 prefix 为 myapp。**

写成这样：

```ts
warmupData: {
    '/index': 'a.json'
}
```

而不是：

```ts
warmupData: {
    '/myapp/index': 'a.json'
}
```