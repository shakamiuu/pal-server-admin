<template>
    <div style="display: flex; flex-direction: column; align-items: center">
        <a-progress
            :percent="percent"
            :status="status(percent)"
            type="circle"
            size="large"
            animation
        ></a-progress>
        <a-typography-title :heading="5">
            {{ title }}
        </a-typography-title>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    percent: number;
    title: string;
}>();

const status = (percent: number) => {
    if (percent < 0.5) {
        return 'normal';
    } else if (percent < 1) {
        return 'warning';
    } else {
        return 'danger';
    }
};
</script>

<style lang="less" scoped></style>
