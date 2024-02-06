<template>
    <a-form
        :model="form"
        :label-col-props="{ span: 8, offset: 2 }"
        :wrapper-col-props="{ span: 10 }"
    >
        <a-row>
            <a-col :span="12">
                <a-typography-title :heading="6"> 玩法设定 </a-typography-title>
                <a-form-item
                    v-for="(item, index) in gameSetting"
                    :key="index"
                    :label="item.label"
                    :tooltip="item.tip"
                >
                    <a-select
                        v-if="item.type == 'select'"
                        v-model="form[item.name]"
                    >
                        <a-option
                            v-for="(e, i) in item.options"
                            :key="i"
                            :value="e.value"
                        >
                            {{ e.label }}
                        </a-option>
                    </a-select>
                    <a-input-number
                        v-else-if="
                            item.type == 'number' || item.type == 'integer'
                        "
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.type == 'integer' ? 0 : 2"
                        :step="1"
                        :min="0"
                    />
                    <a-switch
                        v-else-if="item.type == 'switch'"
                        v-model="form[item.name]"
                        checked-value="True"
                        unchecked-value="False"
                    />
                    <a-input v-else v-model="form[item.name]" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-typography-title :heading="6">
                    服务器设定
                </a-typography-title>
                <a-form-item
                    v-for="(item, index) in serverSetting"
                    :key="index"
                    :label="item.label"
                    :tooltip="item.tip"
                >
                    <a-select
                        v-if="item.type == 'select'"
                        v-model="form[item.name]"
                    >
                        <a-option
                            v-for="(e, i) in item.options"
                            :key="i"
                            :value="e.value"
                        >
                            {{ e.label }}
                        </a-option>
                    </a-select>
                    <a-input-number
                        v-else-if="
                            item.type == 'number' || item.type == 'integer'
                        "
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.type == 'integer' ? 0 : 2"
                        :step="1"
                        :min="0"
                    />
                    <a-switch
                        v-else-if="item.type == 'switch'"
                        v-model="form[item.name]"
                        checked-value="True"
                        unchecked-value="False"
                    />
                    <a-input v-else v-model="form[item.name]" />
                </a-form-item>

                <a-typography-title :heading="6"> PVP设定 </a-typography-title>
                <a-form-item
                    v-for="(item, index) in pvpSetting"
                    :key="index"
                    :label="item.label"
                    :tooltip="item.tip"
                >
                    <a-select
                        v-if="item.type == 'select'"
                        v-model="form[item.name]"
                    >
                        <a-option
                            v-for="(e, i) in item.options"
                            :key="i"
                            :value="e.value"
                        >
                            {{ e.label }}
                        </a-option>
                    </a-select>
                    <a-input-number
                        v-else-if="
                            item.type == 'number' || item.type == 'integer'
                        "
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.type == 'integer' ? 0 : 2"
                        :step="1"
                        :min="0"
                    />
                    <a-switch
                        v-else-if="item.type == 'switch'"
                        v-model="form[item.name]"
                        checked-value="True"
                        unchecked-value="False"
                    />
                    <a-input v-else v-model="form[item.name]" />
                </a-form-item>

                <a-typography-title :heading="6"> 其他设定 </a-typography-title>
                <a-form-item
                    v-for="(item, index) in otherSetting"
                    :key="index"
                    :label="item.label"
                    :tooltip="item.tip"
                >
                    <a-select
                        v-if="item.type == 'select'"
                        v-model="form[item.name]"
                    >
                        <a-option
                            v-for="(e, i) in item.options"
                            :key="i"
                            :value="e.value"
                        >
                            {{ e.label }}
                        </a-option>
                    </a-select>
                    <a-input-number
                        v-else-if="
                            item.type == 'number' || item.type == 'integer'
                        "
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.type == 'integer' ? 0 : 2"
                        :step="1"
                        :min="0"
                    />
                    <a-switch
                        v-else-if="item.type == 'switch'"
                        v-model="form[item.name]"
                        checked-value="True"
                        unchecked-value="False"
                    />
                    <a-input v-else v-model="form[item.name]" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { gameSetting, pvpSetting, serverSetting, otherSetting } from './config';

const props = defineProps<{ modelValue: string }>();

const form = ref<any>({});
const tableData = ref<any[]>([]);

const settings = [
    ...gameSetting,
    ...pvpSetting,
    ...serverSetting,
    ...otherSetting,
];

const formInit = (iniText: string) => {
    console.log('formInit', iniText);
    tableData.value = [];
    // 使用 "(" 分割字符串
    let list = iniText.split('(');
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
        form.value[key] =
            config.type == 'integer' || config.type == 'number'
                ? toNumber(value)
                : value;
    }
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
                tmp += `${item.key}=${toFixedSix(form.value[item.key])},`;
                break;
            case 'input':
                tmp += `${item.key}="${toFixedSix(form.value[item.key])}",`;
                break;
            case 'integer':
            case 'select':
            case 'switch':
            default:
                tmp += `${item.key}=${form.value[item.key]},`;
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

const toFixedSix = (value: string | number) => {
    // 首先检查value是否确实是一个数字
    if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
        // 使用toFixed方法保留6位小数，并将其转换为字符串
        return value.toFixed(6);
    } else {
        return value;
    }
};

const toNumber = (str: string) => {
    const num = parseFloat(str);
    return isNaN(num) ? str : num;
};

defineExpose({ generateIni });

watch(
    () => props.modelValue,
    (val) => {
        console.log('watch', val);
        if (val) {
            formInit(val);
        }
    },
    { deep: true },
);
</script>

<style lang="less" scoped></style>
