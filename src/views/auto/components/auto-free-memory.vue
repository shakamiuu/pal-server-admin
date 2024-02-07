<template>
    <a-space size="large">
        <a-switch v-model="autoStore.autoFree.enabled">
            <template #checked> ON </template>
            <template #unchecked> OFF </template>
        </a-switch>
        <a-typography-text bold> 自动释放内存 </a-typography-text>
        <a-typography-text type="secondary">
            说明： 开启后，当内存使用率超过80%时，自动释放内存
        </a-typography-text>
    </a-space>
</template>

<script lang="ts" setup>
import { useAutoStore } from '@/store';

const autoStore = useAutoStore();
</script>

<style lang="less" scoped></style>
