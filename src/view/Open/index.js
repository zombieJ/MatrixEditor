/**
 * Created by jiljiang on 2016/10/15.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Lang from 'containers/Lang';
import cssModules from 'react-css-modules';

import styles from './index.scss';

const Open = ({ historyPathList, dispatch }) => {
	console.log('->', dispatch);

	return (
		<div styleName="content">
			<h1><Lang id="OpenProject" />:</h1>

			<div className="input-group">
				<input type="text" />
				<button className="btn"><Lang id="Open" /></button>
			</div>

			<ul styleName="historyList">
				{historyPathList.map((path, index) => (
					<li key={index}>
						[<a>X</a>] <a>{path}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

Open.propTypes = {
	dispatch: PropTypes.func,
	historyPathList: PropTypes.arrayOf(PropTypes.string),
};

const mapState = ({ project }) => ({
	historyPathList: project.historyPathList,
});

export default connect(mapState)(cssModules(Open, styles));
