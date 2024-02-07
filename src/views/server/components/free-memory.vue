<template>
    <a-button type="primary" :disabled="disabled" @click="handleFree">
        释放内存
    </a-button>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import axios from 'axios';

defineProps<{ disabled: boolean }>();

const appStore = useAppStore();

const handleFree = async () => {
    console.log('handleFree');
    appStore.loading = true;
    try {
        await axios.post('http://localhost:18181/manage/free');
        Message.success('释放完成，速度起飞！');
    } finally {
        appStore.loading = false;
    }
};
</script>

<style lang="less" scoped></style>
