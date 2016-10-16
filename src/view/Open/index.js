/**
 * Created by jiljiang on 2016/10/15.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Lang, { withLang } from 'containers/Lang';
import cssModules from 'react-css-modules';

import { loadProject } from '../../actions/project';

import styles from './index.scss';

class Open extends React.Component {
	constructor() {
		super();
		this.state = { projectPath: '' };
		this.projectUpdate = this.projectUpdate.bind(this);
		this.openProject = this.openProject.bind(this);
	}

	projectUpdate(e) {
		this.setState({ projectPath: e.target.value });
	}

	openProject() {
		const { projectPath } = this.state;
		const { dispatch } = this.props;

		dispatch(loadProject(projectPath)).then(() => {}, (reject) => {
			alert(reject);
		}, (notify) => {
			this.setState({ notify });
		});
	}

	render() {
		const { historyPathList, lang } = this.props;

		return (
			<div styleName="content">
				<h1><Lang id="OpenProject" />:</h1>

				<div className="input-group">
					<input type="text" value={this.state.projectPath} onChange={this.projectUpdate} />
					<button className="btn" onClick={this.openProject}><Lang id="Open" /></button>
				</div>
				<p>{this.state.notify || lang('openProject')}</p>

				<ul styleName="historyList">
					{historyPathList.map((path, index) => (
						<li key={index}>
							<a className="fa fa-trash" /> | <a>{path}</a>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

Open.propTypes = {
	dispatch: PropTypes.func,
	lang: PropTypes.func,
	historyPathList: PropTypes.arrayOf(PropTypes.string),
};

const mapState = ({ project }) => ({
	historyPathList: project.historyPathList,
});

export default connect(mapState)(withLang(cssModules(Open, styles)));
