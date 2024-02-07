import axios from 'axios';
import { defineStore } from 'pinia';

interface AutoRun {
    enabled: boolean;
    run: boolean;
    lastRun: number;
}

interface AutoState {
    autoFree: AutoRun;
    autoRestart: AutoRun;
}

const key = 'autoRun';

const useStore = defineStore(key, {
    state: (): AutoState => ({
        autoFree: {
            enabled: true,
            run: false,
            lastRun: 0,
        },
        autoRestart: {
            enabled: false,
            run: false,
            lastRun: 0,
        },
    }),

    getters: {
        info(state: AutoState): AutoState {
            return { ...state };
        },
    },

    actions: {
        // 载入数据
        setInfo(partial: Partial<AutoState>) {
            this.$patch(partial);
        },
        // 重置数据
        resetInfo() {
            this.$reset();
        },

        async runFree(memoryPer: number) {
            // 自动清理缓存
            if (this.autoFree.run) {
                return;
            }
            if (memoryPer > 0.8) {
                console.log('内存超过80%了');
                if (this.autoFree.lastRun + 60 * 1000 < new Date().getTime()) {
                    console.log('执行自动清理内存');
                    this.autoFree.lastRun = new Date().getTime();
                    this.autoFree.run = true;
                    await axios.post('http://localhost:18181/manage/free');
                    this.autoFree.run = false;
                }
            }
        },

        async runRestart(memoryPer: number) {
            // 自动重启
            if (this.autoRestart.run) {
                return;
            }
            if (memoryPer > 0.9) {
                console.log('内存超过90%了');
                if (
                    this.autoRestart.lastRun + 5 * 60 * 1000 <
                    new Date().getTime()
                ) {
                    console.log('执行重启');
                    this.autoRestart.lastRun = new Date().getTime();
                    this.autoRestart.run = true;
                    await axios.post('http://localhost:18181/manage/restart');
                    this.autoRestart.run = false;
                }
            }
        },

        auto(memoryPer: number) {
            if (this.autoFree.enabled) {
                this.runFree(memoryPer);
            }
            if (this.autoRestart.enabled) {
                this.runRestart(memoryPer);
            }
        },
    },
    persist: {
        key,
    },
});

export type { AutoState };
export default useStore;
