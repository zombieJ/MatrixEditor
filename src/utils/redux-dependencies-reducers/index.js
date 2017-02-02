export function combineReducers(reducers, { dependencies } = {}) {
	let keys = [];

	// Map keys with dependencies
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

	return (store = {}, action) => {
		let update = false;
		const newStore = {};
		const mergedStoreList = [];

		// Merge store function for time travelling
		const mergeStoreFunc = (mergedStore) => {
			update = true;
			mergedStoreList.push(mergedStore);
		};

		// Update state
		for (const key of keys) {
			newStore[key] = reducers[key](store[key], action, store, mergeStoreFunc);
			if (newStore[key] !== store[key]) update = true;
		}

		// Merge store
		mergedStoreList.forEach((mergedStore) => {
			Object.assign(newStore, mergedStore);
		});

		return update ? newStore : store;
	};
}

export default combineReducers;
