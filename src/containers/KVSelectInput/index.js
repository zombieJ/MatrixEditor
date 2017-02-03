import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { withLang } from '../../containers/Lang';

import styles from './index.scss';

class KVSelectInput extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onChange = (event) => {
		const value = event.target.value;
		const { onKVChange, path } = this.props;
		onKVChange(path, value !== '' ? value : null);
	};

	getValue = () => {
		const { kv, path } = this.props;
		return kv.get(path, false, '');
	};

	render() {
		const { lang, options, abbrFunc } = this.props;

		return (
			<select styleName="select-input" value={this.getValue()} onChange={this.onChange}>
				<option value="">{lang('DEFAULT')}</option>
				{options.map(({ value, recommend }, index) => (
					<option
						key={index}
						styleName={recommend ? 'recommend' : ''}
						value={value}
     >
						{lang(value)} ({abbrFunc ? abbrFunc(value) : value})
					</option>
					)
				)}
			</select>
		);
	}
}

KVSelectInput.propTypes = {
	options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
	kv: PropTypes.object.isRequired,
	path: PropTypes.array,
	lang: PropTypes.func,
	onKVChange: PropTypes.func,
	abbrFunc: PropTypes.func,
};

export default withLang(cssModules(KVSelectInput, styles));
