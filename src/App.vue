<template>
    <a-spin :loading="appStore.loading" dot>
        <router-view />
    </a-spin>
</template>

<script lang="ts" setup>
import { useAppStore } from './store';

const appStore = useAppStore();
</script>

<style lang="less" scoped></style>
