import '@/assets/style/global.less';
import router from '@/router';
import store from '@/store';
import { createApp } from 'vue';
import App from './App.vue';

const pluginList = [store, router];

const app = createApp(App);

// 批量注册插件  改用自动引入
Object.entries(pluginList).forEach(([, v]) => {
    app.use(v);
});

app.mount('#app').$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: 'removeLoading' }, '*');

    // Use contextBridge
    window.ipcRenderer.on(
        'main-process-message',
        (_event: any, message: any) => {
            console.log(message);
        },
    );
});
