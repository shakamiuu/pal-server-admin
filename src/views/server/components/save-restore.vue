<template>
    <a-upload
        action="http://localhost:18181/save/restore"
        :limit="1"
        accept=".tar.gz"
        :disabled="disabled"
        :show-remove-button="false"
    >
        <template #upload-button>
            <a-button type="primary" status="warning" :disabled="disabled">
                存档恢复
            </a-button>
        </template>
    </a-upload>
</template>

<script lang="ts" setup>
defineProps<{ disabled: boolean }>();
</script>

<style lang="less" scoped></style>
