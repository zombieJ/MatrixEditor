/**
 * Created by jiljiang on 2016/10/16.
 */

import { Deferred } from 'jquery';
import storage from 'electron-json-storage';
import { folderExist, fileExist } from '../utils/fileUtil';
import ImmutableKV from '../models/ImmutableKV';

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
	console.log('Load Project >>>', path, dispatch);

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
		ImmutableKV.fromFile(abilityPath).then((kv) => {
			const error = kv.getParseError();
			const list = kv.normalizr();
			console.log('Loaded:', list, error);
		});
	}, 0);

	return dtd;
};
