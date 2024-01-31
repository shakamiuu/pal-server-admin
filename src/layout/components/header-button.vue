<template>
    <a-space size="large">
        <a-tooltip content="重启服务器">
            <a-button shape="circle" status="danger" @click="handleRestart">
                <icon-sync />
            </a-button>
        </a-tooltip>
        <a-tooltip content="退出登录">
            <a-button shape="circle" @click="handLogout">
                <icon-export />
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { Message, Modal } from '@arco-design/web-vue';
import axios from 'axios';

const appStore = useAppStore();

const handleRestart = () => {
    Modal.warning({
        title: '重启确认',
        content: '确认重启幻兽帕鲁服务器？',
        okText: '没错',
        cancelText: '按错了！',
        hideCancel: false,
        onOk: async () => {
            await axios.post('/api/manage/restart');
            Message.success('重启成功');
        },
    });
};

const handLogout = () => {
    appStore.logout();
};
</script>

<style lang="less" scoped></style>
