import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Lang from 'containers/Lang';
import Router from '../router';

import styles from './index.scss';


import { init as intInit } from '../../actions/international';
import { init as configInit } from '../../actions/config';
import { init as projectInit } from '../../actions/project';

class Main extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(intInit());
		dispatch(configInit());
		dispatch(projectInit());
	}

	render() {
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
};

export default connect()(cssModules(Main, styles));
