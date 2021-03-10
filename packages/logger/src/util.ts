import tokens from './tokens';

export function compile(format: string) {
    return Function('tokens, o', 'return "' + format
        .replace(/"/g, '\\"')
        .replace(/\[\]/g, '')
        .replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
            return typeof tokens[name] === 'function'
                ? `" + (tokens["${name}"](o` + (arg ? `, "${arg}"` : '') + ') || "-") + "'
                : (arg ? `:${name}(${arg})` : `:${name}`);
        }) + '\\n"');
}
