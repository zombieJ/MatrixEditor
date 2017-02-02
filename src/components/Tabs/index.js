import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import styles from './index.scss';

import A from '../A';

class Tabs extends React.Component {
	constructor() {
		super();
		this.onTabClick = this.onTabClick.bind(this);
	}

	getTabList() {
		const { children } = this.props;
		return children ? React.Children.map(children, cell => cell.props) : [];
	};

	onTabClick(event, props) {
		const { selected = 0, onSwitchTab } = this.props;
		const index = props['data-index'];

		if (selected === index) return;

		if (onSwitchTab) onSwitchTab(index);
	}

	render() {
		const { selected = 0 } = this.props;
		const tabList = this.getTabList();

		return (
			<div styleName="tabs">
				<ul styleName="header">
					{tabList.map(({ title }, index) => (
						<li key={index} styleName={classNames(selected === index && 'active')}>
							<A onClick={this.onTabClick} data-index={index}>{title}</A>
						</li>
					))}
				</ul>
				<div styleName="content">
					<div styleName="content-wrap">
						{tabList[selected].children}
					</div>
				</div>
			</div>
		);
	}
}

Tabs.propTypes = {
	selected: PropTypes.number,
	children: PropTypes.node.isRequired,
	onSwitchTab: PropTypes.func,
};

export default cssModules(Tabs, styles);
