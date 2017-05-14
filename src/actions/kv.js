import { capitalize } from '../utils/stringUtil';

export const KV_LOADED = 'KV_LOADED';
export const KV_TOGGLE = 'KV_TOGGLE';
export const KV_MOVE = 'KV_MOVE';
export const KV_MOVE_IN = 'KV_MOVE_IN';
export const KV_SELECT = 'KV_SELECT';
export const KV_SWITCH_TAB = 'KV_SWITCH_TAB';
export const KV_MODIFY = 'KV_MODIFY';
export const KV_MODIFY_GROUP = 'KV_MODIFY_GROUP';
export const KV_CREATE = 'KV_CREATE';
export const KV_CREATE_GROUP = 'KV_CREATE_GROUP';

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

export const moveKVInList = (name, src, tgt) => ({
	type: KV_MOVE_IN,
	name,
	src,
	tgt,
});

export const createKV = (name, kv) => ({
	type: KV_CREATE,
	name,
	kv,
});

export const createKVGroup = (name, relativePath) => ({
	type: KV_CREATE_GROUP,
	name,
	relativePath,
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

export const modifyKVGroup = (name, id, relativePath) => ({
	type: KV_MODIFY_GROUP,
	name,
	id,
	relativePath,
});
