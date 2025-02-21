
import view from '@hoth/view';
import ejs from 'ejs';
import path from 'path';
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
