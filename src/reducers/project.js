/**
 * Created by jiljiang on 2016/10/15.
 */

const initialState = {
	path: '',
	historyPathList: [
		'asd',
		'asd',
		'asd',
	],
};

export default (state = initialState, action) => {
	console.log(state, action);

	return state;
};
