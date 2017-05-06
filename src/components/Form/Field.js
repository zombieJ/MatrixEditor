import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { getValue, updateValue, toPath } from 'utils/pathUtil';
import Lang from 'containers/Lang';

import styles from './index.scss';

class Field extends React.Component {
	onChange = ({ target: { value } }) => {
		const instance = this.context.getComponent();
		const path = this.context.getPath();
		instance.setState(preState => (
			updateValue(preState, toPath(path, this.props.path), () => value)
		));
	};

	getFieldValue = () => {
		const instance = this.context.getComponent();
		const path = this.context.getPath();
		const form = getValue(instance.state, path);
		return getValue(form, this.props.path);
	};

	render() {
		const { lang } = this.props;
		const innerName = toPath(this.props.path).join('_');
		let $title;
		if (lang) {
			$title = <Lang id={lang} />;
		} else {
			$title = innerName;
		}

		return (
			<div styleName="form-field">
				<label htmlFor={innerName}>{$title}</label>
				<input type="text" id={innerName} value={this.getFieldValue()} onChange={this.onChange} />
			</div>
		);
	}
}

Field.propTypes = {
	lang: PropTypes.string,
	path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

Field.contextTypes = {
	getComponent: PropTypes.func,
	getPath: PropTypes.func,
};

export default cssModules(Field, styles);
