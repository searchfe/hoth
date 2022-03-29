import path from 'path';
import fs from 'fs';
import os from 'os';
import {exit} from '@hoth/utils';

export function showHelpForCommand(commandName: string) {
    const helpFilePath = path.join(__dirname, '../help', `${commandName}.txt`);

    try {
        console.log(fs.readFileSync(helpFilePath, 'utf8'));
        exit();
    }
    catch (e) {
        /* istanbul ignore next */
        exit(`unable to get help for command "${commandName}"`);
    }
}


/**
 * 获取sdk的工作路径
 *
 * @return {string} sdk的工作路径
 */
export function getHome() {
    const dir = path.join(os.homedir(), '.hoth');

    // 如果这个目录不存在，则创建这个目录
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    return dir;
};
