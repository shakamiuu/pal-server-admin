<template>
    <a-space direction="vertical" fill>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="systemInfo.cpu / 100"
                :status="status(systemInfo.cpu / 100)"
                type="circle"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> CPU占用率 </a-typography-title>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="
                    Math.ceil(
                        (systemInfo.memory.usedMemory /
                            systemInfo.memory.totalMemory) *
                            100,
                    ) / 100 || 0
                "
                :status="
                    status(
                        Math.ceil(
                            (systemInfo.memory.usedMemory /
                                systemInfo.memory.totalMemory) *
                                100,
                        ) / 100 || 0,
                    )
                "
                type="circle"
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> 内存使用量 </a-typography-title>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
            <a-progress
                :percent="
                    Math.ceil(
                        (systemInfo.disk.usedDisk / systemInfo.disk.totalDisk) *
                            100,
                    ) / 100 || 0
                "
                :status="
                    status(
                        Math.ceil(
                            (systemInfo.disk.usedDisk /
                                systemInfo.disk.totalDisk) *
                                100,
                        ) / 100 || 0,
                    )
                "
                size="large"
                animation
            ></a-progress>
            <a-typography-title :heading="6"> 硬盘使用量 </a-typography-title>
        </div>
    </a-space>
</template>

<script lang="ts" setup>
import { useServerStore } from '@/store';
import { ref, onMounted, onUnmounted } from 'vue';

const serverStore = useServerStore();

const systemInfo = ref({
    cpu: 0,
    memory: {
        totalMemory: 0,
        usedMemory: 0,
    },
    disk: {
        totalDisk: 0,
        usedDisk: 0,
    },
});

const status = (percent: number) => {
    if (percent < 0.5) {
        return 'normal';
    } else if (percent < 1) {
        return 'warning';
    } else {
        return 'danger';
    }
};

onMounted(() => {});

onUnmounted(() => {});
</script>

<style lang="less" scoped></style>
