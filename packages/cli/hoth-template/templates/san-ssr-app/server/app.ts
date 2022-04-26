import swig from 'swig';
import view from '@hoth/view';
import path from 'path';
import staticPlugin from 'fastify-static';

import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';

export default async function main(fastify: FastifyInstance, config: Pick<AppConfig, 'dir'>) {
    await fastify.register(view, {
        engine: {
            swig,
        },
        templatesDir: path.join(config.dir, 'view'),
    });

    fastify.register(staticPlugin, {
        root: path.join(config.dir, 'static'),
        prefix: '/static/', // optional: default '/'
    });

    return fastify;
}
