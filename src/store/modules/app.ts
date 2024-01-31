import router from '@/router';
import axios from 'axios';
import { defineStore } from 'pinia';

interface AppState {
    server: {
        host: string;
        port: number;
        username: string;
        password: string;
        save: boolean;
    };
    link: boolean;
}

const key = 'app';

const useStore = defineStore(key, {
    state: (): AppState => ({
        server: {
            host: '127.0.0.1',
            port: 22,
            username: 'root',
            password: '',
            save: false,
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

        async login(form: AppState['server']) {
            const { data } = await axios.post('/api/link', form);
            console.log(data);
            if (form.save) {
                this.setServer(form);
            } else {
                this.$reset();
            }
            this.link = true;
            router.push('/');
        },
        logout() {
            axios.post('/api/link/close');
            this.link = false;
            window.location.reload();
        },
    },
    persist: {
        key,
    },
});

export type { AppState };
export default useStore;
