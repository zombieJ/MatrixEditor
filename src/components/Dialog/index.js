/**
 * Created by jiljiang on 2016/10/16.
 */

import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
// import classnames from 'classnames';
import styles from './index.scss';

const buttonsConfirm = [];
const buttonsCancel = [
	{ name: 'OK', click: 'close' },
];

class Button extends React.Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const { onClick, button } = this.props;
		onClick(button);
	}

	render() {
		return (
			<button className="btn" onClick={this.onClick}>
				{this.props.children}
			</button>
		);
	}
}

Button.propTypes = {
	onClick: PropTypes.func,
	button: PropTypes.shape({}),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

class Dialog extends React.Component {
	constructor() {
		super();
		this.buttonClick = this.buttonClick.bind(this);
	}

	buttonClick(button) {
		const { onClose, dialog } = this.props;

		if (button.click === 'close') {
			if (onClose) onClose(dialog);
		}
	}

	render() {
		const { title, content, buttons, confirm } = this.props;
		const dlgButtons = buttons || (confirm ? buttonsConfirm : buttonsCancel);
		return (
			<div styleName="container">
				<div styleName="backdrop" />
				<div styleName="dialog">
					<h1 styleName="title">{title}</h1>
					<div styleName="content">{content}</div>
					<div styleName="footer">
						{dlgButtons.map((button, btnIndex) => (
							<Button key={btnIndex} onClick={this.buttonClick} button={button}>
								{button.name}
							</Button>
						))}
					</div>
				</div>
			</div>
		);
	}
}

Dialog.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string,
	buttons: PropTypes.arrayOf(PropTypes.shape({})),
	confirm: PropTypes.bool,
	onClose: PropTypes.func,
	dialog: PropTypes.shape({}),
};

const CSSDialog = cssModules(Dialog, styles);

class DialogHolder extends React.Component {
	constructor() {
		super();
		this.state = { list: [] };
		this.show = this.show.bind(this);
		this.close = this.close.bind(this);
	}

	show(dialog) {
		let { list } = this.state;
		list = list.concat(dialog);
		this.setState({ list });
	}

	close(dialog) {
		let { list } = this.state;
		list = list.filter(dlg => dlg !== dialog);
		this.setState({ list });
	}

	render() {
		const { list } = this.state;

		return (
			<div>
				{list.map((dialog, index) => (
					<CSSDialog key={index} {...dialog} dialog={dialog} onClose={this.close} />
				))}
			</div>
		);
	}
}

DialogHolder.propTypes = {};

export default cssModules(DialogHolder, styles);
