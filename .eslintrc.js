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
        'comma-dangle': 'off',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/init-declarations': 'off'
    },
};
