import fastify from 'fastify';
import thread from '../src/plugin';

const app = fastify({
    logger: true
});

app.register(thread, {
    threadsNumber: 1
});
