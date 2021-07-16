function p(fastify, options, done) {
    fastify.decorateRequest('addReq', 'ok');
    done();
}

p[Symbol.for('skip-override')] = true;

module.exports = p;
