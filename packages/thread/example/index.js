const fastify = require('fastify');
const thread = require('../dist/plugin');
const path = require('path');

process.env.ROOT_PATH = __dirname;

const app = fastify({
    logger: true
});

app.register(thread, {
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
