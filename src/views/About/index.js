/**
 * Created by jiljiang on 2016/10/15.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withLang } from 'containers/Lang';
import cssModules from 'react-css-modules';

import styles from './index.scss';

class Open extends React.Component {
	static do() {}

	constructor() {
		super();

		this.do = Open.do.bind(this);
	}

	render() {
		console.log('>>>', Open.do);

		return (
			<div styleName="content">
				<h1>欢迎使用矩阵编辑器v2.0版</h1>
			</div>
		);
	}
}

Open.propTypes = {
	dispatch: PropTypes.func,
	lang: PropTypes.func,
};

const mapState = ({ project }) => ({
	historyPathList: project.historyPathList,
});

export default connect(mapState)(withLang(cssModules(Open, styles)));
