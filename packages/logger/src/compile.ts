import tokens from './tokens';

export function compile(format: string) {
    return Function('tokens, o', 'return "' + format
        .replace(/"/g, '\\"')
        .replace(/\[\]/g, '')

        // support +:field ,default value is ''
        // support :field ,default value is '-'
        .replace(/\+?:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (match, name, arg) {
            return typeof tokens[name] === 'function'
                ? `" + (tokens["${name}"](o` + (arg ? `, "${arg}"` : '') + ') || "'
                    + (match.startsWith('+') ? '' : '-') + '") + "'
                : (arg ? `:${name}(${arg})` : `:${name}`);
        }) + '\\n"');
}
