<template>
    <a-spin :loading="appStore.loading" dot>
        <router-view />
    </a-spin>
    <a-modal
        v-model:visible="visible"
        ok-text="前往下载"
        :mask-closable="false"
        :closable="false"
        unmount-on-close
        simple
        @ok="handleOk"
    >
        <template #title> 发现新版本 </template>
        <div>新版本已发布，赶紧去看看吧！</div>
    </a-modal>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { onMounted, ref } from 'vue';

const appStore = useAppStore();
const visible = ref(false);

window.ipcRenderer.on('update-available', (_event: any, message: any) => {
    // 发现新版本
    console.log(message);
    visible.value = true;
});

const handleOk = () => {
    console.log('handleOk');
    window.open('https://gitee.com/haibiaoG/pal-server-admin', '_blank');
};

onMounted(() => {
    window.ipcRenderer.invoke('check-update');
});
</script>

<style lang="less" scoped></style>
