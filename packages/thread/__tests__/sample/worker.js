const {workerWrapper} = require('../../index')

module.exports = workerWrapper(async function (hoth, a) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
    });
    return a + 'b';
});