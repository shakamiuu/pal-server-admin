<template>
    <a-button type="primary" :disabled="disabled" @click="handleBackup">
        存档备份
    </a-button>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { Modal } from '@arco-design/web-vue';
import axios from 'axios';

defineProps<{ disabled: boolean }>();

const appStore = useAppStore();

const handleBackup = () => {
    console.log('handleBackup');
    Modal.warning({
        title: '备份提醒',
        content: '存档备份时将关闭服务器，请在下载完存档后手动开启！',
        okText: '明白！',
        cancelText: '等等',
        hideCancel: false,
        onOk: async () => {
            appStore.setLoading(true);
            try {
                await axios({
                    url: `${import.meta.env.VITE_API_BASE_URL}/save/backup`,
                    method: 'post',
                    responseType: 'blob',
                }).then((res) => {
                    let blob = new Blob([res.data], {
                        type: res.headers['content-type'],
                    });
                    // 创建新的URL并指向File对象或者Blob对象的地址
                    const blobURL = window.URL.createObjectURL(blob);
                    // 创建a标签，用于跳转至下载链接
                    const tempLink = document.createElement('a');
                    tempLink.style.display = 'none';
                    tempLink.href = blobURL;
                    const contentDisposition =
                        res.headers['content-disposition'] ||
                        `attachment;filename=幻兽帕鲁存档备份.tar.gz`;
                    tempLink.setAttribute(
                        'download',
                        decodeURI(
                            contentDisposition.split(';')[1].split('=')[1],
                        ),
                    );
                    // 兼容：某些浏览器不支持HTML5的download属性
                    if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank');
                    }
                    // 挂载a标签
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    // 释放blob URL地址
                    window.URL.revokeObjectURL(blobURL);
                });
            } finally {
                appStore.setLoading(false);
            }
        },
    });
};
</script>

<style lang="less" scoped></style>
