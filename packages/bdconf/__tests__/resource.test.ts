import {Resource} from '../src/resource';

let logger = {
    fatal: jest.fn(),
    warn: jest.fn(),
} as any;

let adapterMock = {
    loadSync: jest.fn(),
    loadAsync: jest.fn(),
};

let rootDir = './__tests__/conf/demo';

describe('Resource', () => {
    test('load', () => {
        let resource = new Resource({
            rootDir: rootDir,
            filePath: 'data.conf',
            adapter: adapterMock,
        }, logger);

        let ret = resource.load();

        expect(ret).toBe(true);
        expect(resource.isAvail()).toBe(true);

        let ret2 = resource.load();
        expect(ret2).toBe(true);
        expect(adapterMock.loadSync).toBeCalledTimes(1);
    });

    test('exception of load', () => {
        let resource = new Resource({
            rootDir: rootDir,
            filePath: 'xxx.conf',
            adapter: adapterMock,
        }, logger);

        let ret = resource.load();

        expect(ret).toBe(false);
        expect(logger.fatal).toBeCalled();
    });

    test('loadAsync', async () => {
        let resource = new Resource({
            rootDir: rootDir,
            filePath: 'data.conf',
            adapter: adapterMock,
        }, logger);

        let ret = await resource.loadAsync();

        expect(ret).toBe(true);
        expect(adapterMock.loadAsync).toBeCalledTimes(1);

    });

    test('exception of loadAsync', async () => {
        let resource = new Resource({
            rootDir: rootDir,
            filePath: 'xx.conf',
            adapter: adapterMock,
        }, logger);

        let ret = await resource.loadAsync();

        expect(ret).toBe(false);
        expect(logger.fatal).toBeCalled();
    });
});