import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useAppStore from './modules/app';
import useServerStore from './modules/server';
import useAutoStore from './modules/autoRun';

const pinia = createPinia().use(piniaPluginPersistedstate);

export { useAppStore, useServerStore, useAutoStore };
export default pinia;
