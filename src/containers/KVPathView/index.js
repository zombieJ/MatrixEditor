import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './index.scss';

import KVTextInput from '../../components/KVTextInput';
import { withLang } from '../Lang';

import { TYPE_TEXT } from '../../models/Base';

function getInputComponent(type) {
	switch (type) {
		case TYPE_TEXT:
		default:
			return KVTextInput;
	}
}

class KVPathView extends React.Component {
	constructor() {
		super();
		this.onKVChange = this.onKVChange.bind(this);
	}

	onKVChange(path, value) {
		const { onKVChange } = this.props;
		if (onKVChange) onKVChange(path, value);
	}

	render() {
		const { kv, lang, attrs } = this.props;

		return (
			<table className="table table-bordered" styleName="pathView">
				<tbody>
					<tr className="grid">
						<th width="1%" />
						<td />
					</tr>
					{attrs.map((attr, index) => {
						const Input = getInputComponent(attr.type);
						const path = attr.path || [attr.name];

						return (
							<tr key={index}>
								<th className="text-no-break" styleName="keyField">
									{lang(attr.name)}
									<span styleName="tips">{attr.name}</span>
								</th>
								<td styleName="valueField">
									<Input kv={kv} path={path} options={attr.options} onKVChange={this.onKVChange} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

KVPathView.propTypes = {
	lang: PropTypes.func,
	onKVChange: PropTypes.func,
	kv: PropTypes.object,
	attrs: PropTypes.array,
};

export default withLang(cssModules(KVPathView, styles));
