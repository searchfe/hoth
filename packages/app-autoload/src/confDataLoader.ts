/**
 * conf 自动加载
 */
import {join} from 'path';
import {FastifyInstance} from 'fastify';
import {resourceManager} from '@hoth/bdconf';
import fs from 'fs';
import pmx from '@pm2/io';

interface AppConfig {
    name: string;
    rootPath: string;
}

// 入口配置文件
const CONF_ENTRY = 'data.conf';

export async function loadConfData(appConfig: AppConfig, instance: FastifyInstance) {
    const appName = appConfig.name;
    let confDir = join(appConfig.rootPath, `conf/${appName}`);

    if (!fs.existsSync(confDir)) {
        return;
    }
    let manager = resourceManager(confDir, instance.log);
    await manager.registerResourceFromConfig(CONF_ENTRY);

    const dataFetchProxy = {
        get(dataname: string) {
            return manager.fetch(dataname);
        },
    };
    instance.decorate('$appConfData', dataFetchProxy);

    /**
     * param为需要reload的conf名称，多个conf以逗号分割，如 dict1,dict2
     */
    pmx.action(`reload_${appName}`, async (param: string, reply) => {
        let nameList: string[] = [];
        if (param && typeof param === 'string') {
            nameList = param.split(',');
        }
        await manager.reload(nameList);

        reply({success: appName});
    });
    return manager;
}
