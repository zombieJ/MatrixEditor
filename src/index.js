/**
 * Created by jiljiang on 2016/10/12.
 */

import React from 'react'
import {render} from 'react-dom'

render(
<Provider store={store}>
	<ConnectedIntlProvider>
	<Router children={routes} history={hashHistory} />
	</ConnectedIntlProvider>
	</Provider>,
	document.getElementById('root')
);
