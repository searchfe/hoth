import {fastifyWarmup} from 'fastify-warmup';
import {join} from 'path';
import type {getApps} from '@hoth/app-autoload';
import type {FastifyInstance} from 'fastify';

type UnPackReturnType<T> = T extends (...args: any[]) => Promise<infer U> ? U : T;

export async function warmup(apps: UnPackReturnType<typeof getApps>, fastifyInstance: FastifyInstance) {
    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];
        if (app.warmupConfig) {

            if (!app.warmupConfig.basePath) {
                app.warmupConfig.basePath = join(app.dir, 'warmup-data');
            }

            // add prefix to all the route
            if (app.prefix) {
                const routes = Object.keys(app.warmupConfig.warmupData);
                const newWarmupData = {};
                routes.forEach(route => {
                    newWarmupData[app.prefix + route] = app.warmupConfig.warmupData[route];
                });
                app.warmupConfig.warmupData = newWarmupData;
            }
            await fastifyWarmup(fastifyInstance, app.warmupConfig);
        }
    }
}