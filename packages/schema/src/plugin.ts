import type {FastifyInstance} from 'fastify';
import {promises as fs} from 'fs';

export async function initSchema(fastify: FastifyInstance, options: {
    schemaPath: string;
}) {
    const {
        schemaPath
    } = options;

    const schemaContent = await fs.readFile(schemaPath, 'utf-8');

    // 异常不处理，直接抛出
    const schema = JSON.parse(schemaContent);

    Object.keys(schema).forEach(id => {
        const innerSchema = schema[id];
        innerSchema.$id = id;
        fastify.addSchema(innerSchema);
    });
}
