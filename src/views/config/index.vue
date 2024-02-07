<template>
    <a-card>
        <template #title> 游戏设定 </template>
        <template #extra>
            <a-space>
                <a-button type="text" @click="handleView">
                    <template #icon>
                        <icon-edit />
                    </template>
                    编辑/查看
                </a-button>

                <a-tooltip content="还原默认设置">
                    <a-button
                        type="text"
                        status="warning"
                        @click="handleDefault"
                    >
                        <template #icon>
                            <icon-sync />
                        </template>
                        默认设置
                    </a-button>
                </a-tooltip>

                <a-tooltip content="保存到服务端">
                    <a-button
                        type="text"
                        status="success"
                        @click="handleSaveSetting()"
                    >
                        <template #icon>
                            <icon-upload />
                        </template>
                        保存
                    </a-button>
                </a-tooltip>
            </a-space>
        </template>
        <a-scrollbar style="height: calc(100vh - 206px); overflow: auto">
            <config-form ref="configRef" v-model="setting"></config-form>
        </a-scrollbar>
    </a-card>

    <a-modal
        v-model:visible="visible"
        ok-text="上传"
        :closable="false"
        simple
        @ok="handleEdit"
    >
        <a-textarea
            v-model="iniText"
            :auto-size="{ minRows: 5, maxRows: 10 }"
        />
    </a-modal>
</template>

<script lang="ts" setup>
import { Message, Modal } from '@arco-design/web-vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { defSetting } from './components/config';
import ConfigForm from './components/config-form.vue';
import { useServerStore } from '@/store';

const serverStore = useServerStore();
const visible = ref(false);
const iniText = ref('');
const configRef = ref();

const setting = ref<string>('');

const handleDefault = () => {
    setting.value = defSetting;
    console.log('handleDefault', setting.value);
};

const handleGetSetting = async () => {
    console.log('handleGetSetting');
    const { data } = await axios.post(
        'http://localhost:18181/setting/getPalWorldSettings',
    );
    if (!data) {
        Modal.warning({
            title: '配置未完全加载',
            content: '请稍后再试',
            okText: '收到',
        });
        return;
    }
    console.log('getPalWorldSettings', data);
    setting.value = data;
};

const handleSaveSetting = (text?: string) => {
    console.log('handleSaveSetting', setting.value);
    const ini = text ? text : configRef.value.generateIni();
    console.log(ini);
    Modal.warning({
        title: '确认提交？',
        content: '配置修改后需要重启服务器后生效，请稍后手动重启！',
        okText: '知道了！',
        cancelText: '还没改完',
        hideCancel: false,
        onOk: async () => {
            await axios.post(
                'http://localhost:18181/setting/setPalWorldSettings',
                { ini },
            );
            Message.success('保存成功！');
        },
    });
};

const handleView = () => {
    console.log('handleView', setting.value);
    visible.value = true;
    iniText.value = configRef.value.generateIni();
};

const handleEdit = () => {
    console.log('handleEdit', iniText.value);
    handleSaveSetting(iniText.value);
    setting.value = iniText.value;
};

onMounted(() => {
    if (serverStore.link) {
        handleGetSetting();
    } else {
        Modal.warning({
            title: '未连接服务器',
            content: '尚未连接服务器，无法获取配置信息！',
        });
    }
});
</script>

<style lang="less" scoped></style>
