/**
 * Created by jiljiang on 2016/10/26.
 */

import Immutable from 'immutable';
import * as Action from '../actions/kv';

export default (state = {}, action) => {
	switch (action.type) {
		case Action.KV_LOADED:
			return Object.assign({}, state, {
				[action.name]: new Immutable.List(action.list),
			});
	}
	return state;
};
