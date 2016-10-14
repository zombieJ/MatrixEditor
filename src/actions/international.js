/**
 * Created by jiljiang on 2016/10/14.
 */

export const INIT = 'INT_INIT';
export const LOAD_LANG = 'INT_LOAD_LANG';

export const init = () => ({
	type: INIT,
});

export const loadLang = lang => ({
	type: LOAD_LANG,
	lang,
});
