import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import Header from './Header';
import Lang from '../../containers/Lang';

import styles from './index.scss';

class Avatar extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { open, noHeader, isFolder, children } = this.props;
		let $children = null;

		if ((open || noHeader) && isFolder) {
			$children = (
				<div styleName="list">
					{children.length ? children : (
						<span styleName="tips">
							<span className="fa fa-info-circle" />
							<Lang className="text-muted" id="EmptyList" />
						</span>
					)}
				</div>
			);
		}

		return (
			<div
				styleName={classNames('avatar', {
					noHeader,
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
