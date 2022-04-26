module.exports = {
    preset: 'ts-jest',
    // Note resolver required only when using imports with extensions
    // resolver: 'jest-ts-webcompat-resolver',
    // In test environment we setup reflect-metadata
    testEnvironment: './jest.environment.cjs',
    // Jest does not support ESM modules well, so you will need to define mappings to CJS modules
    moduleNameMapper: {
        '^fastify-decorators/testing$': 'fastify-decorators/testing/index.cjs',
        '^fastify-decorators/plugins$': 'fastify-decorators/plugins/index.cjs',
        '^fastify-decorators$': 'fastify-decorators/index.cjs',
    },
};
