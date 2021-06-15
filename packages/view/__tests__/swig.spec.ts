import fastify, {FastifyReply, FastifyRequest} from 'fastify';
import view from '../src/index';
import Swig from 'swig';

describe('reply.render with swig engine', () => {

    it('simple output', async () => {
        const fastifyInstance = fastify();
        const data = {title: 'fastify', text: 'text'};

        fastifyInstance.register(view, {
            engine: {
                swig: Swig,
            },
            templatesDir: __dirname,
        });

        fastifyInstance.get('/', (req: FastifyRequest, reply: FastifyReply) => {
            reply.render('templates/index.swig', data);
        });

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('<h1>fastify</h1>\n<p>text</p>');
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });

    it('simple output', async () => {
        const fastifyInstance = fastify();
        const data = {
            title: 'fastify',
            text: 'text'
        };

        fastifyInstance.register(view, {
            engine: {
                swig: Swig,
            },
            templatesDir: __dirname,
            renderOnly: true,
        });

        fastifyInstance.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
            const html = await reply.render('templates/index.swig', data);
            expect(html).toBe('<h1>fastify</h1>\n<p>text</p>');
            reply.header('content-type', 'text/html; charset=utf-8');
            reply.send(html);
        });

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('<h1>fastify</h1>\n<p>text</p>');
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });
});
