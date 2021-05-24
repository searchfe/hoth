import Fastify, {FastifyReply, FastifyRequest} from 'fastify';

describe('reply.render with swig engine', () => {
    const fastify = Fastify();
    const Swig = require('swig');

    it('simple output', async () => {
        const data = {title: 'fastify', text: 'text'};

        fastify.register(require('../index'), {
            engine: {
                swig: Swig,
            },
            templatesDir: __dirname,
        });

        fastify.get('/', (req: FastifyRequest, reply: FastifyReply) => {
            reply.render('templates/index.swig', data)
        });

        const response = await fastify.inject({
            method: 'GET',
            path: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('<h1>fastify</h1>\n<p>text</p>');
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });
});
