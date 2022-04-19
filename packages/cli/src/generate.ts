import {exit, fs as utilsFs} from '@hoth/utils';
import {existsSync, readdirSync, writeFileSync, mkdirSync} from 'fs';
import {join} from 'path';
import generify from 'generify';
import chalk from 'chalk';
import inquirer from 'inquirer';

import parseArgs from './parseArgs';
import {execSync} from 'child_process';
import {getHome, showHelpForCommand} from './util';


function createInfo(name: string, repoTemplatesDir: string, opts: ReturnType<typeof parseArgs>) {
    const conf = require(join(repoTemplatesDir, name, 'package.json'))['hoth-cli'] || {}; // eslint-disable-line
    const baseTemplate = conf.base_template || '';
    return {
        dir: join(repoTemplatesDir, name),
        name,
        desc: conf.desc || name,
        baseTemplate: opts.subApp ? '' : baseTemplate,
        baseTemplateDir: join(repoTemplatesDir, '..', 'base_templates', baseTemplate),
        logInstructions(dir: string) {
            console.log('debug', 'saved package.json');
            console.log('info', 'project generated successfully');
            console.log('----');
            console.log(`run 'cd ${dir}'`);
            console.log(`run '${chalk.bold('npm install')}' to install the dependencies`);
            console.log(`run '${chalk.bold('npm run build')}' to compile the application`);
            console.log(`run '${chalk.bold('npm run dev')}' to start the application`);
            // console.log(`run '${chalk.bold('npm test')}' to execute the unit tests`);
        },
    };
}

function generate(dir: string, templateInfo: ReturnType<typeof createInfo>, data: Record<string, any>) {
    return new Promise(resolve => {
        generify(templateInfo.dir, dir, data, function (file: string) {
            console.log(`generated ${file}`);
        }, function (err: Error) {
            /* istanbul ignore if */
            if (err) {
                return exit(err.message);
            }

            if (!templateInfo.baseTemplate) {
                return resolve(1);
            }

            generify(templateInfo.baseTemplateDir, dir, data, function (file: string) {
                console.log(`generated ${file}`);
            }, function (err: Error) {
                /* istanbul ignore if */
                if (err) {
                    return exit(err.message);
                }
                resolve(1);
            });
        });
    }).then(() => {
        templateInfo.logInstructions(dir);
    });
}


export async function cli(args: string[]) {
    const opts = parseArgs(args);
    const dir = opts._[0];

    if (opts.help) {
        return showHelpForCommand('generate');
    }

    if (dir && existsSync(dir)) {
        /* istanbul ignore else */
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

    // built-in templates
    let repoTemplatesDir = join(__dirname, '..', 'hoth-template', 'templates');

    // git third-party templates
    if (opts.repo) {
        const repo = opts.repo.startsWith('ssh:') || opts.repo.startsWith('http:') || opts.repo.startsWith('https:')
            ? opts.repo : `https://github.com/${opts.repo}.git`;

        const subDir = repo.split('/').pop()?.split('.git')[0];
        const repoDir = join(getHome(), 'repo');
        repoTemplatesDir = join(repoDir, subDir || '', 'templates');
        mkdirSync(repoDir, {recursive: true});
        if (existsSync(repoTemplatesDir)) {
            try {
                console.log('start to git pull templates:', repo, repoTemplatesDir);
                const branch = execSync('git branch | sed "s%*%%"|head -1 ', {
                    cwd: repoTemplatesDir
                });
                execSync(`git pull origin ${branch}`, {
                    cwd: repoTemplatesDir
                });
            }
            catch (e) {
                console.warn('failed to git pull latest templates. Maybe use to use old templates');
            }
        }
        /* istanbul ignore else */
        else {
            /* istanbul ignore next */
            try {
                console.log('start to git clone templates:', repo);
                execSync(`git clone ${repo} ${subDir}`, {
                    cwd: repoDir
                });
            }
            catch (e) {
                console.error('fail to clone template repo. please make sure installed git and connected internet ');
                console.error(e);
            }
        }
    }

    const templateInfos = readdirSync(repoTemplatesDir).map(name => {
        return createInfo(name, repoTemplatesDir, opts);
    });
    /* istanbul ignore if */
    if (!templateInfos.length) {
        exit('The repo does not find any tempalte.');
        return;
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
        choices: templateInfos.map(a => a.desc),
        default() {
            return templateInfos[0].desc;
        }
    }];

    const {
        appType,
        appName
    } = await inquirer.prompt(inputs);

    const data = {
        appName,
        cliVersion: require(join(__dirname, '../package.json')).version, // eslint-disable-line @typescript-eslint/no-var-requires, max-len
    };

    const selectedTempate  = templateInfos.find(a => a.desc === appType);
    /* istanbul ignore if */
    if (!selectedTempate) {
        exit(`The template [${appType}] does not exist.`);
        return;
    }

    await generate(dir, selectedTempate, data);

    // 做一个小优化，子app不需要在正式依赖里安装@hoth/cli和fastify
    if (opts.subApp) {
        const json = await utilsFs.readJson(join(dir, 'package.json'));
        for (const k of ['@hoth/cli', 'fastify', 'teth-sdk']) {
            if (json.dependencies[k]) {
                json.devDependencies[k] = json.dependencies[k];
                delete json.dependencies[k];
            }
        }
        writeFileSync(join(dir, 'package.json'), JSON.stringify(json, null, 4));
    }
}
