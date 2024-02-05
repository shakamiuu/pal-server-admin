<template>
    <a-layout style="height: 100vh; width: 100vw">
        <a-layout-header style="background-color: var(--color-menu-dark-bg)">
            <a-row align="center" justify="space-between">
                <a-col :span="12">
                    <header-menu></header-menu>
                </a-col>
                <a-col
                    :span="12"
                    style="text-align: right; padding-right: 20px"
                >
                    <header-button></header-button>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout class="bg">
            <a-layout-content>
                <div class="container">
                    <router-view />
                </div>
            </a-layout-content>
            <a-layout-sider>
                <server-status style="padding: 10px"></server-status>
            </a-layout-sider>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import HeaderMenu from './components/header-menu.vue';
import HeaderButton from './components/header-button.vue';
import ServerStatus from './components/server-status.vue';
</script>

<style lang="less" scoped>
.container {
    padding: 20px;
}
.bg {
    height: calc(100vh - 145px);
    background-image: url('@/assets/image/login_bg.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}
</style>
