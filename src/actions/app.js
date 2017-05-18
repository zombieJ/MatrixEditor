import { init as intInit } from './international';
import { init as configInit } from './config';
import { init as projectInit } from './project';
import { loadDotaResource } from './resource';

import { devMockOperation } from './__DEV__';

export const APP_INIT = 'APP_INIT';
export const APP_DEV_CLOSE = 'APP_DEV_CLOSE';

export const initApplication = () => (
	(dispatch, getStore) => {
		const { app: { start } } = getStore();
		if (start) return Promise.reject('Application already started...');

		dispatch({
			type: APP_INIT,
		});

		const intelPromise = dispatch(intInit());
		const configPromise = dispatch(configInit());
		const projectPromise = dispatch(projectInit());

		// Load resource
		configPromise.then(() => {
			dispatch(loadDotaResource());
		});

		// Mock operation
		setTimeout(() => {
			const { app: { dev } } = getStore();
			if (dev) {
				dispatch(devMockOperation());
			}
		}, 1000);

		return Promise.all([intelPromise, configPromise, projectPromise]);
	}
);

export const closeDev = () => ({
	type: APP_DEV_CLOSE,
});
