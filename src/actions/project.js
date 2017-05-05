/**
 * Created by jiljiang on 2016/10/16.
 */

import NotifyPromise from 'notify-promise';
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

export const loadProject = path => dispatch => (
	new NotifyPromise((resolve, reject, notify) => {
		console.log('[Project] loading:', path);

		setTimeout(() => {
			// Check project
			notify('Check project...');
			if (!folderExist(path)) {
				reject('projectNotExist');
				return;
			}

			dispatch({
				type: PROJECT_RECORDED,
				path,
			});

			// Load Ability
			notify('Check abilities...');
			const abilityPath = `${path}/scripts/npc/npc_abilities_custom.txt`;
			if (!fileExist(abilityPath)) {
				reject('projectAbilityNotExist');
				return;
			}

			notify('Load abilities...');
			const abilityPromise = KV.baseLoad(abilityPath).then((kvFileInfo) => {
				return dispatch(loadKVList('ability', kvFileInfo));
			});

			Promise.all([abilityPromise]).then(() => {
				dispatch({
					type: PROJECT_LOADED,
					path,
				});

				resolve();
			}, (err) => {
				reject(err);
			});
		}, 0);
	})
);
