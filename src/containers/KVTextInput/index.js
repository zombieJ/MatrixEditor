import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cssModules from 'react-css-modules';

import withProps from '../../components/PropsComponent';
import { withLang } from '../../containers/Lang';

import styles from './index.scss';

const Li = withProps(({ children, ...props }) => (
	<li {...props}>{children}</li>
));

Li.propTypes = {
	children: PropTypes.node,
};

class KVTextInput extends React.Component {
	constructor() {
		super();
		this.state = {
			selected: 0,
			show: false,
			value: '',
		};
		this.prevValue = null;
		this.cacheList = [];
		this.latestPromise = null;

		this.asyncId = -1;

		this.onKeyDown = this.onKeyDown.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onOptionSelect = this.onOptionSelect.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.getList = this.getList.bind(this);
		this.getPropValue = this.getPropValue.bind(this);
	}

	componentWillMount() {
		this.setState({ value: this.getPropValue() });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.kv === this.props.kv) return;
		this.setState({ value: this.getPropValue(nextProps) });
	}

	onChange = (event) => {
		const value = event.target.value;
		this.setState({ value });

		clearTimeout(this.asyncId);
		this.asyncId = setTimeout(() => {
			if (this.state.value === this.getPropValue(this.props)) return;

			const { onKVChange, path } = this.props;
			onKVChange(path, value);
		}, 100);
	};

	onKeyDown = (event) => {
		const { onKeyDown } = this.props;

		if (event.keyCode === 38) {
			this.setSelect(-1);
		} else if (event.keyCode === 40) {
			this.setSelect(1);
		} else if (event.keyCode === 13) {
			const { selected } = this.state;
			const list = this.getList();
			const option = list[selected];
			if (option) {
				this.updateValue(option.value);
			}
		} else {
			this.showList();
		}

		if (onKeyDown) onKeyDown(event);
	};

	onFocus = () => {
		this.showList();
	};

	onBlur() {
		this.setState({ show: false });
	}

	onOptionSelect(event, props) {
		const value = props['data-value'];
		this.updateValue(value);
	}

	setSelect(value) {
		const { selected } = this.state;
		const len = this.getList().length;

		this.setState({
			selected: (selected + value + len) % len,
		});
	}

	getValue() {
		return this.state.value;
	}

	getList() {
		const { options, lang } = this.props;
		const value = this.getValue();

		if (this.prevValue !== value) {
			if (Array.isArray(options)) {
				// If is Array, query inline
				const queryStr = String(value).toUpperCase();

				this.latestPromise = null;
				this.state.selected = 0;
				this.cacheList = options.filter((option) => {
					const optionEntity = typeof option === 'string' ? { value: option } : option;
					optionEntity.description = optionEntity.description || lang(optionEntity.value);

					return String(optionEntity.item || '').toUpperCase().indexOf(queryStr) >= 0 ||
						String(optionEntity.description || '').toUpperCase().indexOf(queryStr) >= 0 ||
						String(optionEntity.value || '').toUpperCase().indexOf(queryStr) >= 0;
				});
			} else if (typeof options === 'function') {
				// Call provided function. Support promise result
				const result = options(value) || [];
				if (result.then) {
					this.latestPromise = result;
					result.then((list) => {
						if (this.latestPromise !== result) return;

						this.cacheList = list;
						this.state.selected = 0;
						this.forceUpdate();
					});
				} else {
					this.latestPromise = null;
					this.cacheList = result;
					this.state.selected = 0;
				}
			}
			this.prevValue = value;
		}
		return this.cacheList;
	}

	getPropValue(props) {
		const { kv, path } = props || this.props;
		return kv.get(path) || '';
	}

	showList = () => {
		const state = { show: true };
		const react = this.input.getBoundingClientRect();
		if (react.bottom < window.innerHeight / 2) {
			state.displayInTop = false;
		} else {
			state.displayInTop = true;
		}
		this.setState(state);
	};

	updateValue(value) {
		const mockEvent = {
			type: 'change',
			target: {
				value,
			},
		};
		this.onChange(mockEvent);
		this.setState({ show: false });
	}

	render() {
		const value = this.getValue();

		const list = this.getList();
		const { selected, show, displayInTop } = this.state;

		return (
			<div styleName="input" className="clearfix">
				<input
					type="text"
					value={value}
					ref={(input) => { this.input = input; }}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
				/>
				{show && list.length ? (
					<ul styleName={classNames('typeAhead-list', displayInTop && 'top')}>
						{list.map((option, index) => {
							const optionEntity = typeof option === 'string' ? { value: option } : option;
							let $context = null;
							if (optionEntity.item) {
								$context = optionEntity.item;
							} else if (optionEntity.description) {
								$context = `${optionEntity.description} (${optionEntity.value})`;
							} else {
								$context = optionEntity.value;
							}

							return (
								<Li
									key={index} role="button" data-value={optionEntity.value}
									styleName={index === selected && 'active'}
									onMouseDown={this.onOptionSelect}
								>
									{$context}
								</Li>
								);
						})}
					</ul>
					) : null}
			</div>
		);
	}
}

KVTextInput.propTypes = {
	options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
	kv: PropTypes.object.isRequired,
	path: PropTypes.array,
	lang: PropTypes.func,
	onKeyDown: PropTypes.func,
	onKVChange: PropTypes.func,
};

export default withLang(cssModules(KVTextInput, styles, { allowMultiple: true }));
