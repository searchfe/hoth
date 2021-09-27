module.exports = async function (fastify, options) {
    fastify.get('/foo', async (req, reply) => {
        console.log('warmup ok');
        reply.send('ok');
    });
    return fastify;
};