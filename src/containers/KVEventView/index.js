import React from 'react'; import PropTypes from 'prop-types';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import { getEventList } from '../../models/Event';

import A from '../../components/A';
import Event from '../../components/Event';

import styles from './index.scss';

class KVEventView extends React.Component {
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

		// Get event key index list
		const eventList = getEventList(kv);
		const currentEventKV = kv.value.get(eventList.get(tabIndex));
		console.log('Current:', currentEventKV);

		return (
			<div>
				<ul className="nav-pills">
					<li className="active"><a className="fa fa-plus" /></li>
					{eventList.map((kvIndex, index) => {
						const eventKV = kv.value.get(kvIndex);
						console.log(eventKV.value);

						return (
							<li key={kvIndex} className={classNames(index === tabIndex && 'active')}>
								<A onClick={this.onSwitchTab} data-index={index}>{eventKV.key}</A>
							</li>
						);
					})}
				</ul>

				<Event kv={currentEventKV} />
			</div>
		);
	}
}

KVEventView.propTypes = {
	kv: PropTypes.object,
};

export default cssModules(KVEventView, styles);
