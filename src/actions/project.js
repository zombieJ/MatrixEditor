/**
 * Created by jiljiang on 2016/10/16.
 */

import { Deferred } from 'jquery';
import storage from 'electron-json-storage';
import { KV } from 'immutable-kv';
import { folderExist, fileExist } from '../utils/fileUtil';

import { loadKVList } from './kv';

export const PROJECT_INIT = 'PROJECT_INIT';
export const PROJECT_LOADED = 'PROJECT_LOADED';
export const PROJECT_RECORDED = 'PROJECT_RECORDED';
export const PROJECT_RECORD_REMOVE = 'PROJECT_RECORD_REMOVE';

export const init = () => (dispatch) => {
	storage.get('project', (error, projectState) => {
		if (error) console.warn('Project read failed:', error);

		dispatch({
			type: PROJECT_INIT,
			projectState,
		});
	});
};

export const removeProjectRecord = path => ({
	type: PROJECT_RECORD_REMOVE,
	path,
});

export const loadProject = path => (dispatch) => {
	const dtd = new Deferred();

	// const list = getFileList(path);
	console.log('[Project] loading:', path);

	setTimeout(() => {
		// Check project
		dtd.notify('Check project...');
		if (!folderExist(path)) {
			dtd.reject('projectNotExist');
			return;
		}

		dispatch({
			type: PROJECT_RECORDED,
			path,
		});

		// Load Ability
		dtd.notify('Check abilities...');
		const abilityPath = `${path}/scripts/npc/npc_abilities_custom.txt`;
		if (!fileExist(abilityPath)) {
			dtd.reject('projectAbilityNotExist');
			return;
		}

		dtd.notify('Load abilities...');
		const abilityPromise = KV.load(abilityPath).then((kvFileInfo) => {
			return dispatch(loadKVList('ability', kvFileInfo));
		});

		Promise.all([abilityPromise]).then(() => {
			dispatch({
				type: PROJECT_LOADED,
				path,
			});

			dtd.resolve();
		}, (err) => {
			dtd.reject(err);
		});
	}, 0);

	return dtd;
};
