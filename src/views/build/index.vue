<template>
    <a-row>
        <a-col :offset="5" :span="8">
            <a-card title="快捷操作">
                <a-space direction="vertical">
                    <a-space>
                        <a-button type="primary">一键安装</a-button>
                        <a-button type="primary">游戏更新</a-button>
                    </a-space>
                    <a-space>
                        <a-button type="primary">存档备份</a-button>
                        <a-button type="primary">存档恢复</a-button>
                    </a-space>
                </a-space>
            </a-card>
        </a-col>
        <a-col :offset="1" :span="4">
            <a-card>
                <status-progress :percent="server.cpu" title="CPU使用率" />
                <status-progress :percent="server.memory" title="内存占用率" />
            </a-card>
        </a-col>
    </a-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import StatusProgress from './components/status-progress.vue';

const server = ref({
    cpu: 0.5,
    memory: 0.8,
});
</script>

<style lang="less" scoped></style>
