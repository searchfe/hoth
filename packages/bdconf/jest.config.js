const path = require('path');

module.exports = {
    verbose: true,
    clearMocks: true,
    coverageDirectory: 'coverage',
    collectCoverage: true,
    coveragePathIgnorePatterns: ['node_modules'],
    moduleFileExtensions: [
        'ts',
        'js',
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.jest.json',
        },
    },
};
