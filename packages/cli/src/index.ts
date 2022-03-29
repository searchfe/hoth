#!/usr/bin/env node

/* istanbul ignore file */

/**
 * @file commander
 * @author cxtom
 */

import path from 'path';
import commist from 'commist';
import helpMe from 'help-me';
import updateNotifier from 'update-notifier';

import {cli as startCli} from './start';
import {cli as generate} from './generate';
import {fs} from '@hoth/utils';

const commander = commist();
const help = helpMe({
    dir: path.join(__dirname, '../help'),
});

commander.register('help', help.toStdout);
commander.register('version', function () {
    console.log(require('../package.json').version); // eslint-disable-line
});
commander.register('start', startCli);
commander.register('generate', generate);

const pkg: Record<string, unknown> = fs.readJsonSync(path.resolve(__dirname, '../package.json'));
const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3,
    shouldNotifyInNpmScript: true
});
notifier.notify({
    defer: false
});

const res = commander.parse(process.argv.splice(2));
if (res) {
    help.toStdout(res);
}
