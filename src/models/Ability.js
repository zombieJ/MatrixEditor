import { TYPE_TEXT, TYPE_MULTI } from './Base';

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
