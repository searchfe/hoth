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
    + ' uri[:uri] cluster[:cluster] idc[:idc] product[:product] module[:module]'
    + ' clientIp[:ip] ua[:ua] refer[:referrer]+:fields :msg';

const noticeFormat = ':level: :time [:file::line]'
    + ' errno[:errno] status[:status] logId[:logid] pid[:pid]'
    + ' method[:method] uri[:uri] cluster[:cluster] idc[:idc] product[:product] module[:module]'
    + ' clientIp[:ip] ua[:ua] refer[:referrer]+:fields+:notices tm[:performance] responseTime[:response-time]';

// +: 代表自行补齐前置空格
const errorFormat = ':level: :time [:file::line]'
    + ' errno[:errno] status[:status] logId[:logid] pid[:pid]'
    + ' uri[:uri] cluster[:cluster] idc[:idc] product[:product] module[:module]'
    + ' clientIp[:ip] ua[:ua] refer[:referrer]+:fields+:extraInfo :errmsg';

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

export const fieldSym = Symbol.for('hoth.logger.field');
export const noticeSym = Symbol.for('hoth.logger.notice');
export const performanceSym = Symbol.for('hoth.logger.performace');
