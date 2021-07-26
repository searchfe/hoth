import type {FastifyInstance} from 'fastify';
import {initSchema} from '../src/index';
import path from 'path';
import {promises as fs} from 'fs';

describe('hoth schema plugin', () => {
    it('init schema', async () => {
        const originSchemaStr = await fs.readFile(path.resolve(__dirname, './sample/schema.json'), 'utf-8');
        const originSchema = JSON.parse(originSchemaStr);

        const mockFastify = {
            addSchema(schema: any) {
                expect(Object.keys(originSchema)).toContain(schema.$id);
            }
        };
        const addSchemaSpy = jest.spyOn(mockFastify, 'addSchema');
        await initSchema(mockFastify as FastifyInstance, {
            schemaPath: path.resolve(__dirname, './sample/schema.json')
        });

        expect(addSchemaSpy).toHaveBeenCalledTimes(Object.keys(originSchema).length);
    });
});
