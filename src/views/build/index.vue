<template>
    <div>
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
                    <save-restore :disabled="!serverStore.link"></save-restore>
                    <save-clear :disabled="!serverStore.link"></save-clear>
                </a-space>
            </a-space>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import ServerInstall from './components/server-install.vue';
import ServerUpdate from './components/server-update.vue';
import SaveBackup from './components/save-backup.vue';
import SaveRestore from './components/save-restore.vue';
import SaveClear from './components/save-clear.vue';
import { useServerStore } from '@/store';

const serverStore = useServerStore();
</script>

<style lang="less" scoped></style>
