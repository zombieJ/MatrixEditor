/* eslint-disable */

import Immutable from 'immutable';
import warning from 'warning';
import KV from '../utils/kvParser';

export default class ImmutableKV {
	constructor(key, value, comment) {
		if (typeof key === 'string') {
			let mValue = value;
			if (Array.isArray(mValue)) mValue = new Immutable.List(mValue);
			this.entity = new Immutable.Map({
				key,
				value: mValue,
				comment,
			});
		} else if (typeof key === 'object') {
			this.entity = key;
		}
	}

	static parse(str) {
		const kv = KV.parse(str);
		return ImmutableKV.wrapKV(kv);
	}

	static wrapKV(kv) {
		const { key, comment } = kv;
		let { value } = kv;
		if (Array.isArray(value)) {
			value = value.map(item => ImmutableKV.wrapKV(item));
		}
		return new ImmutableKV(key, value, comment);
	}

	static fromFileSync(path, encoding) {
		const FS = require('fs-extra');
		const Path = require('path');

		const filePath = Path.normalize(path);
		const dirPath = Path.dirname(filePath);
		let content = FS.readFileSync(filePath, encoding || 'utf8');
		if (content[0] === '\ufeff') content = content.substr(1);
		const infoObj = {};
		const kv = KV.parse(content, infoObj);
		const immutableKV = ImmutableKV.wrapKV(kv);

		immutableKV._parserInfo = infoObj;
		immutableKV._filePath = filePath;

		immutableKV._children = (kv.baseList || []).map((subPath) => {
			const subFilePath = Path.normalize(Path.join(dirPath, subPath));
			const subImmutableKV = ImmutableKV.fromFileSync(subFilePath, encoding);
			subImmutableKV._base = subPath;
			return subImmutableKV;
		});
		return immutableKV;
	}

	static fromFile(path, encoding) {
		const FSP = require('../utils/fs-promise');
		const Path = require('path');

		const filePath = Path.normalize(path);
		const dirPath = Path.dirname(filePath);

		return FSP.readFile(filePath, encoding || 'utf8').then((data) => {
			let content = data;
			if (content[0] === '\ufeff') content = content.substr(1);
			const infoObj = {};
			const kv = KV.parse(content, infoObj);
			const immutableKV = ImmutableKV.wrapKV(kv);

			immutableKV._parserInfo = infoObj;
			immutableKV._filePath = filePath;

			const childrenPromises = (kv.baseList || []).map((subPath) => {
				const subFilePath = Path.normalize(Path.join(dirPath, subPath));
				return ImmutableKV.fromFile(subFilePath, encoding).then((subKV) => {
					subKV._base = subPath;	// eslint-disable-line no-param-reassign
					return subKV;
				});
			});

			return Promise.all(childrenPromises).then((subKVs) => {
				immutableKV._children = subKVs;
				return immutableKV;
			});
		}).catch((error) => {
			const immutableKV = new ImmutableKV('', []);
			immutableKV._filePath = filePath;
			immutableKV._parserInfo = { warn: [error] };
			return immutableKV;
		});
	}

	get key() {
		return this.entity.get('key');
	}
	setKey(key) {
		let path = key;
		if (!Array.isArray(path)) path = [path];
		if (path.length === 1) {
			return new ImmutableKV(this.entity.set('key', path[0]));
		}

		const first = path[0];
		const isNumber = typeof first === 'number';
		const index = isNumber ? first : this.getKVIndex(first, false);
		if (index >= 0) {
			path = path.slice(1);
			const subKV = this.value.get(index);
			const newSubKV = subKV.setKey(path);

			return new ImmutableKV(this.entity.set('value', this.value.set(index, newSubKV)));
		}

		throw new Error(`Number path not found: ${path.join('->')}`);
	}
	get name() {
		warning(null, "'name' is not standard. Use 'key' instead.");
		return this.key;
	}
	get value() {
		return this.entity.get('value');
	}
	setValue(value) {
		return new ImmutableKV(this.entity.set('value', value));
	}

	get comment() {
		return this.entity.get('comment');
	}
	setComment(comment) {
		return new ImmutableKV(this.entity.set('comment', comment));
	}
	get isList() {
		return this.value instanceof Immutable.List;
	}
	get length() {
		return this.isList ? this.value.size : NaN;
	}

	/**
	 * Save additional data in instance. This will NOT return new ImmutableKV.
	 * And all the clone will share this data.
	 * @param name
	 * @param value
	 * @returns {*}
	 */
	data(name, value) {
		const data = this.entity.get('data') || {};
		if (arguments.length === 2) {
			data[name] = value;
			this.entity = this.entity.set('data', data);
		}

		return data[name];
	}

	getKVIndex(kvName, caseSensitive) {
		let name = kvName;
		if (caseSensitive === false) {
			name = (name || '').toUpperCase();
			return this.value.findIndex(({ key }) => {
				return (key || '').toUpperCase() === name;
			});
		} else {
			return this.value.findIndex(({ key }) => {
				return key === name;
			});
		}
	}
	getKV(name, caseSensitive) {
		let path = Array.isArray(name) ? name : [name];
		if (path.length === 1) {
			let name = path[0];
			let index = typeof name === 'number' ? name : this.getKVIndex(name, caseSensitive);
			return index >= 0 ? this.value.get(index) : null;
		} else {
			let first = path[0];
			path = path.slice(1);
			let subKV = this.getKV(first, caseSensitive);
			if (subKV) {
				return subKV.getKV(path, caseSensitive);
			}
			return null;
		}
	}
	get(name, caseSensitive, defaultValue) {
		if (typeof caseSensitive === 'string' && arguments.length === 2) {
			defaultValue = caseSensitive;
			caseSensitive = undefined;
		}

		let entity = this.getKV(name, caseSensitive);
		let value = entity ? entity.value : null;
		if (value || typeof defaultValue !== 'string') {
			return value;
		}
		return defaultValue;
	}
	setIndex(index, value) {
		let myValue = this.value;
		let kv = myValue.get(index);
		let entity = kv.entity.set('value', value);
		kv = new ImmutableKV(entity);
		return new ImmutableKV(this.entity.set('value', myValue.set(index, kv)));
	}
	set(name, value, caseSensitive) {
		let path = Array.isArray(name) ? name : [name];

		if (path.length === 0) {
			return this.setValue(value);
		} else if (path.length === 1) {
			let cur = path[0];
			let isNumber = typeof cur === 'number';
			let index = isNumber ? cur : this.getKVIndex(cur, caseSensitive);
			if (index >= 0) {
				return this.setIndex(index, value);
			} else if (!isNumber) {
				return this.add(cur, value);
			} else {
				throw `Can't set value if last path is number: ${cur}`
			}
		} else {
			let first = path[0];
			let isNumber = typeof first === 'number';
			let index = isNumber ? first : this.getKVIndex(first, caseSensitive);
			if (index >= 0) {
				path = path.slice(1);
				let subKV = this.value.get(index);
				let newSubKV = subKV.set(path, value, caseSensitive);
				return this.setIndex(index, newSubKV.value);
			} else if (!isNumber) {
				return this.add(path, value);
			} else {
				throw `Number path not found: ${path.join('->')}`
			}
		}
	}
	add(name, value, comment, caseSensitive) {
		let path = Array.isArray(name) ? name : [name];

		if (path.length === 1) {
			let key = path[0];
			if (typeof key === 'number') throw `Add path can't be number: ${path.join('->')}`;

			let kv = new ImmutableKV(key, value, comment);
			return new ImmutableKV(this.entity.set('value', this.value.push(kv)));
		} else {
			let first = path[0];
			path = path.slice(1);
			let isNumber = typeof first === 'number';
			let index = isNumber ? first : this.getKVIndex(first, caseSensitive);
			if (index >= 0) {
				let subKV = this.value.get(index);
				let newSubKV = subKV.add(path, value, comment, caseSensitive);
				return this.setIndex(index, newSubKV.value);
			} else {
				let kv = new ImmutableKV(first, [], comment);
				let newKV = kv.add(path, value, comment);
				return new ImmutableKV(this.entity.set('value', this.value.push(newKV)));
			}
		}
	}
	remove(name, caseSensitive) {
		let path = Array.isArray(name) ? name : [name];

		if (path.length === 1) {
			if (typeof path[0] === 'number') {
				return new ImmutableKV(this.entity.set('value', this.value.filter((kv, index) => {
					return index !== path[0];
				})));
			} else {
				let _name = caseSensitive === false ? (path[0] || '').toUpperCase() : path[0];
				return new ImmutableKV(this.entity.set('value', this.value.filter(kv => {
					if (caseSensitive === false) {
						return (kv.key || '').toUpperCase() !== _name;
					} else {
						return kv.key !== _name;
					}
				})));
			}
		} else {
			let first = path[0];
			path = path.slice(1);
			let index = typeof first === 'number' ? first : this.getKVIndex(first, caseSensitive);
			if (index === -1 || first >= this.length) return this;

			let subKV = this.value.get(index).remove(path, caseSensitive);
			return this.setIndex(index, subKV.value);
		}
	}

	normalizr(list, parentId = 0, index = 1) {
		let hasList = !!list;
		if (!hasList) {
			list = [{id: 0, name: 'Root', open: true, list: []}];
		}
		let parent = list[parentId];

		// Nest
		(this._children || []).forEach(subKV => {
			let _name = subKV._base.replace(/^(.*[\\/])?(.*)\.txt$/i, '$2');
			let folder = {id: index, name: _name, description: subKV._base, open: false, list: []};
			list[index] = folder;
			parent.list.push(index);
			index = subKV.normalizr(list, index, index + 1);
		});

		// KV
		this.value.forEach(kv => {
			if (kv.value instanceof Immutable.List) {
				list[index] = {id: index, kv};
				parent.list.push(index);
				index += 1;
			}
		});
		return hasList ? index : list;
	}

	getParseError() {
		let list = [];
		if (this._parserInfo && this._parserInfo.warn && this._parserInfo.warn.length) {
			list = this._parserInfo.warn.slice(0, 10).map(error => this._filePath + ':\n' + error);
		}

		// Nest
		(this._children || []).forEach(subKV => {
			list = list.concat(subKV.getParseError());
		});

		return list;
	}

	toJSON() {
		return this.entity.toJSON();
	}
	toJS() {
		return this.entity.toJS();
	}
	toString() {
		return this.entity.__toString('ImmutableKV {', '}');
	}
	toKV() {
		let value;
		if (this.isList) {
			value = [];
			this.value.forEach(kv => {
				value.push(kv.toKV());
			});
		} else {
			value = this.value;
		}
		return new KV(this.key, value, this.comment);
	}
}

/* eslint-enable */
