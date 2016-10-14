/**
 * Created by jiljiang on 2016/10/12.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import app from './reducers';
import Main from './view/Main';

const loggerMiddleware = createLogger({
	collapsed: true,
});
const store = createStore(app, {}, applyMiddleware(thunkMiddleware, loggerMiddleware));
window.store = store;

require('./index.scss');

render(
	<Provider store={store}>
		<Main />
	</Provider>,
	document.getElementById('root')
);
