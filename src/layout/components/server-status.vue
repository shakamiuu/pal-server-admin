<template>
    <a-scrollbar style="height: calc(100vh - 106px); overflow: auto">
        <a-space direction="vertical" fill>
            <div class="progress">
                <a-progress
                    :percent="serverStore.load()"
                    :status="status(serverStore.load(), false)"
                    type="circle"
                    size="large"
                    animation
                ></a-progress>
                <a-typography-title :heading="6"> 系统负载 </a-typography-title>
            </div>
            <div class="progress">
                <a-progress
                    :percent="serverStore.cpuPer()"
                    :status="status(serverStore.cpuPer())"
                    type="circle"
                    size="large"
                    animation
                ></a-progress>
                <a-typography-title :heading="6">
                    CPU占用率
                </a-typography-title>
            </div>
            <div class="progress">
                <a-progress
                    :percent="serverStore.memoryPer()"
                    :status="status(serverStore.memoryPer())"
                    type="circle"
                    size="large"
                    animation
                ></a-progress>
                <a-typography-title
                    v-if="serverStore.status?.memTotal"
                    :heading="6"
                >
                    {{
                        `内存(${((serverStore.status?.memUsed + serverStore.status?.memBuffCache) / 1024 / 1024).toFixed(2)}G/${(serverStore.status?.memTotal / 1024 / 1024).toFixed(2)}G)`
                    }}
                </a-typography-title>
                <a-typography-title v-else :heading="6">
                    内存空间
                </a-typography-title>
            </div>
            <div class="progress">
                <a-progress
                    :percent="serverStore.diskPer()"
                    :status="status(serverStore.diskPer())"
                    size="large"
                    animation
                ></a-progress>
                <a-typography-title
                    v-if="serverStore.status?.diskSize"
                    :heading="6"
                >
                    {{
                        `硬盘空间(${(serverStore.status?.diskUsed / 1024).toFixed(2)}G/${(serverStore.status?.diskSize / 1024).toFixed(2)}G)`
                    }}
                </a-typography-title>
                <a-typography-title v-else :heading="6">
                    硬盘空间
                </a-typography-title>
            </div>
        </a-space>
    </a-scrollbar>
</template>

<script lang="ts" setup>
import { useAutoStore, useServerStore } from '@/store';
import { Modal } from '@arco-design/web-vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const serverStore = useServerStore();
const autoStore = useAutoStore();
const monitor = ref();

const status = (percent: number, error = true) => {
    if (percent < 0.5) {
        return 'normal';
    } else if (percent < 1) {
        return 'warning';
    } else {
        if (error) {
            return 'danger';
        } else {
            return 'warning';
        }
    }
};

const startMonitor = () => {
    console.log('startMonitor');
    const socketUrl = 'ws://localhost:18181/ws/monitor';
    monitor.value = new WebSocket(socketUrl);
    monitor.value.onopen = (event: Event) => {
        console.log('监听服务器状态已打开', event);
    };
    monitor.value.onerror = (event: Event) => {
        console.log('监听服务器状态发生错误', event);
    };
    monitor.value.onclose = (event: CloseEvent) => {
        console.log('监听服务器状态已关闭', event);
        Modal.warning({
            title: '连接断开',
            content: '与服务器的连接已断开',
        });
        serverStore.setStatus(undefined);
        serverStore.closeServer();
    };
    monitor.value.onmessage = (event: MessageEvent) => {
        // console.log('监听服务器状态', event);
        serverStore.setStatus(JSON.parse(event.data));
        autoStore.auto(serverStore.memoryPer());
    };
};

const closeMonitor = () => {
    console.log('closeMonitor');
    monitor.value?.close();
};

watch(
    () => serverStore.link,
    (newVal) => {
        if (newVal) {
            startMonitor();
        } else {
            closeMonitor();
        }
    },
);

onMounted(() => {
    if (serverStore.link) {
        startMonitor();
    }
});

onUnmounted(() => {
    closeMonitor();
});
</script>

<style lang="less" scoped>
.progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: rgb(255 255 255 / 85%);
    color: #fff;
}
</style>
