/**
 * Created by jiljiang on 2016/10/14.
 */

import FS from 'fs';
import Path from 'path';

export function getFileList(path, match) {
	let list = FS.readdirSync(Path.resolve(`./${path}`));

	if (match) {
		list = list.filter(file => match.test(file));
	}

	return list;
}

export function readFile() {}
