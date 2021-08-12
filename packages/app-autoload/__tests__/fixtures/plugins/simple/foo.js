module.exports = async function (fastify, opts) {
    fastify.decorate('foo', opts);
};

module.exports.autoConfig = {
    foo: 1,
};
