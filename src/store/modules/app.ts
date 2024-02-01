import { defineStore } from 'pinia';

interface AppState {
    loading: boolean;
}

const key = 'app';

const useStore = defineStore(key, {
    state: (): AppState => ({
        loading: false,
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

        setLoading(loading: AppState['loading']) {
            this.loading = loading;
        },
    },
    persist: {
        key,
    },
});

export type { AppState };
export default useStore;
