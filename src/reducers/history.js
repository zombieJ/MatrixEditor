import { ROUTER_TO, ROUTER_REDIRECT } from '../actions/router';
import {
	KV_MOVE, KV_TOGGLE, KV_SELECT, KV_SWITCH_TAB, KV_MODIFY, KV_CREATE,
	KV_CREATE_GROUP, KV_MODIFY_GROUP,
} from '../actions/kv';
import { HISTORY_UNDO, HISTORY_REDO, HISTORY_CLEAN } from '../actions/history';

const RECORD_ACTIONS = [
	ROUTER_TO,
	ROUTER_REDIRECT,
	KV_MOVE, KV_TOGGLE, KV_SELECT, KV_SWITCH_TAB, KV_MODIFY, KV_CREATE,
	KV_CREATE_GROUP, KV_MODIFY_GROUP,
];

const initialState = {
	history: [],
	future: [],
};

const snapshot = (store) => {
	const cloneStore = Object.assign({}, store);
	delete cloneStore.config;
	delete cloneStore.history;

	return cloneStore;
};

export default (state = initialState, action, store, mergeStoreFunc) => {
	const { type } = action;

	switch (type) {
		case HISTORY_UNDO: {
			const cloneStore = snapshot(store);
			const history = state.history.concat();
			const future = state.future.concat(cloneStore);
			const current = history.pop();

			// Call merge to restore other states
			mergeStoreFunc(current);

			return Object.assign({}, state, {
				history,
				future,
			});
		}

		case HISTORY_REDO: {
			const cloneStore = snapshot(store);
			const history = state.history.concat().concat(cloneStore);
			const future = state.future;
			const current = future.pop();

			// Call merge to restore other states
			mergeStoreFunc(current);

			return Object.assign({}, state, {
				history,
				future,
			});
		}

		case HISTORY_CLEAN:
			return Object.assign({}, state, {
				history: [],
				future: [],
			});

		default: {
			if (RECORD_ACTIONS.indexOf(type) !== -1) {
				const { config: { historyLimit } } = store;

				const cloneStore = snapshot(store);

				const history = state.history.concat(cloneStore);

				// [Router] Redirect will remove prev history
				if (type === ROUTER_REDIRECT) {
					history.pop();
				}

				return Object.assign({}, state, {
					history: history.slice(-historyLimit),
					future: [],
				});
			}
		}
	}

	return state;
};
