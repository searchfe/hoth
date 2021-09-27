import fastify from 'fastify';
import {loadMoleculeApp} from '../src/loadMoleculeApp';

let moleculeMock = jest.fn((ctrlPath, data, option) => {
    if (!option.appName) {
        return null;
    }
    return 'mock ok';
});
let appConfig = {
    dir: '',
    prefix: '',
    name: '',
    rootPath: ''
};

describe('loadMoleculeApp test', () => {
    beforeEach(() => {
        moleculeMock.mockClear();

        appConfig = {
            dir: `${__dirname}/moleucleMock/`,
            prefix: '',
            name: 'myapp',
            rootPath: ''
        };
        // @ts-ignore
        process.env.DATA_MOCK = '';
    });

    it('response statusCode should 200', async () => {
        let fInstance = fastify();
        fInstance.decorate('molecule', moleculeMock);

        await loadMoleculeApp(appConfig, fInstance);
        let response = await fInstance.inject({
            method: 'GET',
            path: '/index'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(JSON.stringify({
            statusCode: 200,
            data: 'mock ok'
        }));

        // test post
        let response2 = await fInstance.inject({
            method: 'POST',
            path: '/route2'
        });
        expect(response2.body).toBe('mock ok');

        // test patch
        let response3 = await fInstance.inject({
            method: 'patch',
            path: '/route3'
        });
        expect(response3.statusCode).toBe(200);
    });

    it('statusCode should 500', async () => {
        appConfig.name = '';
        let fInstance = fastify();
        fInstance.decorate('molecule', moleculeMock);

        await loadMoleculeApp(appConfig, fInstance);
        let response = await fInstance.inject({
            method: 'GET',
            path: '/index'
        });
        expect(response.body).toBe(JSON.stringify({
            statusCode: 500,
            message: 'render error'
        }));
    });

    it('data should mock', async () => {
        // @ts-ignore
        process.env.DATA_MOCK = 'true';

        let fInstance = fastify();
        fInstance.decorate('molecule', moleculeMock);

        await loadMoleculeApp(appConfig, fInstance);
        let response = await fInstance.inject({
            method: 'GET',
            path: '/index'
        });

        expect(response.statusCode).toBe(200);
        expect(moleculeMock.mock.calls[0][1]).toEqual({title: 'myapp'});
    });

});
