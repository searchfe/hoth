import {showHelpForCommand} from '../src/util';
import {mockProcessExit, mockConsoleLog} from 'jest-mock-process';

describe('hoth cli util', () => {

    it('show help error', async () => {
        const mockLog = mockConsoleLog();
        const mockExit = mockProcessExit();

        showHelpForCommand('foo');

        expect(mockLog).toHaveBeenCalledWith('Warn: unable to get help for command "foo"');
        expect(mockExit).toHaveBeenCalledWith(1);
        mockLog.mockRestore();
        mockExit.mockRestore();
    });
});
