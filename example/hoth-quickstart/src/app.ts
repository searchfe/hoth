import type {FastifyInstance} from 'fastify';
import type {AppConfig} from '@hoth/app-autoload';

export default async function main(fastify: FastifyInstance, opts: AppConfig) {
    console.log('app entry plugin options', opts);
    return;
}
