import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { undo, redo } from '../../actions/history';

import Lang from '../../containers/Lang';
import Link from '../../containers/Router/Link';
import Router from '../router';

import styles from './index.scss';


import { init as intInit } from '../../actions/international';
import { init as configInit } from '../../actions/config';
import { init as projectInit } from '../../actions/project';

class Main extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(intInit());
		dispatch(configInit());
		dispatch(projectInit());
	}

	onUndo = () => {
		const { dispatch } = this.props;
		dispatch(undo());
	};

	onRedo = () => {
		const { dispatch } = this.props;
		dispatch(redo());
	};

	render() {
		const { hasHistory, hasFuture } = this.props;

		return (
			<div>
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
					<ul styleName="nav tool">
						<li>
							<a className="fa fa-undo" disabled={!hasHistory} onClick={this.onUndo} />
						</li>
						<li>
							<a className="fa fa-repeat" disabled={!hasFuture} onClick={this.onRedo} />
						</li>
					</ul>
				</header>

				<section>
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

const mapState = ({ history: { history, future } }) => ({
	hasHistory: !!history.length,
	hasFuture: !!future.length,
});

export default connect(mapState)(cssModules(Main, styles, { allowMultiple: true }));
