import * as ResAction from 'actions/resource';

const defaultState = {
	dotaExist: false,
	abilityImages: undefined,
	itemImages: undefined,
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case ResAction.RES_DOTA_EXIST:
			return Object.assign({}, state, { dotaExist: true });
		case ResAction.RES_DOTA_NOT_EXIST:
			return Object.assign({}, state, { dotaExist: false });
	}

	return state;
};
