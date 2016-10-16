/* eslint-disable */

var FS = require('fs-extra');

const funcKeys = [
	"readFile"
];

funcKeys.forEach(key => {
	const func = FS[key];
	exports[key] = (...args) => {
		return new Promise((resolve, reject) => {
			func(...args, (err, ...content) => {
				if(err) {
					reject(err);
				}
				resolve(...content);
			});
		});
	}
});

/* eslint-enable */
