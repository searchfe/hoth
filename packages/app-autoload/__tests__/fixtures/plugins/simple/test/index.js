exports.default = async function (fastify, opts) {
    fastify.decorate('test', opts);
};

exports.autoConfig = {
    test: 1,
};
