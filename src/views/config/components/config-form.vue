<template>
    <a-form
        :model="form"
        :label-col-props="{ span: 8, offset: 2 }"
        :wrapper-col-props="{ span: 10 }"
    >
        <a-row>
            <a-col :span="12">
                <a-form-item label="难度" tooltip="难度">
                    <a-select v-model="form.Difficulty">
                        <a-option value="None">正常</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="白天流速" tooltip="白天流逝速度">
                    <a-input-number
                        v-model="form.DayTimeSpeedRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="夜间流速" tooltip="夜间流逝速度">
                    <a-input-number
                        v-model="form.NightTimeSpeedRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="经验倍率" tooltip="经验值倍率">
                    <a-input-number
                        v-model="form.ExpRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="帕鲁捕获" tooltip="帕鲁捕获概率倍率">
                    <a-input-number
                        v-model="form.PalCaptureRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="帕鲁出现" tooltip="帕鲁出现倍率">
                    <a-input-number
                        v-model="form.PalSpawnNumRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="帕鲁攻击" tooltip="帕鲁攻击伤害倍率">
                    <a-input-number
                        v-model="form.PalDamageRateAttack"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="帕鲁承伤" tooltip="帕鲁承受伤害倍率">
                    <a-input-number
                        v-model="form.PalDamageRateDefense"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="玩家攻击" tooltip="玩家攻击伤害倍率">
                    <a-input-number
                        v-model="form.PlayerDamageRateAttack"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="玩家承伤" tooltip="玩家承受伤害倍率">
                    <a-input-number
                        v-model="form.PlayerDamageRateDefense"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="玩家饱食度降低"
                    tooltip="玩家饱食度降低倍率"
                >
                    <a-input-number
                        v-model="form.PlayerStomachDecreaceRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="玩家耐力降低" tooltip="玩家耐力降低倍率">
                    <a-input-number
                        v-model="form.PlayerStaminaDecreaceRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="玩家自然回复"
                    tooltip="玩家生命值自然回复倍率"
                >
                    <a-input-number
                        v-model="form.PlayerAutoHPRegeneRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="玩家睡眠时回复"
                    tooltip="玩家睡眠时生命值回复倍率"
                >
                    <a-input-number
                        v-model="form.PlayerAutoHpRegeneRateInSleep"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="帕鲁饱食度降低"
                    tooltip="帕鲁饱食度降低倍率"
                >
                    <a-input-number
                        v-model="form.PalStomachDecreaceRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="帕鲁耐力降低" tooltip="帕鲁耐力降低倍率">
                    <a-input-number
                        v-model="form.PalStaminaDecreaceRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="帕鲁自然回复"
                    tooltip="帕鲁生命值自然回复倍率"
                >
                    <a-input-number
                        v-model="form.PalAutoHPRegeneRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="帕鲁睡眠时回复"
                    tooltip="帕鲁睡眠时生命值回复倍率"
                >
                    <a-input-number
                        v-model="form.PalAutoHpRegeneRateInSleep"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="对建筑伤害" tooltip="对建筑伤害倍率">
                    <a-input-number
                        v-model="form.BuildObjectDamageRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="建筑劣化速度"
                    tooltip="建筑物的劣化速度倍率"
                >
                    <a-input-number
                        v-model="form.BuildObjectDeteriorationDamageRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="道具采集" tooltip="道具采集倍率">
                    <a-input-number
                        v-model="form.CollectionDropRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="采集物生命值"
                    tooltip="可采集物品生命值倍率"
                >
                    <a-input-number
                        v-model="form.CollectionObjectHpRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="采集物刷新间隔"
                    tooltip="可采集物品刷新间隔"
                >
                    <a-input-number
                        v-model="form.CollectionObjectRespawnSpeedRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="道具掉落量" tooltip="道具掉落量倍率">
                    <a-input-number
                        v-model="form.EnemyDropItemRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item
                    label="孵蛋时间(时)"
                    tooltip="巨大蛋孵化所需时间(时)/其它蛋也会改变相应孵化时间"
                >
                    <a-input-number
                        v-model="form.PalEggDefaultHatchingTime"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="0.000001"
                    />
                </a-form-item>
                <a-form-item label="掉落物品数量" tooltip="掉落物品最大数量">
                    <a-input-number
                        v-model="form.DropItemMaxNum"
                        mode="button"
                        :precision="0"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item
                    label="UNKO 掉落物品数量"
                    tooltip="UNKO 掉落物品最大数量"
                >
                    <a-input-number
                        v-model="form.DropItemMaxNum_UNKO"
                        mode="button"
                        :precision="0"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item
                    label="掉落物品存在时间"
                    tooltip="掉落物品存活最大小时数"
                >
                    <a-input-number
                        v-model="form.DropItemAliveMaxHours"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item label="工作速度" tooltip="工作速度倍率">
                    <a-input-number
                        v-model="form.WorkSpeedRate"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item label="基地数量" tooltip="基地营地最大数量">
                    <a-input-number
                        v-model="form.BaseCampMaxNum"
                        mode="button"
                        :precision="0"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item label="工人数量" tooltip="基地工人最大数量">
                    <a-input-number
                        v-model="form.BaseCampWorkerMaxNum"
                        mode="button"
                        :precision="0"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
            </a-col>

            <a-col :span="12">
                <a-form-item label="死亡惩罚" tooltip="死亡惩罚">
                    <a-select v-model="form.DeathPenalty">
                        <a-option value="None"> 不掉落如何东西 </a-option>
                        <a-option value="Item"> 掉落装备以外的道具 </a-option>
                        <a-option value="ItemAndEquipment">
                            掉落所有道具
                        </a-option>
                        <a-option value="All">
                            掉落所有道具及队伍内帕鲁
                        </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="公会玩家数" tooltip="公会最大玩家人数">
                    <a-input-number
                        v-model="form.GuildPlayerMaxNum"
                        mode="button"
                        :precision="0"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item
                    label="服务器玩家数"
                    tooltip="可以加入服务器的最大人数"
                >
                    <a-input-number
                        v-model="form.ServerPlayerMaxNum"
                        mode="button"
                        :precision="0"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item label="服务器名称" tooltip="服务器名称">
                    <a-input v-model="form.ServerName" />
                </a-form-item>
                <a-form-item label="服务器描述" tooltip="服务器描述">
                    <a-input v-model="form.ServerDescription" />
                </a-form-item>
                <a-form-item label="管理员密码" tooltip="设置管理员密码">
                    <a-input-password v-model="form.AdminPassword" />
                </a-form-item>
                <a-form-item label="服务器密码" tooltip="设置服务器密码">
                    <a-input-password v-model="form.ServerPassword" />
                </a-form-item>
                <a-form-item label="公网 IP" tooltip="公网 IP">
                    <a-input v-model="form.PublicIP" />
                </a-form-item>
                <a-form-item label="开放端口" tooltip="开放端口">
                    <a-input-number
                        v-model="form.PublicPort"
                        :precision="0"
                        hide-button
                    />
                </a-form-item>
                <a-form-item label="启用 RCON" tooltip="启用 RCON">
                    <a-switch
                        v-model="form.RCONEnabled"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="RCON 端口号" tooltip="RCON 端口号">
                    <a-input-number
                        v-model="form.RCONPort"
                        :precision="0"
                        hide-button
                    />
                </a-form-item>
                <a-form-item label="PVP" tooltip="启用玩家对玩家伤害">
                    <a-switch
                        v-model="form.bEnablePlayerToPlayerDamage"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="友军伤害" tooltip="启用友军伤害">
                    <a-switch
                        v-model="form.bEnableFriendlyFire"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="入侵者敌人" tooltip="启用入侵者敌人">
                    <a-switch
                        v-model="form.bEnableInvaderEnemy"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="活跃 UNKO" tooltip="活跃 UNKO">
                    <a-switch
                        v-model="form.bActiveUNKO"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="手柄瞄准辅助" tooltip="启用手柄瞄准辅助">
                    <a-switch
                        v-model="form.bEnableAimAssistPad"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="键盘瞄准辅助" tooltip="启用键盘瞄准辅助">
                    <a-switch
                        v-model="form.bEnableAimAssistKeyboard"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item
                    label="自动重置公会"
                    tooltip="自动重置公会无在线玩家"
                >
                    <a-switch
                        v-model="form.bAutoResetGuildNoOnlinePlayers"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item
                    label="自动重置公会时间"
                    tooltip="无在线玩家时自动重置公会时间（小时）"
                >
                    <a-input-number
                        v-model="form.AutoResetGuildTimeNoOnlinePlayers"
                        mode="button"
                        :precision="6"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item label="多人游戏" tooltip="启用多人游戏">
                    <a-switch
                        v-model="form.bIsMultiplay"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="PvP" tooltip="启用 PvP">
                    <a-switch
                        v-model="form.bIsPvP"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item
                    label="拾取死亡掉落"
                    tooltip="可以拾取其他公会死亡惩罚物品"
                >
                    <a-switch
                        v-model="form.bCanPickupOtherGuildDeathPenaltyDrop"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="非登录惩罚" tooltip="启用非登录惩罚">
                    <a-switch
                        v-model="form.bEnableNonLoginPenalty"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="快速旅行" tooltip="启用快速旅行">
                    <a-switch
                        v-model="form.bEnableFastTravel"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item
                    label="选择起始位置"
                    tooltip="启用地图选择起始位置"
                >
                    <a-switch
                        v-model="form.bIsStartLocationSelectByMap"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="登出后存在玩家" tooltip="登出后存在玩家">
                    <a-switch
                        v-model="form.bExistPlayerAfterLogout"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item
                    label="防守其他公会玩家"
                    tooltip="启用防守其他公会玩家"
                >
                    <a-switch
                        v-model="form.bEnableDefenseOtherGuildPlayer"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="合作玩家数量" tooltip="合作玩家最大数量">
                    <a-input-number
                        v-model="form.CoopPlayerMaxNum"
                        mode="button"
                        :precision="0"
                        :step="1"
                        :min="1"
                    />
                </a-form-item>
                <a-form-item label="地区" tooltip="地区">
                    <a-input v-model="form.Region" />
                </a-form-item>
                <a-form-item label="身份验证" tooltip="启用身份验证">
                    <a-switch
                        v-model="form.bUseAuth"
                        checked-value="True"
                        unchecked-value="False"
                    />
                </a-form-item>
                <a-form-item label="封禁列表 URL" tooltip="封禁列表 URL">
                    <a-input v-model="form.BanListURL" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
    Difficulty: 'None',
    DayTimeSpeedRate: 1.0,
    NightTimeSpeedRate: 1.0,
    ExpRate: 1.0,
    PalCaptureRate: 1.0,
    PalSpawnNumRate: 1.0,
    PalDamageRateAttack: 1.0,
    PalDamageRateDefense: 1.0,
    PlayerDamageRateAttack: 1.0,
    PlayerDamageRateDefense: 1.0,
    PlayerStomachDecreaceRate: 1.0,
    PlayerStaminaDecreaceRate: 1.0,
    PlayerAutoHPRegeneRate: 1.0,
    PlayerAutoHpRegeneRateInSleep: 1.0,
    PalStomachDecreaceRate: 1.0,
    PalStaminaDecreaceRate: 1.0,
    PalAutoHPRegeneRate: 1.0,
    PalAutoHpRegeneRateInSleep: 1.0,
    BuildObjectDamageRate: 1.0,
    BuildObjectDeteriorationDamageRate: 1.0,
    CollectionDropRate: 1.0,
    CollectionObjectHpRate: 1.0,
    CollectionObjectRespawnSpeedRate: 1.0,
    EnemyDropItemRate: 1.0,
    DeathPenalty: 'All',
    bEnablePlayerToPlayerDamage: 'False',
    bEnableFriendlyFire: 'False',
    bEnableInvaderEnemy: 'True',
    bActiveUNKO: 'False',
    bEnableAimAssistPad: 'True',
    bEnableAimAssistKeyboard: 'False',
    DropItemMaxNum: 3000,
    DropItemMaxNum_UNKO: 15,
    BaseCampMaxNum: 128,
    BaseCampWorkerMaxNum: 100,
    DropItemAliveMaxHours: 1.0,
    bAutoResetGuildNoOnlinePlayers: 'False',
    AutoResetGuildTimeNoOnlinePlayers: 72.0,
    GuildPlayerMaxNum: 20,
    PalEggDefaultHatchingTime: 72.0,
    WorkSpeedRate: 1.0,
    bIsMultiplay: 'False',
    bIsPvP: 'False',
    bCanPickupOtherGuildDeathPenaltyDrop: 'False',
    bEnableNonLoginPenalty: 'True',
    bEnableFastTravel: 'True',
    bIsStartLocationSelectByMap: 'True',
    bExistPlayerAfterLogout: 'False',
    bEnableDefenseOtherGuildPlayer: 'False',
    CoopPlayerMaxNum: 4,
    ServerPlayerMaxNum: 32,
    ServerName: 'PalServer',
    ServerDescription: '',
    AdminPassword: '',
    ServerPassword: '',
    PublicPort: 8211,
    PublicIP: '',
    RCONEnabled: 'False',
    RCONPort: 25575,
    Region: '',
    bUseAuth: 'True',
    BanListURL: 'https://api.palworldgame.com/api/banlist.txt',
});
</script>

<style lang="less" scoped></style>
