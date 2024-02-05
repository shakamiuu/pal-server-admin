<template>
    <a-upload
        :action="`${baseUrl}/save/restore`"
        :limit="1"
        accept=".tar.gz"
        :disabled="disabled"
        :show-remove-button="false"
    >
        <template #upload-button>
            <a-button type="primary" :disabled="disabled">上传存档</a-button>
        </template>
    </a-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{ disabled: boolean }>();

const baseUrl = ref(import.meta.env.VITE_API_BASE_URL);
</script>

<style lang="less" scoped></style>
