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
                        v-else-if="item.type == 'number'"
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.precision"
                        :step="item.step"
                        :min="item.step"
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
                        v-else-if="item.type == 'number'"
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.precision"
                        :step="item.step"
                        :min="item.step"
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
                        v-else-if="item.type == 'number'"
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.precision"
                        :step="item.step"
                        :min="item.step"
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
                        v-else-if="item.type == 'number'"
                        v-model="form[item.name]"
                        mode="button"
                        :precision="item.precision"
                        :step="item.step"
                        :min="item.step"
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
import {
    gameSetting,
    pvpSetting,
    serverSetting,
    otherSetting,
    defSetting,
} from './config';

const props = defineProps<{ modelValue: any }>();

const form = ref<any>({});

const setDef = () => {
    console.log('setDef');
    form.value = { ...defSetting };
};

defineExpose({ setDef });

watch(
    props.modelValue,
    (val) => {
        if (val) {
            form.value = val;
        }
    },
    { deep: true },
);
</script>

<style lang="less" scoped></style>
