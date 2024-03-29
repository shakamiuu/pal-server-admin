<template>
    <a-space size="large">
        <a-tag
            v-if="
                serverStore.link && serverStore.status?.palServerStatus == 'UP'
            "
            color="green"
            :loading="stopLoading"
        >
            运行中
        </a-tag>
        <a-tag
            v-if="
                serverStore.link &&
                serverStore.status?.palServerStatus == 'EXITED'
            "
            color="red"
            :loading="startLoading"
        >
            已停止
        </a-tag>

        <a-tooltip
            v-if="
                serverStore.link &&
                serverStore.status?.palServerStatus == 'EXITED'
            "
            content="开启服务器"
        >
            <a-button
                status="success"
                shape="round"
                :disabled="serverStore.status?.palServerStatus == 'UP'"
                :loading="startLoading"
                @click="handleStart"
            >
                <template #icon>
                    <icon-play-arrow-fill />
                </template>
                <template #default> 启动 </template>
            </a-button>
        </a-tooltip>
        <a-tooltip
            v-if="
                serverStore.link && serverStore.status?.palServerStatus == 'UP'
            "
            content="停止服务器"
        >
            <a-button
                status="danger"
                shape="round"
                :disabled="serverStore.status?.palServerStatus == 'EXITED'"
                :loading="stopLoading"
                @click="handleStop"
            >
                <template #icon>
                    <icon-poweroff />
                </template>
                <template #default> 关闭 </template>
            </a-button>
        </a-tooltip>
        <a-tooltip v-if="serverStore.link" content="重启服务器">
            <a-button
                v-if="serverStore.link"
                status="warning"
                shape="round"
                :loading="startLoading || stopLoading"
                @click="handleRestart"
            >
                <template #icon>
                    <icon-sync />
                </template>
                <template #default> 重启 </template>
            </a-button>
        </a-tooltip>
        <a-tooltip v-if="serverStore.link" content="退出">
            <a-button shape="round" @click="handLogout">
                <template #icon>
                    <icon-export />
                </template>
                <template #default> 断开连接 </template>
            </a-button>
        </a-tooltip>
        <connect-server v-else></connect-server>
    </a-space>
</template>

<script lang="ts" setup>
import { useServerStore } from '@/store';
import { Message, Modal } from '@arco-design/web-vue';
import axios from 'axios';
import { ref } from 'vue';
import ConnectServer from './connect-server.vue';

const serverStore = useServerStore();
const startLoading = ref<boolean>(false);
const stopLoading = ref<boolean>(false);

const handleStart = () => {
    console.log('handleStart');
    Modal.warning({
        title: '开启确认',
        content: '确认开启幻兽帕鲁服务器？',
        okText: 'GO!GO!GO!',
        cancelText: '按错了！',
        hideCancel: false,
        onOk: async () => {
            startLoading.value = true;
            try {
                await axios.post('http://localhost:18181/manage/start');
                Message.success('启动成功');
            } finally {
                startLoading.value = false;
            }
        },
    });
};

const handleStop = () => {
    console.log('handleStop');
    Modal.warning({
        title: '关闭确认',
        content: '确认关闭幻兽帕鲁服务器？',
        okText: '确认关服',
        cancelText: '按错了！',
        hideCancel: false,
        onOk: async () => {
            stopLoading.value = true;
            try {
                await axios.post('http://localhost:18181/manage/stop');
                Message.success('关闭成功');
            } finally {
                stopLoading.value = false;
            }
        },
    });
};

const handleRestart = () => {
    console.log('handleRestart');
    Modal.warning({
        title: '重启确认',
        content: '确认重启幻兽帕鲁服务器？',
        okText: '确认重启',
        cancelText: '按错了！',
        hideCancel: false,
        onOk: async () => {
            await axios.post('http://localhost:18181/manage/restart');
            Message.success('重启成功');
        },
    });
};

const handLogout = () => {
    console.log('handLogout');
    serverStore.closeServer();
};
</script>

<style lang="less" scoped></style>
