import pointOfView from 'point-of-view';
import nunjucks from 'nunjucks';
import {FastifyInstance} from 'fastify';
import {configureControllerTest} from 'fastify-decorators/testing';
import AppController from '../../../src/controller/index/index.controller';
import Calculator from '../../../src/lib/calc/index.service';
import fp from 'fastify-plugin';
import path from 'path';

describe('Controller: AppController', () => {
    let instance: FastifyInstance;
    const calcService = {add: jest.fn()};

    beforeEach(async () => {
        instance = await configureControllerTest({
            controller: AppController,

            // mock services
            mocks: [
                {
                    provide: Calculator,
                    useValue: calcService,
                },
            ],

            // mock other plugin
            plugins: [
                fp(async (fastify: FastifyInstance) => {
                    fastify.decorateRequest('$appConfig', {get: jest.fn()});
                    fastify.register(pointOfView, {
                        engine: {nunjucks},
                        root: path.resolve(__dirname, '../../../src/view')
                    });
                })
            ]
        });
    });
    afterEach(() => jest.restoreAllMocks());

    it('get /index', async () => {
        calcService.add.mockReturnValue(20);

        const result = await instance.inject({
            url: '/index',
            method: 'GET',
        });

        expect(result.body).toContain('num: 20');
    });
});
