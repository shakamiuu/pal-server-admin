import axios from 'axios';
import { defineStore } from 'pinia';
import { useAppStore } from '..';
import { Message } from '@arco-design/web-vue';

export interface SSHModel {
    system?: string;
    host: string;
    port: number;
    username: string;
    password: string;
}

interface ServerState {
    server: SSHModel;
    servers: {
        [key: string]: SSHModel;
    };
    monitor?: WebSocket;
    status: {
        link: boolean;
        [key: string]: string | number | boolean;
    };
}

const key = 'server';

const useStore = defineStore(key, {
    state: (): ServerState => ({
        server: {
            host: '127.0.0.1',
            port: 22,
            username: 'root',
            password: '',
        },
        servers: {},
        status: { link: false },
    }),

    getters: {
        info(state: ServerState): ServerState {
            return { ...state };
        },
    },

    actions: {
        // 载入数据
        setInfo(partial: Partial<ServerState>) {
            this.$patch(partial);
        },
        // 重置数据
        resetInfo() {
            this.$reset();
        },

        // 连接服务器
        async connectServer(server: SSHModel) {
            const appStore = useAppStore();
            appStore.setLoading(true);
            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/link`,
                    server,
                );
                Message.success('连接成功');
                server.system = data;
                this.server = server;
                // 保存到服务器列表
                this.addServer(server.host, server);
                // 开始监听
                this.startMonitor();
            } catch (e) {
                Message.error('连接失败');
            } finally {
                appStore.setLoading(false);
            }
        },

        // 断开连接
        async closeServer() {
            const appStore = useAppStore();
            appStore.setLoading(true);
            try {
                // 关闭监听
                this.closeMonitor();
                // 断开连接
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/link/close`,
                );
            } finally {
                appStore.setLoading(false);
            }
        },

        // 添加连接
        addServer(host: string, server: SSHModel) {
            this.servers[host] = server;
        },

        // 删除服务器
        async removeServer(host: string) {
            delete this.servers[host];
        },

        // 开始监听服务器状态
        startMonitor() {
            const socketUrl = `${import.meta.env.VITE_API_WEBSOCKET_URL}/ws/monitor`;
            this.monitor = new WebSocket(socketUrl);
            this.monitor.onopen = (event: Event) => {
                console.log('监听服务器状态已打开', event);
                this.status = { link: true };
            };
            this.monitor.onerror = (event: Event) => {
                console.log('监听服务器状态发生错误', event);
                this.status = { link: false };
            };
            this.monitor.onclose = (event: CloseEvent) => {
                console.log('监听服务器状态已关闭', event);
                this.status = { link: false };
            };
            this.monitor.onmessage = (event: MessageEvent) => {
                console.log('监听服务器状态', event);
            };
        },

        // 关闭监听
        closeMonitor() {
            this.status = { link: false };
            this.monitor?.close();
        },
    },
    persist: {
        key,
    },
});

export type { ServerState };
export default useStore;
