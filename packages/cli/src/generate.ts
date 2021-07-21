import {exit} from '@hoth/utils';
import {existsSync} from 'fs';
import {join} from 'path';
import generify from 'generify';
import chalk from 'chalk';
import inquirer from 'inquirer';

import parseArgs from './parseArgs';

function getTemplate(type: string) {
    return {
        dir: type,
        logInstructions() {
            console.log('debug', 'saved package.json');
            console.log('info', 'project generated successfully');
            console.log('debug', `run '${chalk.bold('npm install')}' to install the dependencies`);
            console.log('debug', `run '${chalk.bold('npm build')}' to compile the application`);
            console.log('debug', `run '${chalk.bold('npm run dev')}' to start the application`);
            console.log('debug', `run '${chalk.bold('npm test')}' to execute the unit tests`);
        },
    };
}

function generate(dir: string, template: ReturnType<typeof getTemplate>, data: Record<string, any>) {
    return new Promise(resolve => {
        generify(join(__dirname, '../templates', template.dir), dir, data, function (file: string) {
            console.log(`generated ${file}`);
        }, function (err: Error) {
            /* istanbul ignore next */
            if (err) {
                return exit(err.message);
            }
            template.logInstructions();
            resolve(1);
        });
    });
}


export async function cli(args: string[]) {
    const opts = parseArgs(args);
    const dir = opts._[0];

    if (dir && existsSync(dir)) {
        if (dir !== '.' && dir !== './') {
            return exit(`directory ${opts._[0]} already exists`);
        }
    }

    if (dir === undefined) {
        return exit('must specify a directory to \'hoth generate\'');
    }

    /* istanbul ignore next */
    if (existsSync(join(dir, 'package.json'))) {
        return exit('a package.json file already exists in target directory');
    }

    const inputs = [{
        type: 'input',
        name: 'appName',
        message: 'What\'s your product name?',
        default() {
            return opts.appName;
        },
        // @ts-ignore
        validate(value) {
            const pass = value.match(/^[a-z\-]+$/i);
            if (pass) {
                return true;
            }
            return 'Please enter a valid product name.';
        },
    }, {
        type: 'list',
        name: 'appType',
        message: 'Select a project type that you want to create.',
        choices: [
            'Normal',
            'Molecule',
            'Vue SSR APP'
        ],
        filter(val: string) {
            return val.toLowerCase().replace(/\s/g, '-');
        },
    }];

    const {
        appType,
        appName
    } = await inquirer.prompt(inputs);

    const data = {
        appName,
        cliVersion: require(join(__dirname, '../package.json')).version, // eslint-disable-line @typescript-eslint/no-var-requires, max-len
    };

    let template = getTemplate(appType);
    return generate(dir, template, data);
}
