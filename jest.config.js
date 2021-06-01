module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    collectCoverage: true,
    collectCoverageFrom: [
        'packages/*/src/**/*.ts',
        '!**/*.d.ts',
        '!**/__fixtures__/**',
        '!**/coverage/**',
        '!**/templates/**',
        '!**/example/**',
        '!**/node_modules/**',
    ],
    globals: {
        'ts-jest': {
            tsconfig: {
                strict: false
            }
        }
    },
};
