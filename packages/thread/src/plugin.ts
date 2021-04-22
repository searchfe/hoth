import fp from 'fastify-plugin';
import Piscina from 'piscina';
import type {FastifyInstance} from 'fastify';
import type {PluginOptions} from '../types';
import {SHARE_ENV} from 'worker_threads';

async function threadPlugin(fastify: FastifyInstance, options: PluginOptions) {
    // 如果自定义了 env，需要设置 ROOT_PATH
    if (options.env && (options.env !== process.env && options.env !== SHARE_ENV)) {
        if (typeof options.env !== 'object') {
            throw Error('options.env should be an object.');
        }

        options.env.ROOT_PATH = process.env.ROOT_PATH;
    }

    // 吧 workerData 包一层，传给子线程
    const workerData = {
        warmupConfig: options.warmupConfig,
        userData: options.workerData
    };

    // 显式传递，剔除不必要的参数
    const pool = new Piscina({
        minThreads: options.threadsNumber,
        maxThreads: options.threadsNumber,

        filename: options.filename,
        concurrentTasksPerWorker: options.concurrentTasksPerWorker,
        argv: options.argv,
        execArgv: options.execArgv,
        env: options.env,
        workerData: workerData,
        taskQueue: options.taskQueue,
        niceIncrement: options.niceIncrement,
        trackUnmanagedFds: options.trackUnmanagedFds
    });

    const warmupTask = [];
    let threadsCount = options.threadsNumber;
    while (threadsCount--) {
        warmupTask.push(pool.runTask({__isWarmup: true}));
    }
    await Promise.all(warmupTask);

    fastify.decorate('piscina', pool);
    fastify.decorate('runTask', pool.runTask);
}

export default fp(threadPlugin, {
    fastify: '>=1.0.0',
    name: '@hoth/thread'
});
