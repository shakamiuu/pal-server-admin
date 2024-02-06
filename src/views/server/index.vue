<template>
    <a-row>
        <a-col :span="12">
            <a-space direction="vertical" size="large" fill>
                <a-card title="一键开服">
                    <a-space direction="vertical">
                        <a-space>
                            <server-install
                                :disabled="!serverStore.link"
                            ></server-install>
                            <server-update
                                :disabled="!serverStore.link"
                            ></server-update>
                        </a-space>
                    </a-space>
                </a-card>

                <a-card title="日常维护">
                    <a-space direction="vertical">
                        <a-space>
                            <save-backup
                                :disabled="!serverStore.link"
                            ></save-backup>
                            <save-clear
                                :disabled="!serverStore.link"
                            ></save-clear>
                            <save-restore
                                :disabled="!serverStore.link"
                            ></save-restore>
                        </a-space>
                    </a-space>
                </a-card>
            </a-space>
        </a-col>
        <a-col :span="12"> </a-col>
    </a-row>
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
