import {exit} from '@hoth/utils';
import {existsSync} from 'fs';
import {join} from 'path';
import generify from 'generify';
import chalk from 'chalk';
import inquirer from 'inquirer';

import parseArgs from './parseArgs';

function getTemplate(type?: string) {
    return {
        dir: `${type}-app`,
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

function generate(dir, template, data) {
    return new Promise((resolve, reject) => {
        generify(join(__dirname, '../templates', template.dir), dir, data, function (file) {
            console.log(`generated ${file}`);
        }, function (err) {
            if (err) {
                return reject(err);
            }
            template.logInstructions();
            resolve(1);
        });
    });
}


export async function cli(args) {
    const opts = parseArgs(args);
    const dir = opts._[0];

    if (!opts.appName) {
        exit('--app-name option is required');
    }

    if (dir && existsSync(dir)) {
        if (dir !== '.' && dir !== './') {
            exit(`directory ${opts._[0]} already exists`);
        }
    }

    if (dir === undefined) {
        exit('must specify a directory to \'fastify generate\'');
    }

    if (existsSync(join(dir, 'package.json'))) {
        exit('a package.json file already exists in target directory');
    }

    const {appType} = await inquirer.prompt([{
        type: 'list',
        name: 'appType',
        message: 'Select a project type that you want to create.',
        choices: [
            'Normal',
            'Molecule',
        ],
        filter(val) {
            return val.toLowerCase();
        },
    }]);

    console.log(appType);

    let template = getTemplate(appType);
    generate(dir, template, opts).catch(function (err) {
        if (err) {
            console.error(err.message);
            process.exit(1);
        }
    });
}
