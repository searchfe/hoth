import path, {join} from 'path';
import inquirer from 'inquirer';
import {mockProcessExit, mockConsoleLog} from 'jest-mock-process';
import {cli} from '../src/generate';
import {getHome} from '../src/util';
import {mkdirSync, writeFileSync, promises as fsPromises} from 'fs';
import {copySync} from 'fs-extra';
import {fs as utilsFs} from '@hoth/utils';

/* eslint-disable @typescript-eslint/no-var-requires */

const workdir = path.join(__dirname, 'workdir');

describe('hoth cli generate', () => {

    jest.mock('inquirer');

    beforeEach(() => {
        utilsFs.rmSync(workdir, {recursive: true, force: true});
    });

    it('errors if directory exists', async () => {
        await fsPromises.mkdir(workdir, {recursive: true});
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        await cli([workdir]);

        expect(mockExit).toHaveBeenCalledWith(1);
        expect(mockLog).toHaveBeenCalledWith(`Warn: directory ${workdir} already exists`);

        mockExit.mockRestore();
        mockLog.mockRestore();
    });

    it('errors if generate doesn\'t have <folder> arguments', async () => {
        const mockExit = mockProcessExit();
        const mockLog = mockConsoleLog();
        await cli([]);
        expect(mockExit).toHaveBeenCalledWith(1);
        expect(mockLog).toHaveBeenCalledWith('Warn: must specify a directory to \'hoth generate\'');

        mockExit.mockRestore();
        mockLog.mockRestore();
    });

    it('generate normal template', async () => {
        // @ts-ignore
        inquirer.prompt = jest.fn().mockResolvedValue({
            appName: 'myapp',
            appType: 'Normal'
        });
        const mockLog = mockConsoleLog();
        await cli([workdir]);

        expect(mockLog).toHaveBeenCalledWith('generated package.json');
        const pkg = await utilsFs.readJson(`${workdir}/package.json`);
        expect(pkg.name).toBe('@baidu/myapp-node-ui');
        expect(pkg.private).toBe(true);

        mockLog.mockRestore();
    });

    it('generate normal template', async () => {
        // @ts-ignore
        inquirer.prompt = jest.fn().mockResolvedValue({
            appName: 'myapp',
            appType: 'Normal'
        });
        const mockLog = mockConsoleLog();
        await cli([workdir]);

        expect(mockLog).toHaveBeenCalledWith('generated package.json');
        const pkg = await utilsFs.readJson(`${workdir}/package.json`);
        expect(pkg.name).toBe('@baidu/myapp-node-ui');
        expect(pkg.private).toBe(true);
        // expect(pkg.dependencies['@hoth/cli']).toBe(`^${require('../package.json').version}`);

        mockLog.mockRestore();
    });

    it('default app name', async () => {
        // @ts-ignore
        inquirer.prompt = jest.fn().mockImplementation(list => {
            const app = list[0];
            return {
                appName: app.default(),
                appType: 'Normal'
            };
        });
        const mockLog = mockConsoleLog();
        await cli(['--app-name=myapp', workdir]);
        const pkg = await utilsFs.readJson(`${workdir}/package.json`);
        expect(pkg.name).toBe('@baidu/myapp-node-ui');
        mockLog.mockRestore();
    });

    it('validate app name', async () => {
        // @ts-ignore
        inquirer.prompt = jest.fn().mockImplementation(list => {
            expect(list[0].validate('my-app')).toBe(true);
            expect(list[0].validate('my*app')).toBe('Please enter a valid product name.');
            return {
                appName: 'myapp',
                appType: 'Normal'
            };
        });
        const mockLog = mockConsoleLog();
        await cli(['--app-name=myapp', workdir]);
        mockLog.mockRestore();
    });

    it('generate template from external repo', async () => {
        // @ts-ignore
        inquirer.prompt = jest.fn().mockResolvedValue({
            appName: 'myapp',
            appType: 'Normal'
        });

        const mockLog = mockConsoleLog();

        // 构建一个现场
        const home = getHome();
        const repoDir = join(home, 'repo', 'hoth-template');

        await utilsFs.rm(repoDir, {recursive: true, force: true});
        mkdirSync(repoDir, {recursive: true});
        copySync(join(__dirname, '..', 'hoth-template'), repoDir);
        const jsonfile = join(repoDir, 'templates', 'normal', 'package.json');
        const json = await utilsFs.readJson(jsonfile);
        json.description = 'test';
        writeFileSync(jsonfile, JSON.stringify(json));


        await cli([workdir, '--sub-app', '--repo', 'https://github.com/searchfe/hoth-template']);

        const pkg = await utilsFs.readJson(`${workdir}/package.json`);
        expect(pkg.name).toBe('@baidu/myapp-node-ui');
        expect(pkg.private).toBe(true);
        expect(pkg.description).toBe('test');

        await utilsFs.rm(repoDir, {recursive: true, force: true});

        mockLog.mockRestore();
    });

    it('generate sub-app template', async () => {
        // @ts-ignore
        inquirer.prompt = jest.fn().mockResolvedValue({
            appName: 'myapp',
            appType: 'Normal'
        });

        const mockLog = mockConsoleLog();

        await cli([workdir, '--sub-app']);

        const pkg = await utilsFs.readJson(`${workdir}/package.json`);
        expect(pkg.name).toBe('@baidu/myapp-node-ui');
        expect(pkg.private).toBe(true);
        // expect(pkg.devDependencies['@hoth/cli']).toBe(`^${require('../package.json').version}`);

        mockLog.mockRestore();
    });

});
