<template>
    <a-space size="large">
        <a-tooltip content="重启服务器">
            <a-button shape="circle" status="danger" @click="handleRestart">
                <icon-sync />
            </a-button>
        </a-tooltip>
        <a-tooltip v-if="serverStore.link" content="退出">
            <a-button shape="circle" @click="handLogout">
                <icon-export />
            </a-button>
        </a-tooltip>
        <connect-server v-else></connect-server>
    </a-space>
</template>

<script lang="ts" setup>
import { useServerStore } from '@/store';
import { Message, Modal } from '@arco-design/web-vue';
import axios from 'axios';
import ConnectServer from './connect-server.vue';

const serverStore = useServerStore();

const handleRestart = () => {
    Modal.warning({
        title: '重启确认',
        content: '确认重启幻兽帕鲁服务器？',
        okText: '没错',
        cancelText: '按错了！',
        hideCancel: false,
        onOk: async () => {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/manage/restart`,
            );
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
