import globals from 'globals';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import babelPlugin from '@babel/eslint-plugin';
import ecomfeConfig from '@ecomfe/eslint-config';
import ecomfeConfigTs from '@ecomfe/eslint-config/typescript/index.js';

export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json'
            },
            globals: {
                ...globals.node,
                ...globals.jest
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            '@babel': babelPlugin
        },
        rules: {
            ...ecomfeConfig.rules,
            ...ecomfeConfigTs.rules,
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            'no-unused-vars': 'off'
        }
    }
];