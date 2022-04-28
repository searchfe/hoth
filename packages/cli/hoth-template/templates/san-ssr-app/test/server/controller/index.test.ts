import swig from 'swig';
import view from '@hoth/view';
import {FastifyInstance} from 'fastify';
import {configureControllerTest} from 'fastify-decorators/testing';
import AppController from '../../../server/controller/index/index.controller';
import fp from 'fastify-plugin';
import path from 'path';

describe('Controller: AppController', () => {
    let instance: FastifyInstance;

    beforeEach(async () => {
        instance = await configureControllerTest({
            controller: AppController,

            // mock other plugin
            plugins: [
                fp(async (fastify: FastifyInstance) => {
                    fastify.decorateRequest('$appConfig', {
                        get() {
                            return path.resolve(__dirname, '../../../dist')
                        }
                    });
                    fastify.register(view, {
                        engine: {swig},
                        templatesDir: path.resolve(__dirname, '../../../dist/view')
                    });
                })
            ]
        });
    });
    afterEach(() => jest.restoreAllMocks());

    it('get /index', async () => {

        const result = await instance.inject({
            url: '/index',
            method: 'GET',
        });

        expect(result.body).toContain('<h1>Hello World!</h1>');
    });
});
