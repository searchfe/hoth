import path from 'path';
import {FastifyInstance} from 'fastify';
import {initSchema} from '@hoth/schema';
export default async function main(fastify: FastifyInstance, config) {
    await initSchema(fastify, {
        schemaPath: path.resolve(__dirname, './interfaces/schema.json'),
    });
    return fastify;
}
