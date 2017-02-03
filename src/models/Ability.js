import {
	TYPE_TEXT, TYPE_MULTI, TYPE_SINGLE, TYPE_BOOL,
	targetType, targetTeam, targetFlags,
} from './Base';

const attrGroup = [
	{
		name: 'Common',
		attrs: [
			{
				name: 'BaseClass',
				type: TYPE_TEXT,
				options: [
					{ value: 'ability_datadriven' },		// TODO: Ability default type
					{ value: 'ability_lua' },		// TODO: Ability default type
				],
			},
			{ name: 'AbilityTextureName' },
			{ name: 'ScriptFile', showFunc: kv => ((kv.get('BaseClass', false, '').toLowerCase()) === 'ability_lua') },
			{
				name: 'AbilityBehavior',
				type: TYPE_MULTI,
				abbrFunc: value => value.replace(/DOTA_ABILITY_BEHAVIOR_/, ''),
				divider: true,
				options: [
					{ value: 'DOTA_ABILITY_BEHAVIOR_IMMEDIATE', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_HIDDEN', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_PASSIVE', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_NO_TARGET', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_UNIT_TARGET', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_POINT', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_AOE', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_CHANNELLED', recommend: true },
					{ value: 'DOTA_ABILITY_BEHAVIOR_NOT_LEARNABLE' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_ITEM' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_TOGGLE' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_DIRECTIONAL' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_AUTOCAST' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_NOASSIST' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_AURA' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_ATTACK' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_DONT_RESUME_MOVEMENT' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_ROOT_DISABLES' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_UNRESTRICTED' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_MOVEMENT' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_DONT_ALERT_TARGET' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_DONT_RESUME_ATTACK' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_RUNE_TARGET' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_DONT_CANCEL_CHANNEL' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_OPTIONAL_UNIT_TARGET' },
					{ value: 'DOTA_ABILITY_BEHAVIOR_OPTIONAL_NO_TARGET' },
				],
			},

			{
				name: 'AbilityUnitTargetType',
				type: TYPE_MULTI,
				abbrFunc: value => value.replace(/DOTA_UNIT_TARGET_/, ''),
				options: targetType,
			},

			{
				name: 'AbilityUnitTargetTeam',
				type: TYPE_SINGLE,
				abbrFunc: value => value.replace(/DOTA_UNIT_TARGET_TEAM_/, ''),
				options: targetTeam,
			},
			{
				name: 'AbilityUnitTargetFlags',
				type: TYPE_MULTI,
				abbrFunc: value => value.replace(/DOTA_UNIT_TARGET_FLAG_/, ''),
				options: targetFlags,
				divider: true,
			},
			{
				name: 'AbilityUnitDamageType',
				type: TYPE_SINGLE,
				abbrFunc: value => value.replace(/DAMAGE_TYPE_/, ''),
				options: [
					{ value: 'DAMAGE_TYPE_MAGICAL', recommend: true },
					{ value: 'DAMAGE_TYPE_PHYSICAL', recommend: true },
					{ value: 'DAMAGE_TYPE_PURE', recommend: true },
				],
			},
			{
				name: 'SpellImmunityType',
				type: TYPE_SINGLE,
				abbrFunc: value => value.replace(/SPELL_IMMUNITY_/, ''),
				options: [
					{ value: 'SPELL_IMMUNITY_NONE', recommend: true },
					{ value: 'SPELL_IMMUNITY_ALLIES_YES' },
					{ value: 'SPELL_IMMUNITY_ALLIES_NO' },
					{ value: 'SPELL_IMMUNITY_ENEMIES_YES' },
					{ value: 'SPELL_IMMUNITY_ENEMIES_NO' },
				],
			},
			{ name: 'CastFilterRejectCaster', type: TYPE_BOOL },
			{ name: 'FightRecapLevel', divider: true },

			{
				name: 'AbilityType',
				type: TYPE_SINGLE,
				abbrFunc: value => value.replace(/DOTA_ABILITY_TYPE_/, ''),
				options: [
					{ value: 'DOTA_ABILITY_TYPE_BASIC', recommend: true },
					{ value: 'DOTA_ABILITY_TYPE_ULTIMATE' },
					{ value: 'DOTA_ABILITY_TYPE_ATTRIBUTES' },
					{ value: 'DOTA_ABILITY_TYPE_HIDDEN' },
				],
			},
			{ name: 'HotKeyOverride' },
			{ name: 'MaxLevel' },
			{ name: 'RequiredLevel' },
			{ name: 'LevelsBetweenUpgrades', divider: true },

			{ name: 'AbilityCastPoint' },
			{
				name: 'AbilityCastAnimation',
				options: [
					{ value: 'ACT_DOTA_ATTACK', recommend: true },
					{ value: 'ACT_DOTA_CAST_ABILITY_1', recommend: true },
					{ value: 'ACT_DOTA_CHANNEL_ABILITY_1' },
					{ value: 'ACT_DOTA_DISABLED' },
					{ value: 'ACT_DOTA_RUN' },
					{ value: 'ACT_DOTA_SPAWN' },
					{ value: 'ACT_DOTA_TELEPORT' },
					{ value: 'ACT_DOTA_VICTORY' },
				],
			},
			{ name: 'AnimationPlaybackRate', divider: true },
		],
	},
	{
		name: 'Events',
		attrs: [],
	},
];

export default {
	attrGroup,
};
