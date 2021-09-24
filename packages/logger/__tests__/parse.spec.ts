import {parse} from '../src/index';

describe('@hoth/logger parser', function () {

    it('parse normal log', function () {
        // eslint-disable-next-line max-len
        let message = 'NOTICE: 2021-08-09 13:28:35 [-:-] errno[-] status[200] logId[2e45e4f4-56e8-4496-abf2-9731c083f0ee] pid[14871] uri[/app/other] cluster[-] idc[-] product[quickstart] module[test] clientIp[127.0.0.1] ua[Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36] refer[-] cookie[-] parseTime[0.2] validationTime[0.6] tm[-] responseTime[1.2]';
        const log = parse(message);
        expect(log).toEqual({
            level: 'notice',
            msg: '',
            app: 'hoth',
            status: 200,
            logId: '2e45e4f4-56e8-4496-abf2-9731c083f0ee',
            pid: 14871,
            uri: '/app/other',
            product: 'quickstart',
            responseTime: 1.2,
            module: 'test',
            clientIp: '127.0.0.1',
            // eslint-disable-next-line max-len
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
            parseTime: 0.2,
            validationTime: 0.6,
            timestamp: 1628486915000
        });
    });

    it('parse normal log warmup skip', function () {
        // eslint-disable-next-line max-len
        let message = 'NOTICE: 2021-08-09 13:28:35 [-:-] errno[-] status[200] logId[warmup] pid[14871] uri[/app/other] cluster[-] idc[-] product[quickstart]';
        const log = parse(message);
        expect(log).toBe(undefined);
    });

    it('parse error log', function () {
        // eslint-disable-next-line max-len
        let message = 'ERROR: 2021-08-09 14:08:16 [-:-] errno[-] status[-] logId[8dd409d2-bdd4-43e8-b946-88143cb7c26c] pid[20657] uri[/app] cluster[-] idc[-] product[quickstart] module[test] clientIp[127.0.0.1] ua[Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36] refer[-] cookie[-] Error: hello1     at AppController.getApp (/Users/chenxiao07/work/github/hoth/example/hoth-quickstart/dist/controller/app/app.controller.js:13:32)     at preHandlerCallback (/Users/chenxiao07/work/github/hoth/node_modules/fastify/lib/handleRequest.js:126:28)     at next (/Users/chenxiao07/work/github/hoth/node_modules/fastify/lib/hooks.js:158:7)     at handleResolve (/Users/chenxiao07/work/github/hoth/node_modules/fastify/lib/hooks.js:175:5)     at processTicksAndRejections (internal/process/task_queues.js:97:5)';
        const log = parse(message);
        expect(log).toEqual({
            level: 'error',
            app: 'hoth',
            // eslint-disable-next-line max-len
            msg: 'Error: hello1     at AppController.getApp (/Users/chenxiao07/work/github/hoth/example/hoth-quickstart/dist/controller/app/app.controller.js:13:32)     at preHandlerCallback (/Users/chenxiao07/work/github/hoth/node_modules/fastify/lib/handleRequest.js:126:28)     at next (/Users/chenxiao07/work/github/hoth/node_modules/fastify/lib/hooks.js:158:7)     at handleResolve (/Users/chenxiao07/work/github/hoth/node_modules/fastify/lib/hooks.js:175:5)     at processTicksAndRejections (internal/process/task_queues.js:97:5)',
            logId: '8dd409d2-bdd4-43e8-b946-88143cb7c26c',
            pid: 20657,
            uri: '/app',
            product: 'quickstart',
            module: 'test',
            clientIp: '127.0.0.1',
            // eslint-disable-next-line max-len
            ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
            timestamp: 1628489296000
        });
    });

    it('cluster as app', function () {
        // eslint-disable-next-line max-len
        const message = 'ERROR: 2021-08-09 14:08:16 [-:-] errno[-] status[-] cluster[test]';
        const log = parse(message);
        expect(log!.app).toBe('test');
    });

    it('not match', function () {
        // eslint-disable-next-line max-len
        const message = 'ERROR 2021-08-09 14:08:16 [-:-] errno[-] status[-]';
        const log = parse(message);
        expect(log).toBeUndefined();
    });
});
