/**
 * Created by jiljiang on 2016/10/12.
 */

import { combineReducers } from '../utils/redux-dependencies-reducers';
import international from './international';
import config from './config';

export default combineReducers({
	international,
	config,
});
