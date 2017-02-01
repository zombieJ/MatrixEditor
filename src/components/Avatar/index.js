import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import { DragDropContext as dragDropContext, DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Lang from '../../containers/Lang';
import styles from './index.scss';

const DRAG_TYPE = 'AVATAR';
const HOVER_NONE = null;
const HOVER_TOP = 'top';
const HOVER_BOTTOM = 'bottom';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
};

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
		let hover = HOVER_NONE;

		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		const { lastComponent } = monitor.getItem();

		if (lastComponent && lastComponent !== component) {
			lastComponent.setState({ hover: HOVER_NONE });
		}

		if (props.isFolder || dragIndex === hoverIndex) {
			return;
		}

		const clientOffset = monitor.getClientOffset();
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // eslint-disable-line
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Notice target hover
		if (hoverClientY < hoverBoundingRect.height / 2) {
			hover = HOVER_TOP;
			if (component.state.hover !== HOVER_TOP) component.setState({ hover: HOVER_TOP });
		} else {
			hover = HOVER_BOTTOM;
			if (component.state.hover !== HOVER_BOTTOM) component.setState({ hover: HOVER_BOTTOM });
		}

		/*
		// Time to actually perform the action
		props.onItemMove(dragIndex, hoverIndex);
		*/

		monitor.getItem().lastComponent = component;
		monitor.getItem().hover = hover;
	},

	drop(props, monitor, component) {
		const hover = monitor.getItem().hover;

		const dragId = monitor.getItem().id;
		const hoverId = props.id;

		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		component.setState({ hover: HOVER_NONE });

		if (props.isFolder || dragIndex === hoverIndex) {
			return;
		}

		console.log('Drop!!!', hover);
	},
};

class Avatar extends React.Component {
	constructor() {
		super();
		this.state = {
			hover: HOVER_NONE,
		};
		this.onItemClick = this.onItemClick.bind(this);
	}

	onItemClick() {
		const { onItemClick } = this.props;
		if (onItemClick) onItemClick(this.props);
	}

	render() {
		const { hover } = this.state;
		const { isFolder, open, name, comment, children } = this.props;
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

		return connectDragSource(connectDropTarget(
			<div
				styleName={classNames('avatar', {
					'hover-top': hover === HOVER_TOP,
					'hover-bottom': hover === HOVER_BOTTOM,
				})}
				style={{ opacity }}
			>
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
		));
	}
}

Avatar.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,

	onItemClick: PropTypes.func,
	onItemMove: PropTypes.func,
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
