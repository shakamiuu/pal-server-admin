<template>
    <div>
        <a-card title="快捷操作">
            <a-space direction="vertical">
                <a-space>
                    <a-button
                        type="primary"
                        :disabled="!!status"
                        @click="handleInstall"
                    >
                        一键安装
                    </a-button>
                    <a-button
                        type="primary"
                        :disabled="!!status"
                        @click="handleUpdate"
                    >
                        游戏更新
                    </a-button>
                    <a-button
                        type="primary"
                        :disabled="!!status"
                        @click="handleBackup"
                    >
                        存档备份
                    </a-button>
                    <a-button
                        type="primary"
                        :disabled="!!status"
                        @click="handleRestore"
                    >
                        存档恢复
                    </a-button>
                </a-space>
            </a-space>
        </a-card>

        <div style="margin-top: 30px">
            <a-card v-if="status == 'INSTALL'" title="安装进度">
                <a-steps type="arrow" :current="step">
                    <a-step :description="installDescription[0]">
                        检查服务器环境
                    </a-step>
                    <a-step :description="installDescription[1]">
                        安装依赖软件
                    </a-step>
                    <a-step :description="installDescription[2]">
                        安装幻兽帕鲁服务器端
                    </a-step>
                    <a-step :description="installDescription[3]">
                        安装完成
                    </a-step>
                </a-steps>
            </a-card>

            <a-card v-if="status == 'UPDATE'" title="更新进度">
                <a-steps type="arrow" :current="step">
                    <a-step :description="installDescription[0]">
                        检查服务器环境
                    </a-step>
                    <a-step :description="installDescription[1]">
                        停止幻兽帕鲁服务端
                    </a-step>
                    <a-step :description="installDescription[2]">
                        获取更新包
                    </a-step>
                    <a-step :description="installDescription[3]">
                        运行幻兽帕鲁服务端
                    </a-step>
                </a-steps>
            </a-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Message, Modal } from '@arco-design/web-vue';
import { ref } from 'vue';

const status = ref<'INSTALL' | 'UPDATE' | 'saved' | ''>('');
const step = ref<number>(0);
const installDescription = ref<string[]>([
    '等待执行',
    '等待执行',
    '等待执行',
    '等待执行',
]);

const handleInstall = () => {
    console.log('一键安装');
    Modal.warning({
        title: '安装确认',
        content:
            '您正准备安装/重装幻兽帕鲁服务器！！！如存档未备份可能导致严重后果！！！请再次确认您的操作！！！',
        okText: '确认安装',
        cancelText: '我再看看',
        hideCancel: false,
        onOk: () => {
            status.value = 'INSTALL';
            initSocket();
        },
    });
};

const handleUpdate = () => {
    console.log('游戏更新');
    Modal.warning({
        title: '更新确认',
        content: '您正准备更新幻兽帕鲁服务器！此次操作会重启服务器！请确认！',
        okText: '确认更新',
        cancelText: '稍后再说',
        hideCancel: false,
        onOk: () => {
            status.value = 'UPDATE';
            initSocket();
        },
    });
};

const handleBackup = () => {
    console.log('存档备份');
};

const handleRestore = () => {
    console.log('存档恢复');
};

const socket = ref();

// 初始化WebSocket连接
const initSocket = () => {
    const socketUrl = 'ws://localhost:8080/socket';
    socket.value = new WebSocket(socketUrl);
    socket.value.onopen = (event: Event) => {
        socket.value.send(JSON.stringify({ status: status.value }));
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
        if (data.status == 'progress') {
            step.value = data.data.step * 1 + 1;
            installDescription.value[step.value] = data.data.message;
            if (data.data.status == 'error') {
                Modal.error({
                    title: '操作失败',
                    content: data.data.message,
                    onOk: () => {
                        status.value = '';
                    },
                });
            } else if (data.data.status == 'finish') {
                Modal.info({
                    title: '操作完成',
                    content: data.data.message,
                    onOk: () => {
                        setTimeout(() => {
                            status.value = '';
                        }, 2000);
                    },
                });
            }
        } else if (data.status == 'success') {
            socket.value.close();
        } else {
            Message.error('服务器连接异常！');
            socket.value.close();
        }
        console.log('收到WebSocket消息', event);
    };
};
</script>

<style lang="less" scoped></style>
