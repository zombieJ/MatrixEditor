/**
 * Created by jiljiang on 2016/10/12.
 */

import React, { PropTypes } from 'react';
import { Match, Link } from 'react-router';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Lang from 'containers/Lang';
import Home from '../Home';
import Open from '../Open';
import Ability from '../Ability';

import styles from './index.scss';


import { init as intInit } from '../../actions/international';
import { init as configInit } from '../../actions/config';

class Main extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(intInit());
		dispatch(configInit());
	}

	render() {
		return (
			<div>
				<header styleName="header">
					<Link to="/" styleName="title">
						<Lang id="Title" />
					</Link>
					<ul styleName="nav">
						<li><Link to="/ability"><Lang id="Ability" /></Link></li>
						<li><Link to="/item"><Lang id="Item" /></Link></li>
					</ul>
				</header>

				<section>
					<Match pattern="/" exactly component={Home} />
					<Match pattern="/open" component={Open} />
					<Match pattern="/ability" component={Ability} />
				</section>
			</div>
		);
	}
}

Main.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(cssModules(Main, styles));
