import {join} from 'path';
import {start} from '../src/start';
import {mockProcessExit, mockConsoleLog} from 'jest-mock-process';

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

    it('simple', async () => {
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        process.env.ROOT_PATH = join(__dirname, 'testapp');

        const fastifyInstance = await start([]);

        expect(mockLog).toHaveBeenCalledWith('Server listening on http://127.0.0.1:8250.');
        expect(mockLog).toHaveBeenCalledWith('└── /\n');
        expect(mockExit).not.toHaveBeenCalled();
        mockExit.mockRestore();
        mockLog.mockRestore();
        expect(fastifyInstance).toBeTruthy();
        if (fastifyInstance) {
            await fastifyInstance.close();
        }
    });
});
