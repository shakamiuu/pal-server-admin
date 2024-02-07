<template>
    <a-button
        type="primary"
        status="danger"
        :disabled="disabled"
        @click="handleClear"
    >
        删档
    </a-button>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { Message, Modal } from '@arco-design/web-vue';
import axios from 'axios';

defineProps<{ disabled: boolean }>();

const appStore = useAppStore();

const handleClear = () => {
    console.log('handleClear');
    Modal.warning({
        title: '删档确认',
        content:
            '本次操作将清除服务器当前存档数据！！！！！！！！！！！！请再次确认您的操作！！！',
        okText: '累了，毁灭吧！',
        cancelText: '还可以再抢救一下',
        hideCancel: false,
        onOk: async () => {
            appStore.loading = true;
            try {
                await axios.post('http://localhost:18181/save/clear');
                Message.success('删档完成');
            } finally {
                appStore.loading = false;
            }
        },
    });
};
</script>

<style lang="less" scoped></style>
