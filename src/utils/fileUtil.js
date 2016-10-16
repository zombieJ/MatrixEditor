/**
 * Created by jiljiang on 2016/10/14.
 */

import FS from 'fs';
import Path from 'path';

export function getPath(path) {
	return Path.resolve(`./${path}`);
}

export function getFileList(path, match) {
	let list = FS.readdirSync(Path.resolve(path));

	if (match) {
		list = list.filter(file => match.test(file));
	}

	return list;
}

export function folderExist(path) {
	const rPath = Path.resolve(path);
	const exist = FS.existsSync(rPath);
	if (!exist) return false;

	return FS.lstatSync(rPath).isDirectory();
}

export function readFile(path, encoding = 'utf8') {
	return new Promise((resolve, reject) => {
		FS.readFile(Path.resolve(path), encoding, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}
