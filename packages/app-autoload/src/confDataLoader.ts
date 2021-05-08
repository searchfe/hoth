/**
 * conf 自动加载
 */
import {join} from 'path';
import {FastifyInstance} from 'fastify';
import {resourceManager} from '@hoth/bdconf';
import * as fs from 'fs';

interface AppConfig {
    name: string;
    rootPath: string;
}

// 入口配置文件
const CONF_ENTRY = 'data.conf';

export function loadConfData(appConfig: AppConfig, instance: FastifyInstance) {
    let confDir = join(appConfig.rootPath, `conf/${appConfig.name}`);

    if (!fs.existsSync(confDir)) {
        return;
    }
    let manager = resourceManager(confDir, instance.log);
    manager.registerResourceFromConfig(CONF_ENTRY);

    let data = manager.fetchAll();
    instance.decorate('$appConfData', data);

    process.on('SIGUSR2', function () {
        manager.reload();
        let data = manager.fetchAll();
        instance.decorate('$appConfData', data);
    });
}
