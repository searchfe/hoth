import {configureServiceTest} from 'fastify-decorators/testing';
import VueSSREngine from '../../../../server/lib/vue-ssr-engine/index.service';

describe('Service: AuthService', () => {
    let service: VueSSREngine;

    beforeEach(() => {
        service = configureServiceTest({
            service: VueSSREngine,
        });
    });
    afterEach(() => jest.restoreAllMocks());

    it('add', async () => {
        const component = {
            props: ['word'],
            data: () => ({count: 1}),
            template: '<button @click="count++">{{ word }}{{ count }}</button>'
        };

        const res = await service.render(component, {
            word: 'Current count: '
        });

        expect(res).toBe('<button>Current count: 1</button>');
    });
});
