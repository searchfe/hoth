import {molecule} from '../src/index';

const fatalMock = jest.fn();
const logger = {
    warn: jest.fn(),
    info: jest.fn(),
    fatal: fatalMock
};

const rootPath = `${__dirname}/`;

describe('molecule test', () => {
    it('molecule render test', async () => {
        const ctrlPath = 'ctrollerMock';
        const data = {
            title: 'app',
            content: '111'
        };
        const ret = await molecule(ctrlPath, data, {
            root: rootPath,
            appName: 'app',
            name: '',
            logger: logger as any
        });

        expect(ret).toBe('mock controller app 111');

        const ret2 = await molecule(ctrlPath, {
            title: 'app2',
            content: '222'
        }, {
            root: './',
            appName: 'app',
            name: '',
            logger: logger as any
        });
        expect(ret2).toBe('mock controller app2 222');
    });

    it('molecule render error', async () => {
        const ctrlPath = 'ctrollerMock';
        try {
            await molecule(ctrlPath, null, {
                root: rootPath,
                appName: 'app2',
                name: '',
                logger: logger as any
            });
        } catch (e) {
            expect(fatalMock).toBeCalled();
        }
    });
});
