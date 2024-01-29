# 幻兽帕鲁服务器管理

#### 介绍

正在开发中的一个幻兽帕鲁服务器控制程序
别急！新叶猿还在 KK 园区敲键盘

#### 暂定功能

|     | 服务器部署     | 功能                       |
| --- | -------------- | -------------------------- |
|     | 服务器状态监控 | 实时显示服务器运行状态     |
|     | 一键部署       | 一键部署游戏服务端         |
|     | 重启服务器     | 重启服务端释放内存         |
|     | 更新游戏       | 更新服务端游戏版本         |
|     | 定时任务       | 配置定时执行重新或更新任务 |
|     | 存档备份       | 将游戏存档保存到本地       |
|     | 存档恢复       | 本地存档恢复到服务器       |

|     | 游戏设定                             | 功能                                                                                                               |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
|     | Difficulty                           | 难度                                                                                                               |
|     | DayTimeSpeedRate                     | 白天流逝速度                                                                                                       |
|     | NightTimeSpeedRate                   | 夜间流逝速度                                                                                                       |
|     | ExpRate                              | 经验值倍率                                                                                                         |
|     | PalCaptureRate                       | 帕鲁捕获概率倍率                                                                                                   |
|     | PalSpawnNumRate                      | 帕鲁出现倍率                                                                                                       |
|     | PalDamageRateAttack                  | 帕鲁攻击伤害倍率                                                                                                   |
|     | PalDamageRateDefense                 | 帕鲁承受伤害倍率                                                                                                   |
|     | PlayerDamageRateAttack               | 玩家攻击伤害倍率                                                                                                   |
|     | PlayerDamageRateDefense              | 玩家承受伤害倍率                                                                                                   |
|     | PlayerStomachDecreaceRate            | 玩家饱食度降低倍率                                                                                                 |
|     | PlayerStaminaDecreaceRate            | 玩家耐力降低倍率                                                                                                   |
|     | PlayerAutoHPRegeneRate               | 玩家生命值自然回复倍率                                                                                             |
|     | PlayerAutoHpRegeneRateInSleep        | 玩家睡眠时生命值回复倍率                                                                                           |
|     | PalStomachDecreaceRate               | 帕鲁饱食度降低倍率                                                                                                 |
|     | PalStaminaDecreaceRate               | 帕鲁耐力降低倍率                                                                                                   |
|     | PalAutoHPRegeneRate                  | 帕鲁生命值自然回复倍率                                                                                             |
|     | PalAutoHpRegeneRateInSleep           | 帕鲁睡眠时生命值回复倍率                                                                                           |
|     | BuildObjectDamageRate                | 对建筑伤害倍率                                                                                                     |
|     | BuildObjectDeteriorationDamageRate   | 建筑物的劣化速度倍率                                                                                               |
|     | CollectionDropRate                   | 道具采集倍率                                                                                                       |
|     | CollectionObjectHpRate               | 可采集物品生命值倍率                                                                                               |
|     | CollectionObjectRespawnSpeedRate     | 可采集物品刷新间隔                                                                                                 |
|     | EnemyDropItemRate                    | 道具掉落量倍率                                                                                                     |
|     | DeathPenalty                         | 死亡惩罚 None=不掉落如何东西，Item=掉落装备以外的道具，ItemAndEquipment=掉落所有道具，All=掉落所有道具及队伍内帕鲁 |
|     | GuildPlayerMaxNum                    | 公会最大玩家人数                                                                                                   |
|     | PalEggDefaultHatchingTime            | 巨大蛋孵化所需时间(时)/其它蛋也会改变相应孵化时间                                                                  |
|     | ServerPlayerMaxNum                   | 可以加入服务器的最大人数                                                                                           |
|     | ServerName                           | 服务器名称                                                                                                         |
|     | ServerDescription                    | 服务器描述                                                                                                         |
|     | AdminPassword                        | 设置管理员密码                                                                                                     |
|     | ServerPassword                       | 设置服务器密码                                                                                                     |
|     | PublicPort                           | 开放端口                                                                                                           |
|     | PublicIP                             | 公网 IP                                                                                                            |
|     | RCONEnabled                          | 启用 RCON                                                                                                          |
|     | RCONPort                             | RCON 端口号                                                                                                        |
|     | bEnablePlayerToPlayerDamage          | 启用玩家对玩家伤害                                                                                                 |
|     | bEnableFriendlyFire                  | 启用友军伤害                                                                                                       |
|     | bEnableInvaderEnemy                  | 启用入侵者敌人                                                                                                     |
|     | bActiveUNKO                          | 活跃 UNKO                                                                                                          |
|     | bEnableAimAssistPad                  | 启用手柄瞄准辅助                                                                                                   |
|     | bEnableAimAssistKeyboard             | 启用键盘瞄准辅助                                                                                                   |
|     | DropItemMaxNum                       | 掉落物品最大数量                                                                                                   |
|     | DropItemMaxNum_UNKO                  | UNKO 掉落物品最大数量                                                                                              |
|     | BaseCampMaxNum                       | 基地营地最大数量                                                                                                   |
|     | BaseCampWorkerMaxNum                 | 基地工人最大数量                                                                                                   |
|     | DropItemAliveMaxHours                | 掉落物品存活最大小时数                                                                                             |
|     | bAutoResetGuildNoOnlinePlayers       | 自动重置公会无在线玩家                                                                                             |
|     | AutoResetGuildTimeNoOnlinePlayers    | 无在线玩家时自动重置公会时间（小时）                                                                               |
|     | WorkSpeedRate                        | 工作速度倍率                                                                                                       |
|     | bIsMultiplay                         | 启用多人游戏                                                                                                       |
|     | bIsPvP                               | 启用 PvP                                                                                                           |
|     | bCanPickupOtherGuildDeathPenaltyDrop | 可以拾取其他公会死亡惩罚物品                                                                                       |
|     | bEnableNonLoginPenalty               | 启用非登录惩罚                                                                                                     |
|     | bEnableFastTravel                    | 启用快速旅行                                                                                                       |
|     | bIsStartLocationSelectByMap          | 启用地图选择起始位置                                                                                               |
|     | bExistPlayerAfterLogout              | 登出后存在玩家                                                                                                     |
|     | bEnableDefenseOtherGuildPlayer       | 启用防守其他公会玩家                                                                                               |
|     | CoopPlayerMaxNum                     | 合作玩家最大数量                                                                                                   |
|     | Region                               | 地区                                                                                                               |
|     | bUseAuthL                            | 启用身份验证                                                                                                       |
|     | BanListURL                           | 封禁列表 URL                                                                                                       |

|     | GM 命令               | 功能                                    |
| --- | --------------------- | --------------------------------------- |
|     | /Shutdown {秒} {消息} | 服务器在秒数后关闭,将收到您的消息的通知 |
|     | /DoExit               | 强制停止服务器                          |
|     | /Broadcast {消息}     | 向服务器中的所有玩家发送消息            |
|     | /KickPlayer {SteamID} | 将玩家从服务器上踢出                    |
|     | /BanPlayer {SteamID}  | 从服务器封禁玩家                        |
|     | /ShowPlayers          | 显示所有已连接玩家的信息                |
|     | /Info                 | 显示服务器信息                          |
|     | /Save                 | 保存数据存档                            |

#### 安装教程

1. 安装依赖`yarn install`
2. 配置服务器 IP 端口
3. 运行程序`yarn dev`
4. 打包发布`yarn build`

#### 使用说明

还没开发好，不知道怎么写

#### 参与贡献

-   新叶猿
