import {ResourceManager} from '../src/resourceManager';
import {resourceManager} from '../src/index';

let rootDir = './__tests__/conf/demo';
let logger = {
    fatal: jest.fn(),
    warn: jest.fn(),
} as any;

let adapterMock = {
    loadSync: jest.fn(),
    loadAsync: jest.fn(),
};

let manager: ResourceManager;

describe('ResourceManager', () => {
    beforeEach(() => {
        manager = resourceManager(rootDir, logger);
    });

    test('fetchAll and fetch', async () => {
        await manager.registerResourceFromConfig();

        // fetchAll
        let data = manager.fetchAll() as any;
        expect(data.get('dict1')).toBeTruthy();
        expect(data.get('dict2')).toBeTruthy();
        expect(data.get('dict3')).toBeTruthy();

        // fetch
        let dict1Data = manager.fetch('dict1');
        expect(dict1Data).toBeTruthy();
    });

    test('exception of registerResourceFromConfig', async () => {
        // conf文件 不存在
        let res = await manager.registerResourceFromConfig('xx.conf');
        expect(res).toBe(false);

        // conf文件后缀不支持
        let res2 = await manager.registerResourceFromConfig('mock.txt');
        expect(res2).toBe(false);

        // 文件读取error
        let res3 = await manager.registerResourceFromConfig('errormock.json');
        expect(res3).toBe(false);
    });

    test('reload', async () => {
        await manager.registerResourceFromConfig();
        let ret = await manager.reload();
        expect(ret).toBe(true);

        let ret2 = await manager.reload(['dict2', 'xxx']);
        expect(ret2).toBe(true);
    });

    test('exception of registerResource', async () => {
        await manager.registerResourceFromConfig();
        // 重复注册 dict1
        let ret = await manager.registerResource('dict1', {} as any);
        expect(ret).toBe(false);
    });

    test('exception of registerAdapter', () => {
        let ret = manager.registerAdapter('conf', adapterMock);
        expect(ret).toBe(false);
    });
});
