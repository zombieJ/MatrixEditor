import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import { DragDropContext as dragDropContext, DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { KV_MOVE_UP, KV_MOVE_BOTTOM } from '../../actions/kv';
import styles from './index.scss';

export const DRAG_TYPE = 'AVATAR';
export const ddc = dragDropContext(HTML5Backend);

const avatarSource = {
	beginDrag(props) {
		return {
			id: props.id,
			isFolder: props.isFolder,
		};
	},

	/* canDrag(props) {
		return !props.isFolder;
	}, */
};

const avatarTarget = {
	hover(dropProps, monitor, component) {
		let hover = null;

		const dragProps = monitor.getItem();
		const { lastComponent } = dragProps;

		if (lastComponent && lastComponent !== component) {
			lastComponent.setState({ hover: null });
		}

		if (
			dragProps.id === dropProps.id ||
			dragProps.isFolder !== dropProps.isFolder
		) return;

		const clientOffset = monitor.getClientOffset();
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Notice target hover
		if (hoverClientY < hoverBoundingRect.height / 2) {
			hover = KV_MOVE_UP;
			if (component.state.hover !== KV_MOVE_UP) component.setState({ hover: KV_MOVE_UP });
		} else {
			hover = KV_MOVE_BOTTOM;
			if (component.state.hover !== KV_MOVE_BOTTOM) component.setState({ hover: KV_MOVE_BOTTOM });
		}

		dragProps.lastComponent = component;
		dragProps.hover = hover;
	},

	drop(props, monitor, component) {
		const dragProps = monitor.getItem();
		const { hover } = dragProps;

		component.setState({ hover: null });

		props.onItemMove(dragProps.id, props.id, hover);
	},

	canDrop(dropProps, monitor) {
		const dragProps = monitor.getItem();
		const sameComponent = dragProps.id === dropProps.id;
		const sameType = dragProps.isFolder === dropProps.isFolder;

		return !sameComponent && sameType;
	},
};

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			hover: null,
		};
	}

	onItemClick = () => {
		const { onItemClick } = this.props;
		if (onItemClick) onItemClick(this.props);
	};

	onItemDblClick = () => {
		const { onItemDblClick } = this.props;
		if (onItemDblClick) onItemDblClick(this.props);
	};

	render() {
		const { hover } = this.state;
		const { noHeader, isFolder, open, name, comment } = this.props;
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

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

		return connectDragSource(connectDropTarget(
				!noHeader ?
				<div
					styleName={classNames('header', {
						'hover-top': hover === KV_MOVE_UP,
						'hover-bottom': hover === KV_MOVE_BOTTOM,
					})}
					style={{ opacity }}
					className="clearfix" role="button"
					onClick={this.onItemClick}
					onDoubleClick={this.onItemDblClick}
				>
					<div styleName="icon">
						{$icon}
					</div>
					<div styleName="info">
						<h3 styleName="title">{name || '\u00A0'}</h3>
						<p styleName="comment">{comment || '\u00A0'}</p>
					</div>
				</div> : null
		));
	}
}

Header.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,

	noHeader: PropTypes.bool,
	onItemClick: PropTypes.func,
	onItemDblClick: PropTypes.func,
	onItemMove: PropTypes.func,	// eslint-disable-line react/no-unused-prop-types
	isFolder: PropTypes.bool,
	open: PropTypes.bool,
	name: PropTypes.string,
	comment: PropTypes.string,
};

const dt = dropTarget(DRAG_TYPE, avatarTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}));
const ds = dragSource(DRAG_TYPE, avatarSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}));

const DndHeader = ddc(ds(dt(cssModules(Header, styles, { allowMultiple: true }))));

export default DndHeader;
