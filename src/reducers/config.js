import * as Action from '../actions/config';

const initialState = {
	historyLimit: 50,	// 时间漫游长度
};


export default (state = initialState, action) => {
	switch (action.type) {
		case Action.INIT: {
			return Object.assign({}, state, action.config);
		}
	}
	return state;
};
