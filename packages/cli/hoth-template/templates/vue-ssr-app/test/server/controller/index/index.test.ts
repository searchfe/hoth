import swig from 'swig';
import view from '@hoth/view';
import {FastifyInstance} from 'fastify';
import {configureControllerTest} from 'fastify-decorators/testing';
import AppController from '../../../../server/controller/index/index.controller';
import fp from 'fastify-plugin';
import path from 'path';
import VueSsrEngine from '../../../../server/lib/vue-ssr-engine/index.service';

describe('Controller: AppController', () => {
    let instance: FastifyInstance;
    const vueSsrEngine = {render: jest.fn()};

    beforeEach(async () => {
        instance = await configureControllerTest({
            controller: AppController,

            // mock services
            mocks: [
                {
                    provide: VueSsrEngine,
                    useValue: vueSsrEngine,
                },
            ],

            // mock other plugin
            plugins: [
                fp(async (fastify: FastifyInstance) => {
                    fastify.decorateRequest('$appConfig', {
                        get() {
                            return path.resolve(__dirname, '../../../../dist')
                        }
                    });
                    fastify.register(view, {
                        engine: {swig},
                        templatesDir: path.resolve(__dirname, '../../../../dist/view')
                    });
                })
            ]
        });
    });
    afterEach(() => jest.restoreAllMocks());

    it('get /index', async () => {
        vueSsrEngine.render.mockReturnValue('<h1>Hello World!</h1>');

        const result = await instance.inject({
            url: '/index',
            method: 'GET',
        });

        expect(result.body).toContain('<h1>Hello World!</h1>');
    });
});
