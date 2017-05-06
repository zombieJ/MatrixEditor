export const toPath = (...pathList) => {
	let mergedPath = [];
	pathList.forEach((path) => {
		if (!path) return;
		const myPath = Array.isArray(path) ? path : [path];
		mergedPath = mergedPath.concat(myPath);
	});
	return mergedPath;
};

export const updateValue = (unit, path, updater) => {
	const myUnit = unit || {};
	const myPath = toPath(path);
	const clone = Array.isArray(myUnit) ? [] : {};
	Object.assign(clone, myUnit);
	if (myPath.length === 0) return clone;

	const [key, ...restPath] = myPath;
	if (restPath.length === 0) {
		clone[key] = updater(clone[key]);
	} else {
		clone[key] = updateValue(clone[key], restPath, updater);
	}

	return clone;
};

export const getValue = (unit, path, defaultValue) => {
	let current = unit || {};
	const myPath = toPath(path);
	const len = myPath.length;
	for (let i = 0; i < len; i += 1) {
		const key = myPath[i];
		current = current[key];
		if (current === undefined) return defaultValue;
	}
	return current;
};
