import { init as intInit } from './international';
import { init as configInit } from './config';
import { init as projectInit } from './project';

import { devMockOperation } from './__DEV__';

export const APP_INIT = 'APP_INIT';
export const APP_DEV_CLOSE = 'APP_DEV_CLOSE';

export const initApplication = () => (
	(dispatch, getStore) => {
		const { app: { start } } = getStore();
		if (start) return;

		dispatch({
			type: APP_INIT,
		});

		dispatch(intInit());
		dispatch(configInit());
		dispatch(projectInit());

		// Mock operation
		setTimeout(() => {
			const { app: { dev } } = getStore();
			if (dev) {
				dispatch(devMockOperation());
			}
		}, 1000);
	}
);

export const closeDev = () => ({
	type: APP_DEV_CLOSE,
});
