import { APP_INIT, APP_DEV_CLOSE } from '../actions/app';

const initialState = {
	start: false,
	dev: true,	// 正式环境去掉它！
};

export default (state = initialState, action) => {
	switch (action.type) {
		case APP_INIT:
			return Object.assign({}, state, {
				start: true,
			});
		case APP_DEV_CLOSE:
			console.log('[App] Close dev!');
			return Object.assign({}, state, {
				dev: false,
			});
	}
	return state;
};
