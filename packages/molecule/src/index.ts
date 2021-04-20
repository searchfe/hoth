import fp from 'fastify-plugin';
import {molecule} from './molecule';

async function moleculePlugin(fastify: any, options: any, done: any) {
    fastify.decorate('molecule', molecule);
    done();
};

export default fp(moleculePlugin);
export {molecule};
