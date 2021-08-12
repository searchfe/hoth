module.exports = async function (fastify, opts) {
    fastify.decorate('realPlugin', opts);
};

module.exports.autoConfig = {
    realPlugin: 1,
};
