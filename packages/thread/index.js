/* eslint-disable @typescript-eslint/no-var-requires */

const {isMainThread} = require('worker_threads');

if (isMainThread) {
    module.exports = require('./dist/main');
}
else {
    module.exports = require('./dist/worker');
}
