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
        <a-scrollbar style="height: calc(100vh - 180px); overflow: auto">
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
import {
    defSetting,
    gameSetting,
    otherSetting,
    pvpSetting,
    serverSetting,
} from './components/config';
import ConfigForm from './components/config-form.vue';

const visible = ref(false);
const iniText = ref('');
const configRef = ref();
const settings = [
    ...gameSetting,
    ...pvpSetting,
    ...serverSetting,
    ...otherSetting,
];
const tableData = ref<any[]>([]);

const setting = ref<any>({});

const handleDefault = () => {
    setting.value = { ...defSetting };
    configRef.value.setDef();
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
    tableData.value = [];
    console.log('getPalWorldSettings', data);
    // 使用 "(" 分割字符串
    let list = data.split('(');
    let temp = list[1];
    // 使用 ")" 分割字符串
    list = temp.split(')');
    // 解析defaultConfig,逗号分割，等于号区分
    list = list[0].split(',');
    for (let i = 0; i < list.length; i++) {
        const item = list[i].split('=');
        const key = item[0].trim();
        const value = item[1].replace(/"/g, '');
        tableData.value.push({
            key,
            value,
        });
        const config = settings.find((s) => s.name === key);

        if (!config) {
            continue;
        }
        // 排除IP地址
        setting.value[key] =
            config.type == 'integer' || config.type == 'number'
                ? toNumber(value)
                : value;
    }
};

const handleSaveSetting = (text?: string) => {
    console.log('handleSaveSetting', setting.value);
    const ini = text ? text : generateIni();
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
    iniText.value = generateIni();
};

const handleEdit = () => {
    console.log('handleEdit', iniText.value);
    handleSaveSetting(iniText.value);
};

const generateIni = () => {
    let header = `[/Script/Pal.PalGameWorldSettings]
OptionSettings=(`;
    let footer = `)`;
    let tmp = '';
    // 按照config的顺序生成ini
    for (let i = 0; i < tableData.value.length; i++) {
        const item = tableData.value[i];
        const config = settings.find((s) => s.name === item.key);
        if (!config) {
            continue;
        }
        switch (config?.type) {
            case 'number':
                tmp += `${item.key}=${toFixedSix(setting.value[item.key])},`;
                break;
            case 'input':
                tmp += `${item.key}="${toFixedSix(setting.value[item.key])}",`;
                break;
            case 'integer':
            case 'select':
            case 'switch':
            default:
                tmp += `${item.key}=${setting.value[item.key]},`;
                break;
        }
    }
    tmp = tmp.slice(0, -1);
    // 去除换行符
    tmp =
        header +
        tmp +
        footer.replace(/\n/g, '').replace(/\r/g, '').replace(/\t/g, '');
    return tmp;
};

const toNumber = (str: string) => {
    const num = parseFloat(str);
    return isNaN(num) ? str : num;
};

const toFixedSix = (value: string | number) => {
    // 首先检查value是否确实是一个数字
    if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
        // 使用toFixed方法保留6位小数，并将其转换为字符串
        return value.toFixed(6);
    } else {
        return value;
    }
};

onMounted(() => {
    handleGetSetting();
});
</script>

<style lang="less" scoped></style>
