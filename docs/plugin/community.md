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

### fastify-sequelize

可以使用 `fastify-sequelize`，直接注册即可。也可以直接使用 sequelize，自行包装：

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

### fastify-swagger

直接注册即可使用:

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