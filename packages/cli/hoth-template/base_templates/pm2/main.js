const {performance} = require('perf_hooks');

module.exports = async function (fastify, {apps}) {
    fastify.addHook('onRequest', async (request, reply) => {
        request.parse_time_start = performance.now();
    });

    fastify.addHook('preValidation', async (request, reply) => {
        request.validation_time_start = performance.now();
    });

    fastify.addHook('preHandler', async (request, reply) => {
        // const parseTime = request.validation_time_start - request.parse_time_start;
        // const validationTime = performance.now() - request.validation_time_start;
    });
};
