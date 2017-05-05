import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import Header from './Header';
import Empty from './Empty';

import styles from './index.scss';

class Avatar extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { selected, open, noHeader, isFolder, children } = this.props;
		let $children = null;

		if ((open || noHeader) && isFolder) {
			$children = (
				<div styleName="list">
					{children.length ? children : <Empty {...this.props} />}
				</div>
			);
		}

		return (
			<div
				styleName={classNames('avatar', {
					noHeader,
					selected,
				})}
			>
				<Header {...this.props} />

				{$children}
			</div>
		);
	}
}

Avatar.propTypes = {
	open: PropTypes.bool,
	noHeader: PropTypes.bool,
	isFolder: PropTypes.bool,
	selected: PropTypes.bool,
	children: PropTypes.node,
};

export default cssModules(Avatar, styles, { allowMultiple: true });
