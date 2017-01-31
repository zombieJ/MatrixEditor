/**
 * Created by jiljiang on 2016/10/26.
 */

import Immutable from 'immutable';
import * as Action from '../actions/kv';

export default (state = {}, action) => {
	switch (action.type) {
		case Action.KV_LOADED: {
			const immutableItemList = action.list.map(item => new Immutable.Map(item));

			return Object.assign({}, state, {
				[action.name]: new Immutable.List(immutableItemList),
			});
		}
		case Action.KV_TOGGLE: {
			const OPEN_PATH = [action.id, 'open'];
			const { name } = action;
			return Object.assign({}, state, {
				[name]: state[name].setIn(
					OPEN_PATH,
					!state[name].getIn(OPEN_PATH),
				),
			});
		}
	}
	return state;
};
