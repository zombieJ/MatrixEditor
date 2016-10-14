/**
 * Created by jiljiang on 2016/10/14.
 */

import * as Action from '../actions/config';

const initialState = {
	intl: 'schinese',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Action.INIT: {
			console.log(state, action);
		}
	}
	return state;
};
