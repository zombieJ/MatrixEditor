/**
 * Created by jiljiang on 2016/10/14.
 */

import { getFileList } from '../utils/fileUtil';
import * as Action from '../actions/international';

const initialState = {
	langList: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Action.INIT: {
			const list = getFileList('res/intl', /\.js$/);
			console.log('>>>', list);
			break;
		}
		default:
			return state;
	}

	return state;
};
