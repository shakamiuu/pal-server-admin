import { defineStore } from 'pinia';

interface AppState {
    theme: 'dark' | 'light';
    server: {
        ip: string;
        port: number;
        username: string;
        password: string;
    };
    link: boolean;
}

const key = 'app';

const useStore = defineStore(key, {
    state: (): AppState => ({
        theme: 'dark',
        server: {
            ip: '127.0.0.1',
            port: 22,
            username: 'root',
            password: '',
        },
        link: false,
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

        setServer(server: AppState['server']) {
            this.server = server;
        },

        setLink(link: AppState['link']) {
            this.link = link;
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
