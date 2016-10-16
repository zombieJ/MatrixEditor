/**
 * Created by jiljiang on 2016/10/16.
 */

import { Deferred } from 'jquery';
import { folderExist } from '../utils/fileUtil';

export const LOADED_PROJECT = 'LOADED_PROJECT';

export const loadProject = path => (dispatch) => {
	const dtd = new Deferred();

	// const list = getFileList(path);
	console.log('Load Project >>>', path, dispatch);

	setTimeout(() => {
		dtd.notify('Load project...');
		if (!folderExist(path)) {
			dtd.reject('Project not exist!');
		}
	}, 0);

	return dtd;
};
