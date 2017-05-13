/**
 * Created by jiljiang on 2016/10/16.
 */

import React from 'react'; import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import $ from 'jquery';
import classNames from 'classnames';
import styles from './index.scss';

const buttonsConfirm = [
	{ name: 'Cancel', click: 'close' },
	{ name: 'Confirm', click: 'confirm' },
];
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
	componentWillMount() {
		setTimeout(() => {
			$(this.$content).find(':input:enabled:visible:first').focus();
		}, 0);
	}

	onButtonClick = (button) => {
		const { onClose, onConfirm, dialog } = this.props;
		let doClose = false;

		if (button.click === 'close') {
			doClose = true;
		} else if (button.click === 'confirm') {
			if (onConfirm) {
				const confirmRet = onConfirm(dialog);
				if (confirmRet !== false) doClose = true;
			}
		}

		if (doClose && onClose) onClose(dialog);
	};

	onBackgroundClick = () => {
		this.onButtonClick({ click: 'close' });
	};

	onDialogClick = (event) => {
		event.stopPropagation();
	};

	render() {
		const { title, content, footer, size, buttons, confirm } = this.props;
		const dlgButtons = buttons || (confirm ? buttonsConfirm : buttonsCancel);
		return (
			<div role="button" styleName="backdrop" onClick={this.onBackgroundClick}>
				<div role="button" styleName={classNames('dialog', size)} onClick={this.onDialogClick}>
					<h1 styleName="title">{title}</h1>
					<div styleName="content" ref={(e) => { this.$content = e; }}>{content}</div>
					<div styleName="footer">
						{footer || dlgButtons.map((button, btnIndex) => (
							<Button key={btnIndex} onClick={this.onButtonClick} button={button}>
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
	title: PropTypes.node,
	content: PropTypes.node,
	footer: PropTypes.node,
	size: PropTypes.string,
	buttons: PropTypes.arrayOf(PropTypes.shape({})),
	confirm: PropTypes.bool,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	dialog: PropTypes.shape({}),
};

const CSSDialog = cssModules(Dialog, styles, { allowMultiple: true });

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
