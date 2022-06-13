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

    it('missing engine', async () => {
        const fastifyInstance = fastify();
        let throwError = new Error('no error');

        try {
            // @ts-ignore
            await fastifyInstance.register(view, {
                templatesDir: __dirname,
            });
        }
        catch (e) {
            throwError = e;
        }

        expect(throwError.message).toBe('Missing engine');
    });

    it('not supported engine', async () => {
        const fastifyInstance = fastify();
        let throwError = new Error('no error');

        try {
            // @ts-ignore
            await fastifyInstance.register(view, {
                engine: {
                    // @ts-ignore
                    foo: null,
                },
                templatesDir: __dirname,
            });
        }
        catch (e) {
            throwError = e;
        }

        expect(throwError.message).toBe('\'foo\' not yet supported');
    });

    it('$appConfig', async () => {
        const fastifyInstance = fastify();
        const mock = jest.fn();
        // @ts-ignore
        fastifyInstance.$appConfig = {
            get(name: string) {
                mock(name);
                return __dirname;
            }
        };

        await fastifyInstance.register(view, {
            engine: {
                swig: Swig,
            }
        });

        expect(mock).toHaveBeenCalledWith('dir');

        const data = {title: 'fastify', text: 'text'};
        fastifyInstance.get('/', (req: FastifyRequest, reply: FastifyReply) => {
            reply.render('index.swig', data);
        });

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('<h1>fastify</h1>\n<span>text</span>');
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

    it('render with cb', async () => {
        const fastifyInstance = fastify();
        const data = {
            title: 'fastify',
            text: 'text'
        };

        fastifyInstance.register(view, {
            engine: {
                swig: Swig,
            },
            templatesDir: __dirname
        });

        fastifyInstance.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
            const renderPage = () => {
                return new Promise(function (resolve, reject) {
                    reply.render('templates/index.swig', data, function (err, html) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(html + '<p>cbRender</p>');
                    });
                });
            };
            const html = await renderPage();
            expect(html).toBe('<h1>fastify</h1>\n<p>text</p><p>cbRender</p>');
            reply.header('content-type', 'text/html; charset=utf-8');
            reply.send(html);
        });

        const response = await fastifyInstance.inject({
            method: 'GET',
            path: '/'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('<h1>fastify</h1>\n<p>text</p><p>cbRender</p>');
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8');
    });
});
