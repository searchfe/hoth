const fastify = require('fastify');
const {threadPlugin} = require('../index');
const path = require('path');

process.env.ROOT_PATH = __dirname;

const app = fastify({
    logger: true
});

app.register(threadPlugin, {
    threadsNumber: 1,
    filename: path.resolve(__dirname, './worker.js'),
    logConfig: {
        appName: 'meixg'
    },
    warmupConfig: {
        warmupData: ['a.json'],
        basePath: path.resolve(__dirname, './warmupData')
    }
});

app.register(async instance => {
    instance.get('/a', async () => {
        // @ts-ignore
        return instance.runTask('a');
    });
});

app.listen('8999');
