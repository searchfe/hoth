import path from 'path';
import fs, { readFileSync, writeFileSync } from 'fs';
import os from 'os';
import {exit} from '@hoth/utils';

export function showHelpForCommand(commandName: string) {
    const helpFilePath = path.join(__dirname, '../help', `${commandName}.txt`);

    try {
        console.log(fs.readFileSync(helpFilePath, 'utf8'));
        exit();
    }
    catch (e) {
        exit(`unable to get help for command "${commandName}"`);
    }
}


/**
 * 获取sdk的工作路径
 *
 * @return {string} sdk的工作路径
 */
export function getHome() {
    const dir = process.env[
        os.platform() === 'win32'
            ? 'APPDATA'
            : 'HOME'
        ] + require('path').sep + '.hoth';

    // 如果这个目录不存在，则创建这个目录
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    return dir;
};


export function readJson(file: string) {
    return JSON.parse(readFileSync(file, 'utf8'));
}


export function writeJson(file: string, json: any) {
    writeFileSync(file, JSON.stringify(json, null, 4));
}
