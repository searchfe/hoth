const {workerWrapper} = require('../index');

module.exports = workerWrapper(async function (hoth, a) {
    // console.log(hoth.logger);
    hoth.logger.info('meixg');
    console.log('worker input: ' + JSON.stringify(a));
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
    });
    // do some render
    return a + 'b';
});