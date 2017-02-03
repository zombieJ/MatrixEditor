import Immutable from 'immutable';
import * as Action from '../actions/kv';

const defaultState = new Immutable.Map();

export default (state = defaultState, action) => {
	switch (action.type) {
		case Action.KV_LOADED: {
			const immutableItemList = action.list.map(item => new Immutable.Map(item));
			const root = action.list[0];
			return state.set(action.name, new Immutable.Map({
				tab: 0,
				selected: root.list[0],
				list: new Immutable.List(immutableItemList),
			}));
		}

		case Action.KV_TOGGLE: {
			const { name, id } = action;
			return state.updateIn([name, 'list', id, 'open'], value => !value);
		}

		case Action.KV_MOVE: {
			let myState = state;
			const { name, src, tgt, moveType } = action;

			// Remove source in list
			myState.getIn([name, 'list']).forEach((entity, index) => {
				const list = entity.get('list');
				if (!list) return;

				const pos = list.indexOf(src);
				if (pos !== -1) {
					myState = myState.setIn([
						name, 'list',
						index, 'list',
					], list.filter(id => id !== src));
				}
			});

			// Add source near target
			myState.getIn([name, 'list']).forEach((entity, index) => {
				const list = entity.get('list');
				if (!list) return;

				const pos = list.indexOf(tgt);
				if (pos !== -1) {
					const newList = list.concat();
					newList.splice(pos + (moveType === Action.KV_MOVE_UP ? 0 : 1), 0, src);
					myState = myState.setIn([
						name, 'list',
						index, 'list',
					], newList);
				}
			});

			return myState;
		}

		case Action.KV_SELECT: {
			const { name, id } = action;
			return state.setIn([name, 'selected'], id);
		}

		case Action.KV_SWITCH_TAB: {
			const { name, index } = action;
			return state.setIn([name, 'tab'], index);
		}

		case Action.KV_MODIFY: {
			const { name, id, path, value } = action;
			return state.updateIn([name, 'list', id, 'kv'], kv => kv.set(path, value));
		}
	}
	return state;
};
