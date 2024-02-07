<template>
    <a-card title="本地自动化">
        <a-space direction="vertical" size="large" fill>
            <auto-free-memory></auto-free-memory>
            <auto-restart></auto-restart>
            <a-divider orientation="left">注意</a-divider>
            <a-typography-text type="secondary">
                本地自动化中的脚本需要开启本程序并连接上服务器之后才能执行
            </a-typography-text>
        </a-space>
    </a-card>
</template>

<script lang="ts" setup>
import AutoFreeMemory from './components/auto-free-memory.vue';
import AutoRestart from './components/auto-restart.vue';
</script>

<style lang="less" scoped></style>
