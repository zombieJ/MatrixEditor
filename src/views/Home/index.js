/**
 * Created by jiljiang on 2016/10/15.
 */

import React from 'react';
import { Redirect } from 'react-router';
// import Lang from 'containers/Lang';
import cssModules from 'react-css-modules';

import styles from './index.scss';

/* const Home = () => (
	<div styleName="content">
		<p><Lang id="welcome" /></p>
	</div>
); */

const Home = () => (
	<Redirect to="/open" />
);

export default cssModules(Home, styles);
