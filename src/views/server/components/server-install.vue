<template>
    <a-button type="primary" :disabled="disabled" @click="handleInstall">
        一键安装
    </a-button>
    <a-modal
        v-model:visible="visible"
        title="安装进度"
        width="800px"
        :mask-closable="false"
        :esc-to-close="false"
        :footer="false"
        simple
    >
        <a-steps type="arrow" :current="current">
            <a-step :description="description[0]"> 检查服务器环境 </a-step>
            <a-step :description="description[1]"> 安装依赖软件 </a-step>
            <a-step :description="description[2]">
                安装幻兽帕鲁服务器端
            </a-step>
            <a-step :description="description[3]"> 安装完成 </a-step>
        </a-steps>
    </a-modal>
</template>

<script lang="ts" setup>
import { Modal } from '@arco-design/web-vue';
import { ref } from 'vue';

defineProps<{ disabled: boolean }>();

const visible = ref(false);
const current = ref();
const description = ref(['等待执行', '等待执行', '等待执行', '等待执行']);

const handleInstall = () => {
    console.log('handleInstall');
    Modal.warning({
        title: '安装确认',
        content:
            '您正准备安装/重装幻兽帕鲁服务器！！！如存档未备份可能导致严重后果！！！请再次确认您的操作！！！',
        okText: '确认安装',
        cancelText: '我再看看',
        hideCancel: false,
        onOk: () => {
            visible.value = true;
            initSocket();
        },
    });
};

const socket = ref();

// 初始化WebSocket连接
const initSocket = () => {
    const socketUrl = 'ws://localhost:18181/ws/install';
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
        console.log('收到WebSocket消息', data);
        if (data.status === 'finish') {
            socket.value.close();
            Modal.info({
                title: '安装完成',
                content: '幻兽帕鲁服务端已成功安装',
                onOk: () => {
                    visible.value = false;
                },
            });
        } else {
            current.value = data.step;
            description.value[data.step - 1] = data.message;
        }
    };
};
</script>

<style lang="less" scoped></style>
