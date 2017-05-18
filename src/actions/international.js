/**
 * Created by jiljiang on 2016/10/14.
 */

import { getPath } from '../utils/fileUtil';

export const INIT = 'INT_INIT';
export const LOADED_LANG = 'INT_LOADED_LANG';

export const init = () => ({
	type: INIT,
});

export const loadLang = lang => (dispatch) => {
	const langModulePath = getPath(`res/intl/${lang}.js`);
	const langData = global.require(langModulePath);

	dispatch({
		type: LOADED_LANG,
		lang: langData,
	});

	return Promise.resolve();
};
