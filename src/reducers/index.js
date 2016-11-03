/**
 * Created by jiljiang on 2016/10/12.
 */

import { combineReducers } from '../utils/redux-dependencies-reducers';
import international from './international';
import project from './project';
import config from './config';
import kv from './kv';
import test from './test';

export default combineReducers({
	international,
	project,
	config,
	kv,
	test,
});
