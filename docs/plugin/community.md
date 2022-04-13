# 社区插件

https://www.fastify.cn/ecosystem/ 中的大部分插件都可以直接使用。

通常来说只需要在 `app.ts` 中注册即可：

```typescript
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';
import SomeFastifyPlugin from 'fastify-xxx';

export default async function main(fastify: FastifyInstance, config: AppConfig) {
    fastify.register(SomeFastifyPlugin);
    return fastify;
}
```

## fastify-redis

> Fastify Redis connection plugin, with which you can share the same Redis connection across every part of your server.

使用 [fastify-redis](https://github.com/fastify/fastify-redis)，直接注册：

```typescript
import path from 'path';
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';
import fastifyRedis from 'fastify-redis';
export default async function main(fastify: FastifyInstance, config: AppConfig) {
    await fastify.register(fastifyRedis, { 
        host: '127.0.0.1', 
        password: '***',
        port: 6379, // Redis port
        family: 4   // 4 (IPv4) or 6 (IPv6)
    });
    return fastify;
}
```

## fastify-sequelize

> Sequelize (adapter for NodeJS -> Sqlite, Mysql, Mssql, Postgres).

可以使用 [fastify-sequelize](https://github.com/lyquocnam/fastify-sequelize)，直接注册即可。也可以直接使用 sequelize，自行包装：

```typescript
// src/plugin/sequelize.ts
import type {FastifyInstance} from 'fastify';
import fp from 'fastify-plugin';
import {Sequelize, Options as SequelizeOptions, DataTypes, Model} from 'sequelize';

function initModels(sequelize: Sequelize) {
    sequelize.define('XXX', {
        name: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'xxx',
        timestamps: false,
    });
}

export default fp(async function (fastify: FastifyInstance, opts: SequelizeOptions) {
    const sequelize = new Sequelize(opts);

    initModels(sequelize);

    await sequelize.authenticate();

    fastify.decorate('sequelize', sequelize);
    fastify.addHook('onClose', (fastifyInstance, done) => {
        sequelize.close().then(() => done()).catch(e => done(e));
    });
});

export const autoConfig: SequelizeOptions = {
    database: 'database',
    username: 'name',
    password: '123456',
    port: 8080,
    host: '127.0.0.1',
    dialect: 'mysql',
};
```

## fastify-static

> Plugin for serving static files as fast as possible.

[fastify-static](https://github.com/fastify/fastify-static)，直接注册即可：

```typescript
import path from 'path';
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';
import fastifyStatic from 'fastify-static';
export default async function main(fastify: FastifyInstance, config: AppConfig) {
    await fastify.register(fastifyStatic, {
        root: path.join(__dirname, './public'),
        prefix: '/public/',
    });
    return fastify;
}

```


## fastify-swagger

> Plugin for serving Swagger/OpenAPI documentation for Fastify, supporting dynamic generation.

直接注册[fastify-swagger](https://github.com/fastify/fastify-swagger)即可使用:

```typescript
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';
import swagger from 'fastify-swagger';

export default async function main(fastify: FastifyInstance, config: AppConfig) {
    fastify.register(helmet, {contentSecurityPolicy: false});
    return fastify;
}
```

需要注意的是跟 `fastify-helmet` 一起使用时，需要关闭 `fastify-helmet` 中的 `contentSecurityPolicy`:

```typescript
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';
import helmet from 'fastify-helmet';
import swagger from 'fastify-swagger';

export default async function main(fastify: FastifyInstance, config: AppConfig) {
    fastify.register(swagger, {
        routePrefix: '/documentation',
        exposeRoute: true,
    });
    fastify.register(helmet, {contentSecurityPolicy: false});
    return fastify;
}
```