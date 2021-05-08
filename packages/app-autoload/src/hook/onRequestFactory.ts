
export default function (appConfig, fastify) {
    return function (req, reply, done) {
        req.$appConfig = appConfig;
        req.$appConfData = fastify.$appConfData;
        req.$service = fastify;
        done();
    };
}
