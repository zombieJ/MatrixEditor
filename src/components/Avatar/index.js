import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import Lang from '../../containers/Lang';
import styles from './index.scss';

class Avatar extends React.Component {
	constructor() {
		super();
		this.onItemClick = this.onItemClick.bind(this);
	}

	onItemClick() {
		const { onItemClick } = this.props;
		if (onItemClick) onItemClick(this.props);
	}

	render() {
		const { isFolder, open, name, comment, children } = this.props;

		let $icon = null;
		if (isFolder) {
			$icon = (
				<span
					className={classNames('fa', {
						'fa-folder': !open,
						'fa-folder-open': open,
					})}
				/>
			);
		}

		let $children = null;
		if (open && isFolder) {
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
			<div styleName="avatar">
				<div styleName="header" role="button" onClick={this.onItemClick}>
					<div styleName="icon">
						{$icon}
					</div>
					<div styleName="info">
						<h3 styleName="title">{name}</h3>
						<p styleName="comment">{comment}</p>
					</div>
				</div>

				{$children}
			</div>
		);
	}
}

Avatar.propTypes = {
	onItemClick: PropTypes.func,
	isFolder: PropTypes.bool,
	open: PropTypes.bool,
	name: PropTypes.string,
	comment: PropTypes.string,
	children: PropTypes.node,
};

export default cssModules(Avatar, styles);
