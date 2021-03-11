
export default function (appConfig, fastify) {
    return function (req, reply, done) {
        req.$appConfig = appConfig;
        req.$service = fastify;
        done();
    };
}
