import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { undo, redo } from '../../actions/history';

import Lang from '../../containers/Lang';
import Link from '../../containers/Router/Link';
import Router from '../router';

import styles from './index.scss';

import { initApplication, closeDev } from '../../actions/app';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			showDialog: false,
		};
		this.showDialog = this.showDialog.bind(this);
	}

	getChildContext() {
		return { showDialog: this.showDialog };
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(initApplication());
	}

	onUndo = () => {
		const { dispatch } = this.props;
		dispatch(undo());
	};

	onRedo = () => {
		const { dispatch } = this.props;
		dispatch(redo());
	};

	showDialog(title, content) {
		this.setState({
			showDialog: true,
			dialogTitle: title,
			dialogContent: content,
		});
	}

	closeDev = () => {
		const { dispatch, dev } = this.props;
		if (dev) dispatch(closeDev());
	};

	render() {
		const { showDialog, dialogTitle, dialogContent } = this.state;
		const { hasHistory, hasFuture } = this.props;

		return (
			<div role="button" onClick={this.closeDev}>
				<header className="panel" styleName="header">
					<Link to="/" styleName="title">
						<Lang id="Title" />
					</Link>
					<ul styleName="nav">
						<li><Link to="/ability"><Lang id="Ability" /></Link></li>
						<li><Link to="/item"><Lang id="Item" /></Link></li>
						<li><Link to="/about"><Lang id="About" /></Link></li>
						<li><Link to="/dev"><Lang id="Develop" /></Link></li>
					</ul>
					{(hasHistory || hasFuture) &&
						<ul styleName="nav tool">
							<li>
								<a role="button" className="fa fa-undo" disabled={!hasHistory} onClick={this.onUndo} />
							</li>
							<li>
								<a role="button" className="fa fa-repeat" disabled={!hasFuture} onClick={this.onRedo} />
							</li>
						</ul>
					}
				</header>

				<section styleName="content">
					<Router />
				</section>

				{showDialog &&
					<div styleName="dialog-container">
						<div styleName="dialog" className="panel">
							<div styleName="dialog-title">
								<h1>{dialogTitle}</h1>
							</div>
							<div styleName="dialog-body">
								{dialogContent}
							</div>
							<div styleName="dialog-footer">
								Body
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

Main.propTypes = {
	dispatch: PropTypes.func,
	hasHistory: PropTypes.bool,
	hasFuture: PropTypes.bool,
	dev: PropTypes.bool,
};

Main.childContextTypes = {
	showDialog: React.PropTypes.func,
};

const mapState = ({ app: { dev }, history: { history, future } }) => ({
	dev,
	hasHistory: !!history.length,
	hasFuture: !!future.length,
});

export default connect(mapState)(cssModules(Main, styles, { allowMultiple: true }));
