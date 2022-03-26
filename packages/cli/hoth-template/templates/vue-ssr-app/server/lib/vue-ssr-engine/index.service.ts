import {Service} from '@hoth/decorators';
import {renderToString} from '@vue/server-renderer';
import {ComponentOptions, createSSRApp} from 'vue';

@Service()
export default class VueRenderEngineService {
    async render(Component: ComponentOptions, data: Record<string, unknown>) {
        const app = createSSRApp(Component, data);
        const appContent = await renderToString(app);
        return appContent;
    }
}
