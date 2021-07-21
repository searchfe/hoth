import {createSSRApp} from 'vue';
import App from './App.vue';

const data = JSON.parse(document.getElementById('initialData')!.innerText);
createSSRApp(App, data).mount('#app');
