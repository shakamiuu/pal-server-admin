import '@/assets/style/global.less';
// import globalComponents from '@/components';
import router from '@/router';
import store from '@/store';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { createApp } from 'vue';
import App from './App.vue';

const pluginList = [store, router, ArcoVue, ArcoVueIcon];

const app = createApp(App);

// 批量注册插件  改用自动引入
Object.entries(pluginList).forEach(([, v]) => {
    app.use(v);
});
app.mount('#app');
