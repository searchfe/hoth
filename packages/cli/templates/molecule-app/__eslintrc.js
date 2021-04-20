/**
 * @file eslint config
 * @author
 */

module.exports = {
    extends: [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/typescript',
    ],
    rules: {
        'no-console': 'off',
        'spaced-comment': ["error", "always", { "markers": ["/"] }]
    },
};
