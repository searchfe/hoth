/**
 * 这个文件会在子线程中加载，不要引入非必要模块。
 */
import hothThread from './data';
import Piscina from 'piscina';
import createLogger from '@hoth/logger';
import {fastifyWarmup} from 'fastify-warmup';
import type {PluginOptions} from '../../types/index';

const {
    warmupConfig,
    logConfig,
} = getWorkerDataAndInitHothThread();
const logger = createLogger({
    apps: [{name: logConfig.appName}],
    rootPath: process.env.ROOT_PATH
});
const hothUtils = {
    logger
};

/**
 * 使用 fastify-warmup 进行预热
 */
async function warmup(fn) {
    const fakeFastifyApp = {
        log: logger,
        async inject(data) {
            await fn(hothUtils, data);
        }
    };

    await fastifyWarmup(fakeFastifyApp, warmupConfig);

    return;
}

/**
 * 初始化 worker 需要的参数是通过 workerData 来传入的
 * 需要将参数取出，将 userData 赋值给 workerData，供子线程中的逻辑使用。
 */
function getWorkerDataAndInitHothThread() {
    const warmupConfig = Piscina.workerData.warmupConfig as PluginOptions['warmupConfig'];
    const logConfig = Piscina.workerData.logConfig as PluginOptions['logConfig'];

    // 初始化 hothThread.workerData
    // 规定子线程中只能通过 hothThread 来获取 workerData
    hothThread.workerData = Piscina.workerData.userData;

    return {
        warmupConfig,
        logConfig
    };
}

export = async function workerWrapper(fn: (hoth: typeof hothUtils, data: any) => any) {
    warmupConfig && await warmup(fn);

    return (data: any) => {
        if (data.__isWarmup) {
            return 'done';
        }
        return fn(hothUtils, data);
    };
};
