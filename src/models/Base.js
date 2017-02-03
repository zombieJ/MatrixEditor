export const TYPE_TEXT = 'TYPE_TEXT';
export const TYPE_MULTI = 'TYPE_MULTI';
export const TYPE_SINGLE = 'TYPE_SINGLE';
export const TYPE_BOOL = 'TYPE_BOOL';

export const targetTeam = [
	{ value: 'DOTA_UNIT_TARGET_TEAM_BOTH', recommend: true },
	{ value: 'DOTA_UNIT_TARGET_TEAM_ENEMY', recommend: true },
	{ value: 'DOTA_UNIT_TARGET_TEAM_FRIENDLY', recommend: true },
	{ value: 'DOTA_UNIT_TARGET_TEAM_CUSTOM' },
	{ value: 'DOTA_UNIT_TARGET_TEAM_NONE' },
];

export const targetType = [
	{ value: 'DOTA_UNIT_TARGET_HERO', recommend: true },
	{ value: 'DOTA_UNIT_TARGET_BASIC', recommend: true },
	{ value: 'DOTA_UNIT_TARGET_ALL' },
	{ value: 'DOTA_UNIT_TARGET_BUILDING' },
	{ value: 'DOTA_UNIT_TARGET_COURIER' },
	{ value: 'DOTA_UNIT_TARGET_CREEP' },
	{ value: 'DOTA_UNIT_TARGET_CUSTOM' },
	{ value: 'DOTA_UNIT_TARGET_MECHANICAL', deprecated: true },
	{ value: 'DOTA_UNIT_TARGET_NONE' },
	{ value: 'DOTA_UNIT_TARGET_OTHER' },
	{ value: 'DOTA_UNIT_TARGET_TREE' },
];

export const targetFlags = [
	{ value: 'DOTA_UNIT_TARGET_FLAG_CHECK_DISABLE_HELP' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_DEAD', deprecated: true },
	{ value: 'DOTA_UNIT_TARGET_FLAG_FOW_VISIBLE' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_INVULNERABLE' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_MANA_ONLY' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_MELEE_ONLY' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NO_INVIS', deprecated: true },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NONE', deprecated: true },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_ANCIENTS' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_ATTACK_IMMUNE' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_CREEP_HERO' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_DOMINATED' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_ILLUSIONS' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_MAGIC_IMMUNE_ALLIES' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_NIGHTMARED' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_NOT_SUMMONED' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_OUT_OF_WORLD' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_PLAYER_CONTROLLED' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_RANGED_ONLY' },
	{ value: 'DOTA_UNIT_TARGET_FLAG_PREFER_ENEMIES' },
];
