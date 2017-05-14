import React from 'react'; import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import { getValue, updateValue, toPath } from 'utils/pathUtil';
import { withLang } from 'containers/Lang';

import styles from './index.scss';

class Field extends React.Component {
	onChange = ({ target: { value } }) => {
		const instance = this.context.getComponent();
		const path = this.context.getPath();
		instance.setState((preState) => {
			const newState = updateValue(preState, toPath(path, this.props.path), () => value);
			return newState;
		});
	};

	getFieldValue = () => {
		const instance = this.context.getComponent();
		const path = this.context.getPath();
		const form = getValue(instance.state, path);
		return getValue(form, this.props.path);
	};

	render() {
		const { getLang, lang, descLang } = this.props;
		const innerName = toPath(this.props.path).join('_');
		let title;
		let description = '';

		if (lang) {
			title = getLang(lang);
		} else {
			title = innerName;
		}
		if (descLang) {
			description = getLang(descLang);
		}

		return (
			<div styleName="form-field">
				<label htmlFor={innerName}>{title}</label>
				<input
					type="text" id={innerName} value={this.getFieldValue()} placeholder={description}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

Field.propTypes = {
	getLang: PropTypes.func,
	lang: PropTypes.string,
	descLang: PropTypes.string,
	path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

Field.contextTypes = {
	getComponent: PropTypes.func,
	getPath: PropTypes.func,
};

const LangField = withLang(cssModules(Field, styles), 'getLang');

export default props => (
	<LangField {...props} fieldRefreshTimestamp={Date.now()} />
);
