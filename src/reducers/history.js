import { KV_MOVE } from '../actions/kv';

const RECORD_ACTIONS = [KV_MOVE];

const initialState = {
	history: [],
};

export default (state = initialState, action, store) => {
	const { type } = action;

	if (RECORD_ACTIONS.indexOf(type) !== -1) {
		const { config: { historyLimit } } = store;

		const cloneStore = Object.assign({}, store);
		delete cloneStore.config;
		delete cloneStore.history;

		const history = state.history.concat(cloneStore).slice(-historyLimit);

		return Object.assign({}, state, {
			history,
		});
	}

	return state;
};
