import path from 'path';
import fs from 'fs';
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
