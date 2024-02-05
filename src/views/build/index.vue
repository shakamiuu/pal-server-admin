<template>
    <a-space direction="vertical" fill>
        <a-card title="快捷操作">
            <a-space direction="vertical">
                <a-space>
                    <server-install
                        :disabled="!serverStore.link"
                    ></server-install>
                    <server-update
                        :disabled="!serverStore.link"
                    ></server-update>
                    <save-backup :disabled="!serverStore.link"></save-backup>
                    <save-clear :disabled="!serverStore.link"></save-clear>
                    <save-restore :disabled="!serverStore.link"></save-restore>
                </a-space>
            </a-space>
        </a-card>
        <a-card class="foot">
            推广链接:
            <a-link
                icon
                @click="
                    handleOpen(
                        'https://www.aliyun.com/minisite/goods?userCode=xcsj1c25',
                    )
                "
            >
                阿里云幻兽帕鲁专用服务器
            </a-link>
        </a-card>
    </a-space>
</template>

<script lang="ts" setup>
import ServerInstall from './components/server-install.vue';
import ServerUpdate from './components/server-update.vue';
import SaveBackup from './components/save-backup.vue';
import SaveRestore from './components/save-restore.vue';
import SaveClear from './components/save-clear.vue';
import { useServerStore } from '@/store';

const serverStore = useServerStore();

const handleOpen = (url: string) => {
    window.open(url, '_blank');
};
</script>

<style lang="less" scoped>
.foot {
    bottom: 0;
}
</style>
