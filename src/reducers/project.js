/**
 * Created by jiljiang on 2016/10/15.
 */

import storage from 'electron-json-storage';
import * as Action from '../actions/project';

const initialState = {
	path: '',
	historyPathList: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Action.PROJECT_INIT:
			return Object.assign({}, state, action.projectState);
		case Action.PROJECT_RECORD_REMOVE: {
			const { path } = action;
			const historyPathList = state.historyPathList.filter(prjPath => prjPath !== path);
			const newState = Object.assign({}, state, { historyPathList });
			storage.set('project', newState, (err) => {
				console.log('[Project] Record:', newState, err);
			});
			return newState;
		}
		case Action.PROJECT_RECORDED: {
			const { path } = action;
			const historyPathList = state.historyPathList.filter(prjPath => prjPath !== path);
			historyPathList.unshift(path);
			const newState = Object.assign({}, state, { path, historyPathList });
			storage.set('project', newState, (err) => {
				if (err) console.error('[Project] Record Error:', newState);
			});
			return newState;
		}

		case Action.PROJECT_LOADED:
			return Object.assign({}, state, { path: action.path });
	}

	return state;
};
