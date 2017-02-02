import warning from 'warning';

function isDependsOn(potentialDepend, dependencies) {
	return dependencies ? dependencies.indexOf(potentialDepend) >= 0 : false;
}

export function combineReducers(reducers, { dependencies } = {}) {
	let keys = [];

	if (dependencies) {
		Object.keys(dependencies).forEach((key) => {
			const depKeys = Array.isArray(dependencies[key]) ? dependencies[key] : [dependencies[key]];
			const index = keys.indexOf(key);
			if (index === -1) {
				keys = keys.concat(depKeys);
				keys.push(key);
			} else {
				const insertKeys = [index, 0].concat(depKeys);
				keys.splice(...insertKeys);
			}
		});

		keys = [...new Set(keys.concat(Object.keys(reducers)))];
	} else {
		keys = Object.keys(reducers);
	}
	console.log('KEYS:', keys);

	return (state = {}, action) => {
		const newState = {};
		let update = false;

		for (const key of keys) {
			newState[key] = reducers[key](state[key], action, state);
			if (newState[key] !== state[key]) update = true;
		}

		return update ? newState : state;
	};
}

export { combineReducers as default };
