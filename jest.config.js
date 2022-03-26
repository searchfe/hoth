module.exports = {
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '.*\\.d.ts', '/workdir/'],
    testRegex: '/__tests__/.*(test|spec)\\.ts$',
    collectCoverage: true,
    collectCoverageFrom: [
        'packages/*/src/**/*.ts',
        '!**/*.d.ts',
        '!**/__fixtures__/**',
        '!**/coverage/**',
        '!**/hoth-template/**',
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
    setupFiles: ['jest-date-mock'],
    moduleNameMapper: {
        '@hoth/app-autoload': '<rootDir>/packages/app-autoload/src/index.ts',
        '@hoth/utils': '<rootDir>/packages/utils/src/index.ts',
        '@hoth/logger': '<rootDir>/packages/logger/src/index.ts',
        '@hoth/decorators': '<rootDir>/packages/decorators/src/index.ts'
    }
};
