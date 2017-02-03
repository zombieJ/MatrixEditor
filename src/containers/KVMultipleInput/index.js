import React, { PropTypes } from 'react';
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
				{options.map(({ value }, index) => (
					<li key={index} styleName={valueMap[value] ? 'active' : ''}>
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

const CssKVMultiplePanel = withLang(cssModules(KVMultiplePanel, styles));

class KVMultipleInput extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.onEdit = this.onEdit.bind(this);
	}

	onEdit() {
		const { lang, path, options, abbrFunc } = this.props;
		const title = path[path.length - 1];
		this.context.showDialog(
			lang(title) || title,
			<CssKVMultiplePanel
				options={options} abbrFunc={abbrFunc}
				values={this.getValues()}
			/>
		);
	}

	getValues = () => {
		const { kv, path } = this.props;
		const value = kv.get(path, false, '');
		return value.split(/\s*\|\s*/);
	};

	render() {
		const { lang } = this.props;
		const values = this.getValues();

		const list = values.map(val => lang(val) || val);

		return (
			<ul styleName="multi-input">
				<li styleName="opt"><a className="fa fa-edit" onClick={this.onEdit} /></li>
				{list.map(val => (
					<li key={val} styleName="label">{val}</li>
				))}
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
};

KVMultipleInput.contextTypes = {
	showDialog: PropTypes.func,
};

export default withLang(cssModules(KVMultipleInput, styles));
