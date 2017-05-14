import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { updateConfig } from 'actions/config';
import Form from 'components/Form';
import Field from 'components/Form/Field';
import Lang from 'containers/Lang';

import styles from './index.scss';

class Config extends React.Component {
	constructor() {
		super();
		this.state = {
			config: {},
		};
	}

	componentWillMount() {
		this.reset();
	}

	componentWillReceiveProps(nextProps) {
		this.reset(nextProps);
	}

	onCancel = () => {
		this.reset();
	};

	onConfirm = () => {
		const { dispatch } = this.props;
		dispatch(updateConfig(this.state.config));
	};

	reset = (props) => {
		const { config } = props || this.props;

		this.setState({
			config: Object.assign({}, config),
		});
	};

	render() {
		return (
			<div styleName="config">
				<Form instance={this} path="config">
					<Field path="maxRedo" lang="MaxRedo" />
					<Field path="maxHistoryBackup" lang="MaxHistoryBackup" />
					<Field path="dotaPath" lang="DotaPath" descLang="dotaPath" />
				</Form>

				<div styleName="config-footer">
					<button className="btn" onClick={this.onCancel}><Lang id="Cancel" /></button>
					<button className="btn" onClick={this.onConfirm}><Lang id="Confirm" /></button>
				</div>
			</div>
		);
	}
}

Config.propTypes = {
	dispatch: PropTypes.func,
	config: PropTypes.object,
};

const mapState = ({ config }) => ({ config });

export default connect(mapState)(cssModules(Config, styles));
