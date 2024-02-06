<template>
    <template v-for="(e, i) in links" :key="i">
        <a-alert v-if="i == currIndex" :type="e.type" style="padding: 0">
            {{ e.title }}
            <a-link icon @click="handleOpen(e.url)">
                <span v-html="e.text"></span>
            </a-link>
        </a-alert>
    </template>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';

// eslint-disable-next-line no-undef
let intervalId: NodeJS.Timeout | undefined;

const links = ref<
    {
        type: 'info' | 'normal' | 'error' | 'success' | 'warning' | undefined;
        url: string;
        title: string;
        text: string;
    }[]
>([
    {
        type: 'info',
        title: '开服交流群：264059400，项目开源地址：',
        url: 'https://gitee.com/haibiaoG/pal-server-admin',
        text: 'https://gitee.com/haibiaoG/pal-server-admin',
    },
]);

const handleOpen = (url?: string) => {
    window.open(url, '_blank');
};

const currIndex = ref(0);

const start = () => {
    if (currIndex.value < links.value.length - 1) {
        currIndex.value++;
    } else {
        currIndex.value = 0;
    }
};

onMounted(async () => {
    let link = [];
    try {
        const { data } = await axios.post('http://localhost:18181/ad/get');
        link = data;
    } catch (error) {
        console.log(error);
    }
    console.log('links', link);
    links.value = [...links.value, ...link];
    if (links.value.length > 1) {
        intervalId = setInterval(() => {
            start();
        }, 10000);
    }
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<style lang="less" scoped></style>
