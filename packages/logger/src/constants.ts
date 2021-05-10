import {compile} from './compile';

export const defaultLevels = {
    fatal: 60,
    error: 50,
    warn: 40,
    notice: 35,
    info: 30,
    debug: 20,
    trace: 10,
};

const normalFormat = ':level: :time [:file::line]'
    + ' errno[:errno] logId[:logid] pid[:pid]'
    + ' uri[:uri] cluster[:cluster] idc[:idc] product[:app] module[:module]'
    + ' clientIp[:ip] ua[:ua] refer[:referrer] cookie[:cookie] :msg';

const noticeFormat = ':level: :time [:file::line]'
    + ' errno[:errno] status[:status] logId[:logid] pid[:pid]'
    + ' uri[:uri] cluster[:cluster] idc[:idc] product[:app] module[:module]'
    + ' clientIp[:ip] ua[:ua] refer[:referrer] cookie[:cookie] :notices tm[:performance] responseTime[:response-time]';

const errorFormat = ':level: :time [:file::line]'
    + ' errno[:errno] status[:status] logId[:logid] pid[:pid]'
    + ' uri[:uri] cluster[:cluster] idc[:idc] product[:app] module[:module]'
    + ' clientIp[:ip] ua[:ua] refer[:referrer] cookie[:cookie] :errmsg';

export const defaultFormats = {
    fatal: errorFormat,
    error: errorFormat,
    warn: errorFormat,
    notice: noticeFormat,
    info: normalFormat,
    debug: normalFormat,
    trace: normalFormat,
};

export const levelFormats = Object.keys(defaultLevels).reduce((prev, level) => {
    return {
        ...prev,
        [defaultLevels[level]]: {
            str: level.toUpperCase(),
            format: compile(defaultFormats[level]),
        },
    };
}, {});

export const noticeSym = Symbol.for('hoth.logger.notice');
export const performanceSym = Symbol.for('hoth.logger.performace');
