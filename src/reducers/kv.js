import Immutable from 'immutable';
import * as Action from '../actions/kv';

const defaultState = new Immutable.Map();

export default (state = defaultState, action) => {
	switch (action.type) {
		case Action.KV_LOADED: {
			const immutableItemList = action.list.map(item => new Immutable.Map(item));
			const root = action.list[0];
			return state.set(action.name, new Immutable.Map({
				index: root.list[0],
				list: new Immutable.List(immutableItemList),
			}));
		}
		case Action.KV_TOGGLE: {
			const { name, id } = action;
			return state.updateIn([name, 'list', id, 'open'], value => !value);
		}
	}
	return state;
};
