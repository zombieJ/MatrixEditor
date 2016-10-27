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
				<p>
					矩阵编辑器是用于Dota2 kv编辑。
					使你可以方便的通过图形化界面对kv进行编辑修改，从而减少了部分学习过程，同时也避免了手动修改可能导致的错误。
				</p>
				<p>如果遇到任何问题或者有BUG需要反馈，欢迎通过QQ群进行联系~</p>
				<p>那，祝你做图愉快~</p>
				<br />

				<h2>如何操作？</h2>
				<p>点击上方导航栏进行编辑。</p>
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
