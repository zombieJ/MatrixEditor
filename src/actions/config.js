/**
 * Created by jiljiang on 2016/10/14.
 */

import storage from 'electron-json-storage';
import { loadLang } from './international';

const initConfig = {
	lang: 'schinese',
};

export const INIT = 'CONFIG_INIT';
export const CONFIG_UPDATE = 'CONFIG_UPDATE';

export const init = () => (dispatch) => {
	storage.get('config', (error, data) => {
		if (error) console.warn('Config read failed:', error);

		const config = Object.assign({}, initConfig, data);

		dispatch({
			type: INIT,
			config,
		});

		dispatch(loadLang(config.lang));
	});
};

export const updateConfig = config => ({
	type: CONFIG_UPDATE,
	config,
});
