export interface IAdapter {
    /**
     * 同步加载
     * @param filePath 文件路径
     */
    loadSync(filePath: string): Record<string, any>;

    /**
     * 异步加载
     * @param filePath 文件路径
     */
    loadAsync(filePath: string): Promise<Record<string, any>>;
}