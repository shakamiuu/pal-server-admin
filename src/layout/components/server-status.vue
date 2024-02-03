<template>
    <a-space direction="vertical" fill>
        <template #split>
            <a-divider />
        </template>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="load"
                :status="status(load)"
                type="circle"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> 系统负载 </a-typography-title>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="cpuPer"
                :status="status(cpuPer)"
                type="circle"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> CPU占用率 </a-typography-title>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="memoryPer"
                :status="status(memoryPer)"
                type="circle"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6">
                {{
                    `内存(${((systemInfo?.memUsed + systemInfo?.memBuffCache) / 1024 / 1024).toFixed(2)}G/${(systemInfo?.memTotal / 1024 / 1024).toFixed(2)}G)`
                }}
            </a-typography-title>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="diskPer"
                :status="status(diskPer)"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6">
                {{
                    `硬盘空间(${(systemInfo?.diskUsed / 1024).toFixed(2)}G/${(systemInfo?.diskSize / 1024).toFixed(2)}G)`
                }}
            </a-typography-title>
        </div>
    </a-space>
</template>

<script lang="ts" setup>
import { useServerStore } from '@/store';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const serverStore = useServerStore();
const monitor = ref();

const systemInfo = ref();

const status = (percent: number) => {
    if (percent < 0.5) {
        return 'normal';
    } else if (percent < 1) {
        return 'warning';
    } else {
        return 'danger';
    }
};

const load = computed(
    () => Math.ceil(systemInfo.value?.loadAverage * 100) / 100 || 0,
);

const cpuPer = computed(
    () => Math.ceil(100 - systemInfo.value?.cpuIdle) / 100 || 0,
);

const memoryPer = computed(
    () =>
        Math.ceil(
            ((systemInfo.value?.memBuffCache + systemInfo.value?.memUsed) /
                systemInfo.value?.memTotal) *
                100,
        ) / 100 || 0,
);

const diskPer = computed(
    () =>
        Math.ceil(
            (systemInfo.value?.diskUsed / systemInfo.value?.diskSize) * 100,
        ) / 100 || 0,
);

const startMonitor = () => {
    console.log('startMonitor');
    const socketUrl = `${import.meta.env.VITE_API_WEBSOCKET_URL}/ws/monitor`;
    monitor.value = new WebSocket(socketUrl);
    monitor.value.onopen = (event: Event) => {
        console.log('监听服务器状态已打开', event);
    };
    monitor.value.onerror = (event: Event) => {
        console.log('监听服务器状态发生错误', event);
    };
    monitor.value.onclose = (event: CloseEvent) => {
        console.log('监听服务器状态已关闭', event);
    };
    monitor.value.onmessage = (event: MessageEvent) => {
        // console.log('监听服务器状态', event);
        systemInfo.value = JSON.parse(event.data);
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

<style lang="less" scoped></style>
