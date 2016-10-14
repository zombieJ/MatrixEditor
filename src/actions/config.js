/**
 * Created by jiljiang on 2016/10/14.
 */

import storage from 'electron-json-storage';

export const INIT = 'INIT';

export const init = () => {
	return dispatch => {
		storage.get('config', (error, config) => {
			if (error) {
				console.warn('Config read failed:', error);
			}
			dispatch({
				type: INIT,
				config
			});
		});
	};
};
