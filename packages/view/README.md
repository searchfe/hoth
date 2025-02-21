# @hoth/view

## Usage

1. register view plugin in app.ts

```ts
import path from 'path';
import view from '@hoth/view';
import ejs from 'ejs';
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';

export default async function main(fastify: FastifyInstance, config: AppConfig) {
    await fastify.register(view, {
        engine: {
            ejs,
        },
        renderOnly: true,
        templatesDir: path.join(config.dir, 'view'),
    });
    return fastify;
}
```

2. use reply.render to render view

```ts
const html = await reply.render('index.tpl', {
    name: 'world',
});

reply.send(html);
```
