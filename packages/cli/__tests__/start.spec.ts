import {join} from 'path';
import {start} from '../src/start';
import {mockProcessExit, mockConsoleLog} from 'jest-mock-process';
import {noop} from '@hoth/utils';

let processExitCallback: (_: any) => Promise<void> = () => Promise.resolve(undefined);
jest.mock('close-with-grace', () => {
    return function (_: any, cb: (_: any) => Promise<void>) {
        processExitCallback = cb;
        return {
            uninstall: noop,
        };
    };
});

function triggerExit(signal: string, err: null | Error, manual: boolean) {
    processExitCallback({signal, err, manual});
}

describe('hoth cli start', () => {

    it('show help', async () => {
        const mockLog = mockConsoleLog();
        const mockExit = mockProcessExit();

        await start(['--help']);

        expect(mockLog).toHaveBeenCalled();
        expect(mockLog.mock.calls[0][0]).toContain('Usage: hoth start');
        expect(mockExit).toHaveBeenCalled();
        expect(mockExit.mock.calls[0].length).toBe(0);
        mockLog.mockRestore();
        mockExit.mockRestore();
    });

    it('simple start', async () => {
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        const mockSend = jest.spyOn(process, 'send');
        process.env.ROOT_PATH = join(__dirname, 'testapp');

        const fastifyInstance = await start([]);

        // 支持ipv4 和 ipv6，会打印ip是 127.0.0.1 或 ::1
        // 故仅判断http
        expect(mockLog).toHaveBeenCalledWith('Server listening on http://127.0.0.1:8250.');
        expect(mockExit).not.toHaveBeenCalled();
        expect(mockSend).toHaveBeenCalledWith('ready');
        expect(mockSend).toHaveBeenCalledTimes(2);
        mockExit.mockRestore();
        mockLog.mockRestore();
        mockSend.mockRestore();
        expect(fastifyInstance).toBeTruthy();
        if (fastifyInstance) {
            await fastifyInstance.close();
        }
    });

    it('no app', async () => {
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        process.env.ROOT_PATH = join(__dirname, 'noapp');

        const fastifyInstance = await start([]);

        expect(mockLog).toHaveBeenCalledWith('Warn: app root "app" not exists!');
        expect(mockExit).toHaveBeenCalledWith(1);
        expect(fastifyInstance).toBeFalsy();
        mockExit.mockRestore();
        mockLog.mockRestore();
    });

    it('healthcheck path', async () => {
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        process.env.ROOT_PATH = join(__dirname, 'testapp');

        const fastifyInstance = await start(['--healthcheck-path="/healthcheck"', '--port=8252']);

        const logs = mockLog.mock.calls.map(call => call[1]).join('\n');
        expect(logs).toContain('/healthcheck (HEAD)');
        expect(logs).toContain('/healthcheck (GET)');
        expect(mockExit).not.toHaveBeenCalled();
        mockExit.mockRestore();
        mockLog.mockRestore();
        expect(fastifyInstance).toBeTruthy();
        if (fastifyInstance) {
            const res = await fastifyInstance.inject({
                method: 'GET',
                path: '/healthcheck',
            });

            expect(res.body).toBe('ok');
            await fastifyInstance.close();
        }
    });

    it('warmup', async () => {
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        process.env.ROOT_PATH = join(__dirname, 'testapp2');

        const fastifyInstance = await start(['--port=8253']);

        expect(mockLog).toHaveBeenCalledWith('warmup ok');
        expect(mockExit).not.toHaveBeenCalled();
        mockExit.mockRestore();
        mockLog.mockRestore();
        expect(fastifyInstance).toBeTruthy();
        if (fastifyInstance) {
            await fastifyInstance.close();
        }
    });

    it('main.js', async () => {
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        process.env.ROOT_PATH = join(__dirname, 'testapp2');

        const fastifyInstance = await start(['--port=8254']);

        expect(mockLog).toHaveBeenCalledWith('main init');
        expect(mockExit).not.toHaveBeenCalled();
        mockExit.mockRestore();
        mockLog.mockRestore();
        expect(fastifyInstance).toBeTruthy();
        if (fastifyInstance) {
            await fastifyInstance.close();
        }
    });

    describe('close with grace', function () {

        it('SIGTERM', async () => {
            const mockExit = mockProcessExit();
            const mockLog = mockConsoleLog();
            process.env.ROOT_PATH = join(__dirname, 'testapp');

            const fastifyInstance = await start(['--port=8251', '--address=0.0.0.0']);

            if (!fastifyInstance) {
                return;
            }

            const mockClose = jest.spyOn(fastifyInstance, 'close');

            await triggerExit('SIGTERM', null, false);
            expect(mockClose).toHaveBeenCalled();
            expect(mockExit).toHaveBeenCalled();

            mockExit.mockRestore();
            mockLog.mockRestore();
            mockClose.mockRestore();
            await fastifyInstance.close();
        });

        it('uncaughtException', async () => {
            const mockExit = mockProcessExit();
            const mockLog = mockConsoleLog();
            process.env.ROOT_PATH = join(__dirname, 'testapp');

            const fastifyInstance = await start(['--port=8251']);

            if (!fastifyInstance) {
                return;
            }

            const mockClose = jest.spyOn(fastifyInstance, 'close');

            await triggerExit('uncaughtException', new TypeError('some error'), false);
            expect(mockClose).toHaveBeenCalled();
            expect(mockExit).toHaveBeenCalled();

            mockExit.mockRestore();
            mockLog.mockRestore();
            mockClose.mockRestore();
            await fastifyInstance.close();
        });

    });
});
