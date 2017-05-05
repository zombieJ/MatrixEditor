import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import $ from 'jquery';
import storage from 'electron-json-storage';

import app from './reducers';
import Main from './views/Main';

const loggerMiddleware = createLogger({
	collapsed: true,
});
const store = createStore(app, {}, applyMiddleware(thunkMiddleware, loggerMiddleware));
window.$ = $;
window.storage = storage;

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

// Render & Hot Update
delete AppContainer.prototype.unstable_handleError;
render(
	<AppContainer>
		<Provider store={store}>
			<Main />
		</Provider>
	</AppContainer>,
	document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./views/Main', () => {
		const NextMain = require('./views/Main').default;

		render(
			<AppContainer>
				<Provider store={store}>
					<NextMain />
				</Provider>
			</AppContainer>,
			document.getElementById('root'),
		);

		setTimeout(() => {
			$(window).resize();
		}, 0);
	});
}
