import pointOfView from 'point-of-view';
import nunjucks from 'nunjucks';
import path from 'path';
import {FastifyInstance} from 'fastify';
export default async function main(fastify: FastifyInstance, config) {
    await fastify.register(pointOfView, {
        engine: {
            nunjucks,
        },
        root: path.join(config.dir, 'view'),
    });
    return fastify;
}
