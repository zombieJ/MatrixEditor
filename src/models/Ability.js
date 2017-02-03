import { TYPE_TEXT } from './Base';

const attrGroup = [
	{
		name: "Common",
		attrs: [
			{
				name: "BaseClass",
				type: TYPE_TEXT,
				options: [
					{value: "ability_datadriven"},		// TODO: Ability default type
					{value: "ability_lua"}		// TODO: Ability default type
				]
			},
		],
	},
	{
		name: "Events",
		attrs: [],
	},
];

export default {
	attrGroup,
};
