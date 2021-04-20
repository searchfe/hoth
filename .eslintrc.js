/**
 * @file eslint config
 * @author cxtom
 */

module.exports = {
    extends: [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/typescript',
    ],
    rules: {
        'no-console': 'off',
        'spaced-comment': ["error", "always", { "markers": ["/"] }],
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/no-require-imports': 'off'
    },
};
