#!/usr/bin/env node

/**
 * @file commander
 * @author cxtom
 */

import path from 'path';
import commist from 'commist';
import helpMe from 'help-me';
import readJson from 'read-package-json';
import updateNotifier from 'update-notifier';

import {cli as startCli} from './start';
import {cli as generate} from './generate';

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

readJson(path.resolve(__dirname, '../package.json'), (error: Error, pkg: Record<string, unknown>) => {
    const notifier = updateNotifier({
        pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24 * 3,
        shouldNotifyInNpmScript: true
    });
    notifier.notify({
        defer: false
    });
});

const res = commander.parse(process.argv.splice(2));

if (res) {
    help.toStdout(res);
}
