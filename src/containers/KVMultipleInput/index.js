import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import { withLang } from '../Lang';
import A from '../../components/A';

import styles from './index.scss';

class KVMultiplePanel extends React.Component {
	constructor() {
		super();
		this.state = {
			valueMap: {},
		};
		this.triggerOption = this.triggerOption.bind(this);
	}

	componentWillMount() {
		const { values } = this.props;
		const valueMap = {};
		values.forEach((value) => {
			valueMap[value] = true;
		});
		this.setState({ valueMap });
	}

	getValues = () => {
		const { valueMap } = this.state;
		return Object.keys(valueMap)
			.filter(key => valueMap[key]);
	};

	triggerOption(event, props) {
		const { valueMap } = this.state;
		const { options = [] } = this.props;
		const index = props['data-index'];
		const option = options[index] || {};

		valueMap[option.value] = !valueMap[option.value];

		this.setState({ valueMap });
	}

	render() {
		const { valueMap } = this.state;
		const { lang, options = [], abbrFunc } = this.props;
		return (
			<ul styleName="multi-panel">
				{options.map(({ value, recommend }, index) => (
					<li
						key={index}
						styleName={classNames(valueMap[value] && 'active', recommend && 'recommend')}
					>
						<A onClick={this.triggerOption} data-index={index}>
							<p>{abbrFunc ? abbrFunc(value) : value}</p>
							<h3>{lang(value) || value}</h3>
						</A>
					</li>
				))}
			</ul>
		);
	}
}

KVMultiplePanel.propTypes = {
	values: PropTypes.array,
	options: PropTypes.array,
	abbrFunc: PropTypes.func,
	lang: PropTypes.func,
};

const CssKVMultiplePanel = cssModules(KVMultiplePanel, styles, { allowMultiple: true });

class KVMultipleInput extends React.Component {
	constructor() {
		super();
		this.onEdit = this.onEdit.bind(this);
	}

	onEdit() {
		const { onKVChange, lang, path, options, abbrFunc } = this.props;
		const title = path[path.length - 1];
		this.context.showDialog(
			lang(title) || title,
			<CssKVMultiplePanel
				ref={(panel) => { this.panel = panel; }}
				options={options} abbrFunc={abbrFunc} lang={lang}
				values={this.getValues()}
			/>
		).then(() => {
			const newValues = this.panel.getValues().join(' | ');
			if (this.getValues().join(' | ') !== newValues) {
				onKVChange(path, newValues);
			}
		}, () => {});
	}

	getValues = () => {
		const { kv, path } = this.props;
		const value = kv.get(path, false, '');
		if (!(value || '').trim()) return [];
		return value.split(/\s*\|\s*/);
	};

	render() {
		const { lang } = this.props;
		const values = this.getValues();

		const list = values.map(val => lang(val) || val);

		return (
			<ul role="button" styleName="multi-input" onClick={this.onEdit}>
				{list.map(val => (
					<li key={val} styleName="label">{val}</li>
				))}
				{!list.length &&
					<li>[{lang('EmptyList')}]</li>
				}
			</ul>
		);
	}
}

KVMultipleInput.propTypes = {
	kv: PropTypes.object.isRequired,
	path: PropTypes.array,
	lang: PropTypes.func,
	options: PropTypes.array,
	abbrFunc: PropTypes.func,
	onKVChange: PropTypes.func,
};

KVMultipleInput.contextTypes = {
	showDialog: PropTypes.func,
};

export default withLang(cssModules(KVMultipleInput, styles));
