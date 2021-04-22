/**
 * 这个文件会在子线程中加载，不要引入非必要模块。
 */
import path from 'path';
import hothThread from './index';

function warmup() {
    const warmupConfig = hothThread.workerData.warmupConfig;
    hothThread.workerData = hothThread.workerData.userData;

    
}

export default async function workerWrapper(fn: Function) {
    await warmup();

    return fn;
}