import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import $ from 'jquery';

import app from './reducers';
import Main from './views/Main';

const loggerMiddleware = createLogger({
	collapsed: true,
});
const store = createStore(app, {}, applyMiddleware(thunkMiddleware, loggerMiddleware));
window.$ = $;

Object.defineProperty(window, 'store', {
	get() {
		return store.getState();
	},
});

require('./style/index.scss');
require('font-awesome/css/font-awesome.min.css');

// Inject prototype before start up
Promise.prototype.finally = function doFinally(onResolveOrReject) {
	return this.catch(reason => reason).then(onResolveOrReject);
};

render(
	<HashRouter>
		<Provider store={store}>
			<Main />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);
