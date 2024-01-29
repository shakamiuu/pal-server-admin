<template>
    <a-layout style="height: 100vh; width: 100vw">
        <a-layout-header>
            <a-row align="center" justify="space-between">
                <a-col :span="18">
                    <header-menu></header-menu>
                </a-col>
                <a-col :span="6" style="text-align: right; padding-right: 20px">
                    <header-button></header-button>
                </a-col>
            </a-row>
        </a-layout-header>
        <a-layout-content>
            <div class="container">
                <a-scrollbar
                    style="height: calc(100vh - 100px); overflow: auto"
                >
                    <router-view />
                </a-scrollbar>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts" setup>
import HeaderMenu from './components/header-menu.vue';
import HeaderButton from './components/header-button.vue';
</script>

<style lang="less" scoped>
.container {
    padding: 20px;
}
</style>
