<template>
    <a-tooltip content="连接">
        <a-button shape="round" @click="handLink">
            <template #icon>
                <icon-link />
            </template>
            <template #default> 连接 </template>
        </a-button>
    </a-tooltip>
    <a-modal
        v-model:visible="visible"
        title="连接服务器"
        :mask-closable="false"
        :footer="false"
        unmount-on-close
        render-to-body
        simple
        @ok="handleSubmit"
    >
        <a-spin
            style="width: 100%"
            tip="正在连接服务器"
            :loading="appStore.loading"
            dot
        >
            <a-form
                style="width: 100%"
                :model="form"
                auto-label-width
                @submit-success="handleSubmit"
            >
                <a-form-item
                    field="host"
                    :rules="[{ required: true, message: '请输入公网IP地址' }]"
                    :validate-trigger="['change', 'input']"
                    hide-asterisk
                >
                    <a-auto-complete
                        v-model="form.host"
                        placeholder="服务器公网IP地址"
                        :data="hostOptions"
                        allow-clear
                        @select="handleHostSelect"
                    >
                    </a-auto-complete>
                    <a-input-number
                        v-model="form.port"
                        placeholder="端口"
                        style="width: 80px"
                        hide-button
                        @input="handlePortInput"
                    />
                </a-form-item>
                <a-form-item
                    field="username"
                    :rules="[
                        { required: true, message: '请输入登录服务器的用户名' },
                    ]"
                    :validate-trigger="['change', 'input']"
                    hide-asterisk
                >
                    <a-input v-model="form.username" placeholder="用户名" />
                </a-form-item>
                <a-form-item
                    field="password"
                    :rules="[
                        { required: true, message: '请输入登录服务器的密码' },
                    ]"
                    :validate-trigger="['change', 'input']"
                    hide-asterisk
                >
                    <a-input-password
                        v-model="form.password"
                        placeholder="密码"
                    />
                </a-form-item>
                <a-form-item>
                    <a-button html-type="submit" type="primary" long>
                        连接
                    </a-button>
                </a-form-item>
                <a-form-item>
                    <a-button long @click="handleCancel"> 取消 </a-button>
                </a-form-item>
            </a-form>
        </a-spin>
    </a-modal>
</template>

<script lang="ts" setup>
import { useAppStore, useServerStore } from '@/store';
import { SSHModel } from '@/store/modules/server';
import { computed, ref, onMounted } from 'vue';

const appStore = useAppStore();
const serverStore = useServerStore();

const visible = ref(false);

const handLink = () => {
    console.log('handLink');
    visible.value = true;
};

const form = ref<SSHModel>({
    host: '127.0.0.1',
    port: 22,
    username: 'root',
    password: '',
});

const hostOptions = computed(() => {
    const hosts = Object.keys(serverStore.servers);
    return hosts;
});

const handleHostSelect = (value: string) => {
    console.log('handleHostSelect', value);
    const server = serverStore.servers[value];
    if (server) {
        form.value = server;
    }
};

const handlePortInput = (value: number | undefined) => {
    console.log('handlePortInput', value);
    form.value.port = value || 22;
};

const handleSubmit = () => {
    console.log('handleSubmit');
    serverStore.connectServer(form.value);
};

const handleCancel = () => {
    console.log('handleCancel');
    visible.value = false;
};

onMounted(() => {
    if (hostOptions.value.length > 0) {
        form.value = serverStore.servers[hostOptions.value[0]];
    }
});
</script>

<style lang="less" scoped></style>
