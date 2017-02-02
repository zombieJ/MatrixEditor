import React from 'react';
import cssModules from 'react-css-modules';

import Redirect from '../../containers/Router/Redirect';

import styles from './index.scss';

const Home = () => (
	<Redirect to="/open" />
);

export default cssModules(Home, styles);
