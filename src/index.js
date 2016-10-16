/**
 * Created by jiljiang on 2016/10/12.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router';
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

require('./style/index.scss');
require('font-awesome/css/font-awesome.min.css');

render(
	<HashRouter>
		<Provider store={store}>
			<Main />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
