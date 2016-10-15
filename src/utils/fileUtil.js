/**
 * Created by jiljiang on 2016/10/14.
 */

import FS from 'fs';
import Path from 'path';

export function getPath(path) {
	return Path.resolve(`./${path}`);
}

export function getFileList(path, match) {
	let list = FS.readdirSync(getPath(path));

	if (match) {
		list = list.filter(file => match.test(file));
	}

	return list;
}

export function readFile(path, encoding = 'utf8') {
	return new Promise((resolve, reject) => {
		FS.readFile(getPath(path), encoding, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}
