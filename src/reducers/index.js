import { combineReducers } from '../utils/redux-dependencies-reducers';
import international from './international';
import project from './project';
import config from './config';
import router from './router';
import history from './history';
import kv from './kv';

export default combineReducers({
	international,
	project,
	router,
	kv,

	config,
	history,
}, {
	dependencies: {
		international: ['history'],
		project: ['history'],
		router: ['history'],
		kv: ['history'],

		history: 'config',
	},
});
