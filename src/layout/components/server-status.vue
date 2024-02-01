<template>
    <a-space direction="vertical" fill>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="systemInfo.cpu / 100"
                :status="status(systemInfo.cpu / 100)"
                type="circle"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> CPU占用率 </a-typography-title>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="
                    Math.ceil(
                        (systemInfo.memory.usedMemory /
                            systemInfo.memory.totalMemory) *
                            100,
                    ) / 100 || 0
                "
                :status="
                    status(
                        Math.ceil(
                            (systemInfo.memory.usedMemory /
                                systemInfo.memory.totalMemory) *
                                100,
                        ) / 100 || 0,
                    )
                "
                type="circle"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> 内存使用量 </a-typography-title>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="
                    Math.ceil(
                        (systemInfo.disk.usedDisk / systemInfo.disk.totalDisk) *
                            100,
                    ) / 100 || 0
                "
                :status="
                    status(
                        Math.ceil(
                            (systemInfo.disk.usedDisk /
                                systemInfo.disk.totalDisk) *
                                100,
                        ) / 100 || 0,
                    )
                "
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> 硬盘使用量 </a-typography-title>
        </div>
    </a-space>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue';
import { ref, onMounted, onUnmounted } from 'vue';

const systemInfo = ref({
    cpu: 0,
    memory: {
        totalMemory: 0,
        usedMemory: 0,
    },
    disk: {
        totalDisk: 0,
        usedDisk: 0,
    },
});

const status = (percent: number) => {
    if (percent < 0.5) {
        return 'normal';
    } else if (percent < 1) {
        return 'warning';
    } else {
        return 'danger';
    }
};

const socket = ref();

// 初始化WebSocket连接
const initSocket = () => {
    const socketUrl = `${import.meta.env.VITE_API_WEBSOCKET_URL}/socket`;
    socket.value = new WebSocket(socketUrl);
    socket.value.onopen = (event: Event) => {
        console.log('WebSocket连接已打开', event);
    };
    socket.value.onerror = (event: Event) => {
        console.log('WebSocket连接发生错误', event);
    };
    socket.value.onclose = (event: CloseEvent) => {
        console.log('WebSocket连接已关闭', event);
    };
    socket.value.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.status == 'done') {
            systemInfo.value.cpu = data.data.cpu;
            systemInfo.value.memory = data.data.memory;
            systemInfo.value.disk = data.data.disk;
        } else {
            Message.error('服务器连接异常！');
            socket.value.close();
            clearInterval(interval.value);
        }
        // console.log('收到WebSocket消息', event);
    };
};

const interval = ref();

const startInterval = () => {
    interval.value = window.setInterval(() => {
        if (socket.value && socket.value.readyState === WebSocket.OPEN) {
            socket.value.send(JSON.stringify({ status: 'SYSTEM' }));
        }
    }, 2000);
};

onMounted(() => {
    initSocket();
    startInterval();
});

onUnmounted(() => {
    if (socket.value) {
        socket.value.close();
    }
    clearInterval(interval.value);
});
</script>

<style lang="less" scoped></style>
