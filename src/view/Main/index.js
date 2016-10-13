/**
 * Created by jiljiang on 2016/10/12.
 */

import React from 'react';
import cssModules from 'react-css-modules';
import styles from './index.scss';

const Main = () => (
	<div>
		<header styleName="header">
			<span>Matrix Editor 2.0</span>
		</header>
	</div>
);

export default cssModules(Main, styles);
