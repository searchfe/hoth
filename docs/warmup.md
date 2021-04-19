# 预热

在 src/config 目录下新增 warmup.ts 文件可以开启预热功能。

warmup.ts 中的内容为 [fastify-warmup](https://github.com/searchfe/fastify-warmup) 的配置项。

例如：

```ts
import type {WarmupConf} from 'fastify-warmup';
export default {
    warmupData: {
        '/myapp/index': 'a.json'
    },
    maxConcurrent: 3,
    basePath: '/path/to/your/app/warmupData'
} as WarmupConf;
```