import { defineStore } from 'pinia';

interface AppState {
    theme: 'dark' | 'light';
}

const key = 'app';

const useStore = defineStore(key, {
    state: (): AppState => ({
        theme: 'dark',
    }),

    getters: {
        info(state: AppState): AppState {
            return { ...state };
        },
    },

    actions: {
        // 载入数据
        setInfo(partial: Partial<AppState>) {
            this.$patch(partial);
        },
        // 重置数据
        resetInfo() {
            this.$reset();
        },

        // 切换主题
        toggleTheme(theme: AppState['theme']) {
            this.theme = theme;
            if (theme === 'dark') {
                document.body.setAttribute('arco-theme', 'dark');
            } else if (theme === 'light') {
                document.body.removeAttribute('arco-theme');
            }
        },
    },
    persist: {
        key,
    },
});

export type { AppState };
export default useStore;
