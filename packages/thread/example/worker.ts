import worker from '@hoth/thread/worker';

const workerOptions = {
    warmup: {
        warmupData: [
            'a.json',
            'b'
        ],
        maxConcurrent: 3,
        basePath: '/home/work/myapp/warmupData'
    }
};

export default worker(function (a) {
    // do some render
    return a + 'b';
}, workerOptions);