/**
 * @file default plugin
 * @author
 */

export default function (fastify, opts, next) {
    console.log('foo plugin options', opts);
    next();
}

export const autoConfig = {
    foo: 'bar',
};
