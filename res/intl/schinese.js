module.exports = {
	__LOCALE__: '中文',
	Title: '矩阵编辑器 v2',

	Ability: '技能',
	Item: '物品',
	About: '关于',
	Common: '常规',
	Events: '事件',
	EmptyList: '列表为空',
	KVEmpty: 'KV为空',
	NONE: '无',
	DEFAULT: '默认',

	1: '是',
	0: '否',

	// Unit Attrs
	BaseClass: '基类',

	// Ability Attrs
	ability_datadriven: '数据驱动技能',
	ability_lua: '脚本技能',
	AbilityTextureName: '图标',
	ScriptFile: '脚本文件',
	AbilityBehavior: '技能行为',
	AbilityUnitTargetType: '目标类型',
	AbilityUnitTargetTeam: '目标队伍',
	AbilityUnitTargetFlags: '目标标签',
	AbilityUnitDamageType: '伤害类型',
	SpellImmunityType: '技能免疫',
	CastFilterRejectCaster: '对释放者无效',
	FightRecapLevel: '战斗回放等级',
	AbilityType: '技能类型',
	HotKeyOverride: '热键',
	MaxLevel: '最大等级',
	RequiredLevel: '需求等级',
	LevelsBetweenUpgrades: '升级间隔',
	AbilityCastPoint: '施法前摇',
	AbilityCastAnimation: '施法动作',
	AnimationPlaybackRate: '动画播放速率',
	AbilityCooldown: '冷却时间',
	AbilityManaCost: '魔法消耗',
	AbilityCastRange: '施法距离',
	AbilityCastRangeBuffer: '施法距离缓冲',
	AbilityChannelTime: '持续施法时间',
	AbilityChannelledManaCostPerSecond: '持续施法每秒耗魔',
	AOERadius: 'AOE范围',

	DOTA_ABILITY_BEHAVIOR_IMMEDIATE: '立即',
	DOTA_ABILITY_BEHAVIOR_HIDDEN: '隐藏',
	DOTA_ABILITY_BEHAVIOR_PASSIVE: '被动',
	DOTA_ABILITY_BEHAVIOR_NO_TARGET: '无目标',
	DOTA_ABILITY_BEHAVIOR_UNIT_TARGET: '目标',
	DOTA_ABILITY_BEHAVIOR_POINT: '点',
	DOTA_ABILITY_BEHAVIOR_AOE: '范围',
	DOTA_ABILITY_BEHAVIOR_CHANNELLED: '持续施法',
	DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE: '不可学习',
	DOTA_ABILITY_BEHAVIOR_ITEM: '物品？',
	DOTA_ABILITY_BEHAVIOR_TOGGLE: '开关',
	DOTA_ABILITY_BEHAVIOR_DIRECTIONAL: '方向',
	DOTA_ABILITY_BEHAVIOR_AUTOCAST: '自动施法',
	DOTA_ABILITY_BEHAVIOR_NOASSIST: '无辅助网格',
	DOTA_ABILITY_BEHAVIOR_AURA: '光环（无用）',
	DOTA_ABILITY_BEHAVIOR_ATTACK: '法球',
	DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT: '不恢复移动',
	DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES: '定身无法释放',
	DOTA_ABILITY_BEHAVIOR_UNRESTRICTED: '无视限制',
	DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE: '总有效-自动施法',
	DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL: '施法打断有效',
	DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_MOVEMENT: '不影响移动',
	DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET: '不惊醒目标',
	DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK: '不恢复攻击',
	DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN: '偷取保持前摇',
	DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING: '无视后摇',
	DOTA_ABILITY_BEHAVIOR_RUNE_TARGET: '神符目标',
	DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_CHANNEL: '不取消持续施法?',
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET: '可选单位目标?',
	DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET: '可选无目标?',

	DOTA_UNIT_TARGET_HERO: '英雄',
	DOTA_UNIT_TARGET_BASIC: '基本',
	DOTA_UNIT_TARGET_ALL: '所有',
	DOTA_UNIT_TARGET_BUILDING: '建筑',
	DOTA_UNIT_TARGET_COURIER: '信使',
	DOTA_UNIT_TARGET_CREEP: '野怪',
	DOTA_UNIT_TARGET_CUSTOM: '自定义',
	DOTA_UNIT_TARGET_MECHANICAL: '机械',
	DOTA_UNIT_TARGET_NONE: '无',
	DOTA_UNIT_TARGET_OTHER: '其他',
	DOTA_UNIT_TARGET_TREE: '树木',

	DOTA_UNIT_TARGET_TEAM_BOTH: '双方队伍',
	DOTA_UNIT_TARGET_TEAM_ENEMY: '敌方队伍',
	DOTA_UNIT_TARGET_TEAM_FRIENDLY: '友方队伍',
	DOTA_UNIT_TARGET_TEAM_CUSTOM: '自定义队伍',
	DOTA_UNIT_TARGET_TEAM_NONE: '无',

	DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP: "检测玩家'禁用帮助'选项",
	DOTA_UNIT_TARGET_FLAG_DEAD: '已死亡',
	DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE: '低可见?',
	DOTA_UNIT_TARGET_FLAG_INVULNERABLE: '无敌',
	DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES: '魔法免疫的敌人',
	DOTA_UNIT_TARGET_FLAG_MANA_ONLY: '只有魔法值的',
	DOTA_UNIT_TARGET_FLAG_MELEE_ONLY: '只近战的',
	DOTA_UNIT_TARGET_FLAG_NO_INVIS: '不是隐形的',
	DOTA_UNIT_TARGET_FLAG_NONE: '无',
	DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS: '非远古',
	DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE: '非攻击免疫',
	DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO: '非野怪英雄',
	DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED: '不可控制的',
	DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS: '非幻象',
	DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES: '非魔法免疫的盟友',
	DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED: '非被催眠的',
	DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED: '非召唤的',
	DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD: '被放逐出世界的',
	DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED: '玩家控制的',
	DOTA_UNIT_TARGET_FLAG_RANGED_ONLY: '只远程的',
	DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES: '更倾向敌人',

	DAMAGE_TYPE_MAGICAL: '魔法伤害',
	DAMAGE_TYPE_PHYSICAL: '物理伤害',
	DAMAGE_TYPE_PURE: '纯粹伤害',

	SPELL_IMMUNITY_NONE: '无',
	SPELL_IMMUNITY_ALLIES_YES: '可以用于技能免疫的友方',
	SPELL_IMMUNITY_ALLIES_NO: '不能用于技能免疫的友方',
	SPELL_IMMUNITY_ENEMIES_YES: '可以用于技能免疫的敌方',
	SPELL_IMMUNITY_ENEMIES_NO: '不能用于技能免疫的敌方',

	DOTA_ABILITY_TYPE_BASIC: '普通技能',
	DOTA_ABILITY_TYPE_ULTIMATE: '终极技能',
	DOTA_ABILITY_TYPE_ATTRIBUTES: '用于属性奖励',
	DOTA_ABILITY_TYPE_HIDDEN: '干啥的?',

	ACT_DOTA_ATTACK: '攻击',
	ACT_DOTA_CAST_ABILITY_1: '施法',
	ACT_DOTA_CHANNEL_ABILITY_1: '持续施法',
	ACT_DOTA_DISABLED: '伤残',
	ACT_DOTA_RUN: '奔跑',
	ACT_DOTA_SPAWN: '出生',
	ACT_DOTA_TELEPORT: '传送',
	ACT_DOTA_VICTORY: '胜利',

	// System
	OPS: '啊哦~',
	Open: '打开',
	OpenProject: '打开项目',
	openProject: '选择需要打开的项目目录...',
	projectNotExist: '项目不存在，请检查路径...',
	projectAbilityNotExist: '技能文件不存在，请检查...',
	projectAbilityNotMatch: '技能文件格式错误，请检查...',

	welcome: '欢迎使用矩阵编辑器v2版本，目前这个版本还在测试中。如果你有任何意见或者建议，以及发现BUG，欢迎提交到我的github地址：https://github.com/zombieJ/MatrixEditor/issues',
};
