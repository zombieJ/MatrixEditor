/**
 * Created by jiljiang on 2016/10/14.
 */

import * as Action from '../actions/config';


export default (state = {}, action) => {
	switch (action.type) {
		case Action.INIT: {
			return Object.assign({}, state, action.config);
		}
	}
	return state;
};
