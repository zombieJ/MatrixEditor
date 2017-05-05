import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import { DropTarget as dropTarget } from 'react-dnd';

import { ddc, DRAG_TYPE } from './Header';

import Lang from '../../containers/Lang';

import styles from './index.scss';

const emptyTarget = {
	hover(props, monitor, component) {
		// let hover = null;

		const dragId = monitor.getItem().id;
		const hoverId = props.id;

		const { lastComponent } = monitor.getItem();

		if (lastComponent && lastComponent !== component) {
			lastComponent.setState({ hover: null });
		}

		if (dragId === hoverId) return;

		component.setState({ hover: true });
		monitor.getItem().lastComponent = component;
	},

	drop(props, monitor, component) {
		const dragId = monitor.getItem().id;
		const hoverId = props.id;

		component.setState({ hover: null });

		if (dragId === hoverId) return;

		props.onItemMoveIn(dragId, hoverId);
	},
};

class Empty extends React.Component {
	constructor() {
		super();
		this.state = {
			hover: null,
		};
	}

	render() {
		const { hover } = this.state;
		const { connectDropTarget } = this.props;

		return connectDropTarget(
			<div styleName={classNames('tips', { hover })}>
				<span className="fa fa-info-circle" />
				<Lang className="text-muted" id="EmptyList" />
			</div>
		);
	}
}

Empty.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	onItemMoveIn: PropTypes.func,	// eslint-disable-line react/no-unused-prop-types
};

const dt = dropTarget(DRAG_TYPE, emptyTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}));

export default ddc(dt(cssModules(Empty, styles, { allowMultiple: true })));
