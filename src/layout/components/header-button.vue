<template>
    <a-space size="large">
        <a-tooltip content="重启服务器">
            <a-button shape="circle" status="danger">
                <icon-sync />
            </a-button>
        </a-tooltip>
        <a-tooltip content="退出登录">
            <a-button shape="circle" @click="handLogout">
                <icon-export />
            </a-button>
        </a-tooltip>
    </a-space>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

const appStore = useAppStore();

const handLogout = () => {
    appStore.logout();
};
</script>

<style lang="less" scoped></style>
