import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import A from '../../components/A';

import styles from './index.scss';

class Event extends React.Component {
	constructor() {
		super();
		this.state = {
			tabIndex: 0,
		};
	}

	onSwitchTab = (event, props) => {
		const index = props['data-index'];
		this.setState({ tabIndex: index });
	};

	render() {
		const { tabIndex } = this.state;
		const { kv } = this.props;

		return (
			<div styleName="event">
				<ul className="nav-pills sm">
					<li className="active"><a className="fa fa-plus" /></li>
					{kv.value.map((actionKV, index) => (
						<li key={index} className={classNames(index === tabIndex && 'active')}>
							<A onClick={this.onSwitchTab} data-index={index}>{actionKV.key}</A>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

Event.propTypes = {
	kv: PropTypes.object,
};

export default cssModules(Event, styles);
