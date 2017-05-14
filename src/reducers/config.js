import * as Action from '../actions/config';

const initialState = {
	maxRedo: 50,	// 时间漫游长度
	maxHistoryBackup: 5,
	dotaPath: '',
};


export default (state = initialState, action) => {
	switch (action.type) {
		case Action.INIT: {
			return Object.assign({}, state, action.config);
		}

		case Action.CONFIG_UPDATE: {
			const config = Object.assign({}, action.config);

			config.maxRedo = Number(config.maxRedo) || 0;
			config.maxHistoryBackup = Number(config.maxHistoryBackup) || 0;
			if (config.maxRedo < 0) config.maxRedo = 0;
			if (config.maxHistoryBackup < 0) config.maxHistoryBackup = 0;

			return Object.assign({}, state, config);
		}
	}
	return state;
};
