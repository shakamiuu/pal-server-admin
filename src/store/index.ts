import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useAppStore from './modules/app';
import useServerStore from './modules/server';

const pinia = createPinia().use(piniaPluginPersistedstate);

export { useAppStore, useServerStore };
export default pinia;
