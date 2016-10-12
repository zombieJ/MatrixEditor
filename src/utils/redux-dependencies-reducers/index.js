import warning from 'warning'

function isDependsOn(potentialDepend, dependencies) {
	return dependencies ? dependencies.indexOf(potentialDepend) >= 0 : false;
}

export function combineReducers(reducers, {dependencies} = {}) {
	let keys = Object.keys(reducers);

	if(dependencies) {
		keys.sort((key1, key2) => {
			let key1DependOnKey2 = isDependsOn(key2, dependencies[key1]);
			let key2DependOnKey1 = isDependsOn(key1, dependencies[key2]);
			if(key1DependOnKey2 && !key2DependOnKey1) {
				return 1;
			} else if (!key1DependOnKey2 && key2DependOnKey1) {
				return -1;
			} else {
				warning(!key1DependOnKey2 || !key2DependOnKey1, `recursive dependencies in combineReducers. Please check: ${key1}, ${key2}`);
				return 0;
			}
		});
	}

	return function(state = {}, action) {
		let newState = {};
		let update = false;

		for(let key of keys) {
			newState[key] = reducers[key](state[key], action, state);
			if(newState[key] !== state[key]) update = true;
		}

		return update ? newState : state;
	}
}
