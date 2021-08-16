/**
 * 加载 molecule app
 */
import {FastifyInstance, FastifyRequest} from 'fastify';
import {join} from 'path';
import {loadModule} from '@hoth/utils';

interface AppConfig {
    dir: string;
    prefix: string;
    name: string;
    rootPath: string;
}

interface MoleculeController {
    ctrlPath: string;
    name: string;
    httpType: 'get' | 'post' | 'patch' | 'delete';
    json?: boolean;
}

interface MoleculeConfig {
    controllers: MoleculeController[];
}


export async function loadMoleculeApp(appConfig: AppConfig, instance: FastifyInstance) {
    const moleculeConfPath = join(appConfig.dir, 'config/molecule.json');
    const {controllers} =  await loadModule(moleculeConfPath) as MoleculeConfig;

    controllers.forEach(item => {
        let httpType = item.httpType;
        let ctrlName = item.name;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        instance[httpType](`/${ctrlName}`, async (request: FastifyRequest, reply) => {
            let data = {} as any;

            if (httpType === 'post') {
                data = request.body || request.query || {};
            }
            else if (httpType === 'get') {
                data = request.query;
            }
            // 本地 mock 数据
            if (process.env.DATA_MOCK) {
                data = await loadModule(join(appConfig.dir, `mock/${ctrlName}.json`));
            }

            // @ts-ignore
            let ret = await instance.molecule(item.ctrlPath, data, {
                root: appConfig.dir,
                appName: appConfig.name,
                name: ctrlName,
                logger: instance.log,
            });
            if (item.json) {
                return ret ? {
                    statusCode: 200,
                    data: ret,
                } : {
                    statusCode: 500,
                    message: 'render error',
                };
            }
            return ret;
        });
    });
}