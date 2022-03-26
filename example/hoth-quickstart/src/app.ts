import pointOfView from 'point-of-view';
import nunjucks from 'nunjucks';
import path from 'path';
import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';
export default async function main(fastify: FastifyInstance, config: AppConfig) {
    await fastify.register(pointOfView, {
        engine: {
            nunjucks,
        },
        root: path.join(config.dir, 'view'),
    });
    return fastify;
}
