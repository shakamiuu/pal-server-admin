<template>
    <a-menu
        mode="horizontal"
        theme="dark"
        :default-selected-keys="[$route.name]"
        @menu-item-click="handleMenuItemClick"
    >
        <a-menu-item key="Index">总览</a-menu-item>
        <a-menu-item key="Config">游戏设定</a-menu-item>
        <a-menu-item key="Instruct">GM指令</a-menu-item>
        <a-menu-item key="Plan">定时计划</a-menu-item>
        <a-menu-item key="Server">服务器维护</a-menu-item>
    </a-menu>
</template>

<script lang="ts" setup>
import router from '@/router';

const handleMenuItemClick = (key: string) => {
    router.push({ name: key });
};
</script>

<style lang="less" scoped></style>
