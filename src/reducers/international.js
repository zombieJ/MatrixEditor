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
			const langList = getFileList('res/intl', /\.js$/);
			return Object.assign({}, state, { langList });
		}
		case Action.LOAD_LANG: {
			const { lang } = action;
			console.log('>>>', lang);
		}
	}

	return state;
};
