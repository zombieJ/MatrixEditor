import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Lang, { withLang } from 'containers/Lang';
import cssModules from 'react-css-modules';
import DialogHolder from 'components/Dialog';

import { toRouter } from '../../actions/router';
import { removeProjectRecord, loadProject } from '../../actions/project';

import styles from './index.scss';

class Open extends React.Component {
	constructor() {
		super();
		this.state = { projectPath: '' };
		this.projectUpdate = this.projectUpdate.bind(this);
		this.removeProject = this.removeProject.bind(this);
		this.openProject = this.openProject.bind(this);
	}

	projectUpdate(e) {
		this.setState({ projectPath: e.target.value });
	}

	removeProject(path) {
		const { dispatch } = this.props;
		dispatch(removeProjectRecord(path));
	}

	openProject(path) {
		const projectPath = typeof path === 'string' ? path : this.state.projectPath;
		const { dispatch, lang } = this.props;

		if (!projectPath) return;

		dispatch(loadProject(projectPath)).then(() => {
			dispatch(toRouter('/about'));
		}, (reject) => {
			this.dialog.show({
				title: lang('OPS'),
				content: lang(reject),
			});
			console.log('Reject:', reject);
		}, (notify) => {
			this.setState({ notify });
		});
	}

	render() {
		const { historyPathList, lang } = this.props;

		return (
			<div styleName="content">
				<h1><Lang id="OpenProject" />:</h1>

				<div className="input-group" styleName="open-group">
					<input type="text" value={this.state.projectPath} onChange={this.projectUpdate} />
					<button className="btn" onClick={this.openProject}><Lang id="Open" /></button>
				</div>
				<p>{this.state.notify || lang('openProject')}</p>

				<ul styleName="historyList">
					{historyPathList.map((path, index) => (
						<li key={index}>
							<button className="link fa fa-times" onClick={() => { this.removeProject(path); }} />
							<button className="link" onClick={() => { this.openProject(path); }}>{path}</button>
						</li>
					))}
				</ul>

				<DialogHolder ref={(node) => { this.dialog = node; }} {...this.state.dialog} />
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
