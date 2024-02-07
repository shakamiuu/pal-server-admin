<template>
    <a-button
        type="primary"
        status="success"
        :disabled="disabled"
        @click="handleUpdate"
    >
        游戏更新
    </a-button>
    <a-modal
        v-model:visible="visible"
        title="更新进度"
        width="800px"
        :mask-closable="false"
        :esc-to-close="false"
        :footer="false"
        simple
    >
        <a-steps type="arrow" :current="current">
            <a-step :description="description[0]"> 检查服务器环境 </a-step>
            <a-step :description="description[1]"> 停止幻兽帕鲁服务端 </a-step>
            <a-step :description="description[2]"> 获取更新包 </a-step>
            <a-step :description="description[3]"> 运行幻兽帕鲁服务端 </a-step>
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

const handleUpdate = () => {
    console.log('游戏更新');
    Modal.warning({
        title: '更新确认',
        content: '您正准备更新幻兽帕鲁服务器！此次操作会重启服务器！请确认！',
        okText: '确认更新',
        cancelText: '稍后再说',
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
    const socketUrl = 'ws://localhost:18181/ws/update';
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
                title: '更新完成',
                content: '幻兽帕鲁服务端已更新到最新版',
                onOk: () => {
                    visible.value = false;
                },
            });
        } else if (data.status === 'error') {
            socket.value.close();
            Modal.error({
                title: '更新错误',
                content: data.message,
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
