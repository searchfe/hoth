import type Piscina from 'piscina';

type PiscinaOptions = ConstructorParameters<typeof Piscina>['0'];

export interface PluginOptions {
    threadsNumber: number;
    warmupConfig?: {
        warmupData: string[];
        maxConcurrent: number;
        basePath: string;
    };
    
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
