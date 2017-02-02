import { ROUTER_TO, ROUTER_REDIRECT } from '../actions/router';

const initialState = {
	path: '/',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ROUTER_TO:
		case ROUTER_REDIRECT:
			return Object.assign({}, state, {
				path: action.path,
			});
	}
	return state;
};
