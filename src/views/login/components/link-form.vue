<template>
    <a-form
        :model="form"
        size="large"
        auto-label-width
        @submit-success="handleSubmit"
    >
        <a-form-item
            field="ip"
            :rules="[{ required: true, message: '请输入公网IP地址' }]"
            :validate-trigger="['change', 'input']"
        >
            <a-input v-model="form.ip" placeholder="服务器公网IP地址">
                <template #append>
                    <a-input-number
                        v-model="form.port"
                        placeholder="端口"
                        style="width: 70px"
                        hide-button
                    />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item
            field="username"
            :rules="[{ required: true, message: '请输入登录服务器的用户名' }]"
            :validate-trigger="['change', 'input']"
        >
            <a-input v-model="form.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item
            field="password"
            :rules="[{ required: true, message: '请输入登录服务器的密码' }]"
            :validate-trigger="['change', 'input']"
        >
            <a-input-password v-model="form.password" placeholder="密码" />
        </a-form-item>
        <a-form-item>
            <a-button html-type="submit" type="primary" :loading="loading" long
                >连接</a-button
            >
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useAppStore } from '@/store';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';

const loading = ref<boolean>(false);
const appStore = useAppStore();

const form = ref({
    ip: '',
    port: 22,
    username: 'root',
    password: '',
});

const handleSubmit = () => {
    loading.value = true;
    // TODO 请求链接服务器

    setTimeout(() => {
        loading.value = false;
        Message.success('连接成功');
        appStore.setServer(form.value);
        appStore.setLink(true);
        router.push('/');
    }, 3000);
};

onMounted(() => {
    form.value = appStore.server;
});
</script>

<style lang="less" scoped></style>
