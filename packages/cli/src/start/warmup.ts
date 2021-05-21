import {fastifyWarmup} from 'fastify-warmup';
import {join} from 'path';
import type {AppConfig} from '@hoth/app-autoload';
import type {FastifyInstance} from 'fastify';

export async function warmup(apps: AppConfig[], fastifyInstance: FastifyInstance) {
    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];
        if (app.warmupConfig) {

            if (!app.warmupConfig.basePath) {
                app.warmupConfig.basePath = join(app.dir, 'warmup-data');
            }

            // add prefix to all the route
            if (app.prefix) {
                const routes = Object.keys(app.warmupConfig.warmupData);
                const newWarmupData: Record<string, string | string[]> = {};
                routes.forEach(route => {
                    newWarmupData[app.prefix + route] = (app.warmupConfig.warmupData as Record<string, string | string[]>)[route];
                });
                app.warmupConfig.warmupData = newWarmupData;
            }

            await fastifyWarmup(fastifyInstance, app.warmupConfig);
        }
    }
}