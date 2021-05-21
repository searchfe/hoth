import type Piscina from 'piscina';

type PiscinaOptions = ConstructorParameters<typeof Piscina>['0'];

export interface PluginOptions {
    logConfig: {
        appName: string;
    };
    warmupConfig?: {
        warmupData: string[];
        maxConcurrent: number;
        basePath: string;
    };
    threadsNumber: number;

    filename: PiscinaOptions['filename'];
    concurrentTasksPerWorker?: PiscinaOptions['concurrentTasksPerWorker'];
    argv?: PiscinaOptions['argv'];
    execArgv?: PiscinaOptions['execArgv'];
    env?: PiscinaOptions['env'];
    workerData?: PiscinaOptions['workerData'];
    taskQueue?: PiscinaOptions['taskQueue'];
    niceIncrement?: PiscinaOptions['niceIncrement'];
    trackUnmanagedFds?: PiscinaOptions['trackUnmanagedFds'];
}

export type HothThreadConf = Exclude<PluginOptions, 'logConfig'>;

export interface InitWorkerData {
    userData: any;
    warmupConfig: PluginOptions['warmupConfig'];
    logConfig: PluginOptions['logConfig'];
}
