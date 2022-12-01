import uuid from 'uuid-random';
import {isEmpty} from 'lodash';
import {levelFormats} from './constants';
import {getTime} from './getTime';

export default {
    cluster() {
        return process.env.HOTH_CLUSTER;
    },
    idc() {
        return process.env.HOTH_IDC;
    },
    app(o) {
        return o.app;
    },
    logid(o) {
        return o.req?.logid || uuid();
    },
    module(o) {
        return o.req?.module || o.req?.url.split('?')[0].split('/').filter(a => a && a !== o.app).join('_');
    },
    product(o) {
        return o.req?.product || o.app;
    },
    pid(o) {
        return o.pid;
    },
    level(o) {
        return levelFormats[o.level].str;
    },
    // hostname(o) {
    //     return o.hostname;
    // },
    uri(o) {
        return o.req?.url;
    },
    errno() {
        return '';
    },
    // cookie(o) {
    //     return o.req?.headers.cookie;
    // },
    time(o) {
        const [year, month, day, hour, minute, second] = getTime(o.time);
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    method(o) {
        return o.req?.method;
    },
    'response-time'(o) {
        return o.responseTime;
    },
    status(o) {
        return o.res?.statusCode;
    },
    referrer(o) {
        return o.req?.headers.referer || o.req?.headers.referrer;
    },
    ip(o) {
        return o.req?.ip;
    },
    ua(o) {
        return o.req?.headers['user-agent'];
    },
    file() {
        return '';
    },
    line() {
        return '';
    },
    msg(o) {
        return o.msg;
    },
    errmsg(o) {
        return o.err?.stack?.replace(/(\n)+|(\r\n)+/g, ' ') || o.msg;
    },
    extraInfo(o) {
        if (isEmpty(o.extraInfo)) {
            return '';
        }
        return ' ' + Object.keys(o.extraInfo).map(key => {
            const notice = o.extraInfo[key];
            return `${key}[${notice}]`;
        }).join(' ');
    },
    fields(o) {
        if (isEmpty(o.req?.fields)) {
            return '';
        }
        return ' ' + Object.keys(o.req.fields).map(key => {
            const fields = o.req.fields[key];
            return `${key}[${fields}]`;
        }).join(' ');
    },
    notices(o) {
        if (isEmpty(o.req?.notices)) {
            return '';
        }
        return ' ' + Object.keys(o.req.notices).map(key => {
            const notice = o.req.notices[key];
            return `${key}[${notice}]`;
        }).join(' ');
    },
    performance(o) {
        if (isEmpty(o.req?.performance)) {
            return '';
        }
        const perfStr = Object.keys(o.req.performance).map(key => {
            const pref = o.req.performance[key];
            return `${key}:${pref[0]}:${pref[1].toFixed(1)}`;
        }).join(' ');
        return perfStr;
    },
    // req(o, field) {
    //     if (!field) {
    //         return;
    //     }
    //     return o.req?.headers[field.toLowerCase()];
    // },
    // res(o, field) {
    //     if (!field) {
    //         return;
    //     }
    //     const headers = o._lastResHeaders || o.res.headers;
    //     o._lastResHeaders = headers;
    //     const key = headers[field];
    //     if (!key) {
    //         return;
    //     }
    //     return key;
    // },
};
