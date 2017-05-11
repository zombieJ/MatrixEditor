import * as Action from '../actions/kv';
import { updateValue } from '../utils/pathUtil';

const defaultState = {};

function flatten(kvFileInfo, list = [], id = 0) {
	console.log('~>', kvFileInfo);
	let myId = id;
	let firstId = 0;
	let childFirstId = 0;

	const relativePath = kvFileInfo._relativePath || '';

	const folderHolder = {
		id: myId,
		list: [],
		name: relativePath.replace(/^([^\/\\]*[\/\\])*/, '').replace(/\.txt$/, ''),
		comment: relativePath,
	};
	myId += 1;

	folderHolder.list = (kvFileInfo.baseList || []).map((subKvFileInfo) => {
		const container = flatten(subKvFileInfo, list, myId);
		myId = container.id;
		childFirstId = childFirstId || container.firstId;
		return container.holder.id;
	});

	list[folderHolder.id] = folderHolder;
	kvFileInfo.kv.value.forEach((kv) => {
		if (kv.key === 'Version') return;

		const kvHolder = {
			id: myId,
			kv,
		};
		list[kvHolder.id] = kvHolder;
		folderHolder.list.push(kvHolder.id);
		firstId = firstId || kvHolder.id;
		myId += 1;
	});

	return {
		list,
		holder: folderHolder,
		id: myId,
		firstId: firstId || childFirstId,
	};
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case Action.KV_LOADED: {
			const container = flatten(action.kvFileInfo);
			return Object.assign({}, state, {
				[action.name]: {
					tab: 0,
					selected: container.firstId,
					list: container.list,
				},
			});
		}

		case Action.KV_TOGGLE: {
			const { name, id } = action;
			return updateValue(state, [name, 'list', id, 'open'], value => !value);
		}

		case Action.KV_MOVE: {
			let myState = state;
			const { name, src, tgt, moveType } = action;

			// Remove source in list
			myState[name].list.forEach((entity, index) => {
				const { list } = entity;
				if (!list) return;

				const pos = list.indexOf(src);
				if (pos !== -1) {
					myState = updateValue(myState, [name, 'list', index, 'list'], () => list.filter(id => id !== src));
				}
			});

			// Add source near target
			myState[name].list.forEach((entity, index) => {
				const { list } = entity;
				if (!list) return;

				const pos = list.indexOf(tgt);
				if (pos !== -1) {
					const newList = list.concat();
					newList.splice(pos + (moveType === Action.KV_MOVE_UP ? 0 : 1), 0, src);
					myState = updateValue(myState, [name, 'list', index, 'list'], () => newList);
				}
			});

			return myState;
		}

		case Action.KV_MOVE_IN: {
			let myState = state;
			const { name, src, tgt } = action;

			// Remove source in list
			myState[name].list.forEach((entity, index) => {
				const { list } = entity;
				if (!list) return;

				const pos = list.indexOf(src);
				if (pos !== -1) {
					myState = updateValue(myState, [name, 'list', index, 'list'], () => list.filter(id => id !== src));
				}
			});

			// Add source near target
			myState = updateValue(myState, [name, 'list', tgt, 'list'], list => [...list, src]);

			return myState;
		}

		case Action.KV_CREATE: {
			let myState = state;
			const { name, kv } = action;
			const { selected } = myState[name];

			let currentFolderId = 0;
			let selectedPos = 0;
			let newKvId = 0;

			myState[name].list.some(({ list }, index) => {
				if (!list) return false;

				const pos = list.indexOf(selected);
				if (pos !== -1) {
					currentFolderId = index;
					selectedPos = pos;
					return true;
				}
				return false;
			});

			// Insert kv
			myState = updateValue(myState, [name, 'list'], (list) => {
				newKvId = list.length;
				return list.concat({ id: newKvId, kv });
			});

			// Update holder list
			myState = updateValue(myState, [name, 'list', currentFolderId], (holder) => {
				const newList = holder.list.concat();
				newList.splice(selectedPos + 1, 0, newKvId);
				return Object.assign({}, holder, { list: newList });
			});

			return updateValue(myState, [name, 'selected'], () => newKvId);
		}

		case Action.KV_SELECT: {
			const { name, id } = action;
			return updateValue(state, [name, 'selected'], () => id);
		}

		case Action.KV_SWITCH_TAB: {
			const { name, index } = action;
			return state.setIn([name, 'tab'], index);
		}

		case Action.KV_MODIFY: {
			const { name, id, path, value } = action;
			return state.updateIn([name, 'list', id, 'kv'], (kv) => {
				if (value === null) {
					return kv.remove(path);
				}
				return kv.set(path, value);
			});
		}
	}
	return state;
};
