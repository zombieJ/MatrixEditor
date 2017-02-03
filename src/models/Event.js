export const eventList = [
	{ value: 'OnSpellStart' },

	{ value: 'OnAbilityStart' },
	{ value: 'OnAbilityExecuted' },
	{ value: 'OnAbilityEndChannel' },
	{ value: 'OnAbilityPhaseStart' },

	{ value: 'OnAttack' },
	{ value: 'OnAttacked' },
	{ value: 'OnAttackAllied' },
	{ value: 'OnAttackFailed' },
	{ value: 'OnAttackFinished' },
	{ value: 'OnAttackStart' },
	{ value: 'OnChannelFinish' },
	{ value: 'OnChannelInterrupted' },
	{ value: 'OnChannelSucceeded' },
	{ value: 'OnEquip' },
	{ value: 'OnUnequip' },
	{ value: 'OnHealReceived' },
	{ value: 'OnHealthGained' },
	{ value: 'OnHeroKilled' },
	{ value: 'OnKill' },
	{ value: 'OnManaGained' },
	{ value: 'OnOrder' },
	{ value: 'OnOwnerDied' },
	{ value: 'OnOwnerSpawned' },
	{ value: 'OnProjectileDodge' },
	{ value: 'OnProjectileFinish' },
	{ value: 'OnProjectileHitUnit' },
	{ value: 'OnRespawn' },
	{ value: 'OnSpentMana' },
	{ value: 'OnStateChanged' },
	{ value: 'OnTeleported' },
	{ value: 'OnTeleporting' },
	{ value: 'OnToggleOff' },
	{ value: 'OnToggleOn' },
	{ value: 'OnUnitMoved' },
	{ value: 'OnUpgrade' },
];

const events = {};
eventList.forEach(({ value }) => {
	events[value.toUpperCase()] = value;
});

export const getEventList = kv => (
	kv.value.map((subKV, index) => {
		const key = subKV.key.toUpperCase();
		if (events[key]) return index;
		return -1;
	}).filter(index => index !== -1)
);
