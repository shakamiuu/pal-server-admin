<template>
    <a-form
        :model="form"
        size="large"
        auto-label-width
        @submit-success="handleSubmit"
    >
        <a-form-item
            field="host"
            :rules="[{ required: true, message: '请输入公网IP地址' }]"
            :validate-trigger="['change', 'input']"
        >
            <a-input v-model="form.host" placeholder="服务器公网IP地址">
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
            <a-checkbox v-model="form.save">
                <span style="color: #fff"> 保存登录信息 </span>
            </a-checkbox>
        </a-form-item>
        <a-form-item>
            <a-button html-type="submit" type="primary" :loading="loading" long
                >连接</a-button
            >
        </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { AppState } from '@/store/modules/app';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';

const loading = ref<boolean>(false);
const appStore = useAppStore();

const form = ref<AppState['server']>({
    host: '127.0.0.1',
    port: 22,
    username: 'root',
    password: '',
    save: false,
});

const handleSubmit = async () => {
    loading.value = true;
    try {
        await appStore.login(form.value);
        Message.success('连接成功');
    } catch (error) {
        console.log(error);
        Message.error('连接失败');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    form.value = JSON.parse(JSON.stringify(appStore.server));
});
</script>

<style lang="less" scoped></style>
