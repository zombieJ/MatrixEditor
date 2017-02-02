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

	closeDev = () => {
		const { dispatch, dev } = this.props;
		if (dev) dispatch(closeDev());
	};

	render() {
		const { hasHistory, hasFuture } = this.props;

		return (
			<div onClick={this.closeDev}>
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
								<a className="fa fa-undo" disabled={!hasHistory} onClick={this.onUndo} />
							</li>
							<li>
								<a className="fa fa-repeat" disabled={!hasFuture} onClick={this.onRedo} />
							</li>
						</ul>
					}
				</header>

				<section styleName="content">
					<Router />
				</section>
			</div>
		);
	}
}

Main.propTypes = {
	dispatch: PropTypes.func,
	hasHistory: PropTypes.bool,
	hasFuture: PropTypes.bool,
};

const mapState = ({ app: { dev }, history: { history, future } }) => ({
	dev,
	hasHistory: !!history.length,
	hasFuture: !!future.length,
});

export default connect(mapState)(cssModules(Main, styles, { allowMultiple: true }));
