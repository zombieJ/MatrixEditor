import { capitalize } from '../utils/stringUtil';

export const KV_LOADED = 'KV_LOADED';
export const KV_TOGGLE = 'KV_TOGGLE';
export const KV_MOVE = 'KV_MOVE';
export const KV_SELECT = 'KV_SELECT';
export const KV_SWITCH_TAB = 'KV_SWITCH_TAB';
export const KV_MODIFY = 'KV_MODIFY';

export const KV_MOVE_UP = 'kv_move_up';
export const KV_MOVE_BOTTOM = 'kv_move_down';

export const loadKVList = (name, kvFileInfo) => (
	(dispatch) => {
		if (!kvFileInfo) return Promise.reject(`project${capitalize(name)}NotMatch`);
		dispatch({
			type: KV_LOADED,
			name,
			kvFileInfo,
		});
		return Promise.resolve();
	}
);

export const toggleKV = (name, id) => ({
	type: KV_TOGGLE,
	name,
	id,
});

export const moveKV = (name, src, tgt, moveType) => ({
	type: KV_MOVE,
	name,
	src,
	tgt,
	moveType,
});

export const selectKV = (name, id) => (
	(dispatch, getStore) => {
		const { kv } = getStore();
		const { selected } = kv[name];

		if (selected !== id) {
			dispatch({
				type: KV_SELECT,
				name,
				id,
			});
		}
	}
);

export const switchKVTab = (name, index) => ({
	type: KV_SWITCH_TAB,
	name,
	index,
});

export const modifyKV = (name, id, path, value) => ({
	type: KV_MODIFY,
	name,
	id,
	path,
	value,
});
