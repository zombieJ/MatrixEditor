import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import { DragDropContext as dragDropContext, DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { KV_MOVE_UP, KV_MOVE_BOTTOM } from '../../actions/kv';
import Lang from '../../containers/Lang';
import styles from './index.scss';

const DRAG_TYPE = 'AVATAR';

const avatarSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		};
	},

	canDrag(props) {
		return !props.isFolder;
	},
};

const avatarTarget = {
	hover(props, monitor, component) {
		let hover = null;

		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		const { lastComponent } = monitor.getItem();

		if (lastComponent && lastComponent !== component) {
			lastComponent.setState({ hover: null });
		}

		if (props.isFolder || dragIndex === hoverIndex) {
			return;
		}

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

		monitor.getItem().lastComponent = component;
		monitor.getItem().hover = hover;
	},

	drop(props, monitor, component) {
		const hover = monitor.getItem().hover;

		const dragId = monitor.getItem().id;
		const hoverId = props.id;

		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		component.setState({ hover: null });

		if (props.isFolder || dragIndex === hoverIndex) {
			return;
		}

		props.onItemMove(dragId, hoverId, hover);
	},
};

class Avatar extends React.Component {
	constructor() {
		super();
		this.state = {
			hover: null,
		};
		this.onItemClick = this.onItemClick.bind(this);
	}

	onItemClick() {
		const { onItemClick } = this.props;
		if (onItemClick) onItemClick(this.props);
	}

	render() {
		const { hover } = this.state;
		const { selected, noHeader, isFolder, open, name, comment, children } = this.props;
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

		return connectDragSource(connectDropTarget(
			<div
				styleName={classNames('avatar', {
					'hover-top': hover === KV_MOVE_UP,
					'hover-bottom': hover === KV_MOVE_BOTTOM,
					noHeader,
					selected,
				})}
				style={{ opacity }}
			>
				{!noHeader &&
					<div styleName="header" className="clearfix" role="button" onClick={this.onItemClick}>
						<div styleName="icon">
							{$icon}
						</div>
						<div styleName="info">
							<h3 styleName="title">{name || '\u00A0'}</h3>
							<p styleName="comment">{comment || '\u00A0'}</p>
						</div>
					</div>
				}

				{$children}
			</div>
		));
	}
}

Avatar.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,

	selected: PropTypes.bool,
	noHeader: PropTypes.bool,
	onItemClick: PropTypes.func,
	onItemMove: PropTypes.func,	// eslint-disable-line react/no-unused-prop-types
	isFolder: PropTypes.bool,
	open: PropTypes.bool,
	name: PropTypes.string,
	comment: PropTypes.string,
	children: PropTypes.node,
};

const dt = dropTarget(DRAG_TYPE, avatarTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}));
const ds = dragSource(DRAG_TYPE, avatarSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}));
const ddc = dragDropContext(HTML5Backend);

export default ddc(ds(dt(cssModules(Avatar, styles, { allowMultiple: true }))));
