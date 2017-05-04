export const updateValue = (unit, path, updater) => {
	const myUnit = unit || {};
	const myPath = Array.isArray(path) ? path : [path];
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

export default {};
