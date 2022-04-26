import {configureServiceTest} from 'fastify-decorators/testing';
import Calculator from '../../../src/lib/calc/index.service';

describe('Service: AuthService', () => {
    let service: Calculator;

    beforeEach(() => {
        service = configureServiceTest({
            service: Calculator,
        });
    });
    afterEach(() => jest.restoreAllMocks());

    it('add', async () => {

        const result = service.add(1, 2);

        expect(result).toBe(3);
    });
});
