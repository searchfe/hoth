import {showHelpForCommand, getHome} from '../src/util';
import {mockProcessExit, mockConsoleLog} from 'jest-mock-process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import {removeSync} from 'fs-extra';

describe('hoth cli util', () => {

    it('show help command', async () => {
        const mockLog = mockConsoleLog();
        const mockExit = mockProcessExit();

        showHelpForCommand('start');

        expect(mockLog).toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledWith();
        mockLog.mockRestore();
        mockExit.mockRestore();
    });

    it('show help error', async () => {
        const mockLog = mockConsoleLog();
        const mockExit = mockProcessExit();

        showHelpForCommand('foo');

        expect(mockLog).toHaveBeenCalledWith('Warn: unable to get help for command "foo"');
        expect(mockExit).toHaveBeenCalledWith(1);
        mockLog.mockRestore();
        mockExit.mockRestore();
    });

    it('get home path', async () => {
        removeSync(path.join(os.homedir(), '.hoth'));
        expect(fs.existsSync(getHome())).toBe(true);
    });
});
