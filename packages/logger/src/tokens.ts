import uuid from 'uuid-random';
import {levelFormats} from './constants';
export default {
    id: function (o) {
        return o.req.id;
    },
    app: function (o) {
        return o.app;
    },
    logid(o) {
        return o.req?.logid || uuid();
    },
    product: function (o) {
        return o.req?.product || o.req?.url.split('/').filter(a => a).join('_');
    },
    module: function (o) {
        return o.req?.module;
    },
    pid: function (o) {
        return o.pid;
    },
    level: function (o) {
        return levelFormats[o.level].str;
    },
    hostname: function (o) {
        return o.hostname;
    },
    uri: function (o) {
        return o.req?.url;
    },
    errno() {
        return '';
    },
    cookie(o) {
        return o.req?.headers.cookie;
    },
    time: function (o) {
        let date = o._lastDate || new Date(o.time);
        o._lastDate = date;
        const parts = date.toISOString().split('T');
        return `${parts[0]} ${parts[1].split('.')[0]}`;
    },
    method: function (o) {
        return o.req?.method;
    },
    'response-time': function (o) {
        return o.responseTime;
    },
    status: function (o) {
        return o.res?.statusCode;
    },
    referrer: function (o) {
        return o.req?.headers.referer || o.req?.headers.referrer;
    },
    ip: function (o) {
        return o.req?.ip;
    },
    ua: function (o) {
        return o.req?.headers['user-agent'];
    },
    file: function () {
        return '';
    },
    line: function () {
        return '';
    },
    msg: function (o) {
        return o.msg;
    },
    errmsg: function (o) {
        return o.err?.stack?.replace(/(\n)+|(\r\n)+/g, ' ') || o.msg;
    },
    req: function (o, field) {
        if (!field) {
            return;
        }
        return o.req?.headers[field.toLowerCase()];
    },
    res: function (o, field) {
        if (!field) {
            return;
        }
        const headers = o._lastResHeaders || o.res.headers;
        o._lastResHeaders = headers;
        const key = headers[field];
        if (!key) {
            return;
        }
        return key;
    },
};
