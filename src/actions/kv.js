export const KV_LOADED = 'KV_LOADED';
export const KV_TOGGLE = 'KV_TOGGLE';

export const loadKVList = (name, list) => ({
	type: KV_LOADED,
	name,
	list,
});

export const toggleKV = (name, id) => ({
	type: KV_TOGGLE,
	name,
	id,
});
