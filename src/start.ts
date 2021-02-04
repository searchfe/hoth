/**
 * @file start server
 * @author cxtom
 */

import parseArgs from './parseArgs';

async function start(args) {
    const opts = parseArgs(args);
    opts.port = opts.port || process.env.PORT || 3000;

    require('make-promises-safe');
}

export function cli(args) {
    start(args);
}

if (require.main === module) {
    cli(process.argv.slice(2));
}
