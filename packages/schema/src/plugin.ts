import {FastifyInstance} from 'fastify';

export function initSchema(fastify: FastifyInstance, options: {
    schemaPath: string
}) {
    const {
        schemaPath
    } = options;

    const schema = require(schemaPath);
    Object.keys(schema).forEach(id => {
        const innerSchema = schema[id];
        innerSchema['$id'] = id;
        fastify.addSchema(innerSchema);
    });
}