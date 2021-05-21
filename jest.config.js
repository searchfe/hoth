const path = require('path');
const {getPackagesSync} = require('@lerna/project');
const {configureLinter} = require('lerna-jest/lib/linter');
const {configureProject} = require('lerna-jest/lib/project');
const {configureSuite} = require('lerna-jest/lib/suite');

function nonEmpty(item) {
    return Boolean(item);
}

function guessProjectConfig(rootDir) {
    const integration = configureSuite(rootDir, 'integration', {
        moduleFileExtensions: ['js', 'ts'],
        transform: {
            '^.+\\.(ts)$': 'ts-jest',
        },
        testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    });
    const linter = configureLinter(rootDir);
    return configureProject(
        rootDir,
        [integration, linter].filter(nonEmpty)
    );
}

function guessRootConfig(directory) {
    const packages = getPackagesSync(directory);
    const project = configureProject(
        directory,
        packages.reduce(
            (aggr, pkg) => aggr.concat(guessProjectConfig(pkg.location).projects),
            []
        ),
        {
            collectCoverage: true,
            collectCoverageFrom: [
                '**/*.ts',
                '!**/*.d.ts',
                '!**/__fixtures__/**',
                '!**/coverage/**',
                '!**/templates/**',
                '!**/example/**',
                '!**/node_modules/**',
            ],
        }
    )
    process.env.NODE_PATH = path.join(directory, 'packages');
    return project;
}

module.exports = guessRootConfig(__dirname);
