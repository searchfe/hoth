#!/usr/bin/env node

/**
 * @file commander
 * @author cxtom
 */

import path from 'path';
import commist from 'commist';
import helpMe from 'help-me';
import {cli as startCli} from './start';

const commander = commist();
const help = helpMe({
    dir: path.join(__dirname, '../help'),
});

commander.register('help', help.toStdout);
commander.register('version', function () {
    console.log(require('../package.json').version); // eslint-disable-line
});
commander.register('start', startCli);

const res = commander.parse(process.argv.splice(2));

if (res) {
    help.toStdout(res);
}
