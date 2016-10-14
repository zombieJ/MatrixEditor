/**
 * Created by jiljiang on 2016/10/12.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './index.scss';

import { init as intlInit } from '../../actions/international';
import { init as configInit } from '../../actions/config';

class Main extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(intlInit());
		dispatch(configInit());
	}

	render() {
		return (
			<div>
				<header styleName="header">
					<span>Matrix Editor 2.0</span>
				</header>
			</div>
		);
	}
}

Main.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(cssModules(Main, styles));
