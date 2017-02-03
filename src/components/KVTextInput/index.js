import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';

import styles from './index.scss';

import withProps from '../PropsComponent';

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
		};
		this.prevValue = null;
		this.cacheList = [];
		this.latestPromise = null;

		this.onKeyDown = this.onKeyDown.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onOptionSelect = this.onOptionSelect.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.getList = this.getList.bind(this);
	}

	onChange = (event) => {
		const { onKVChange, path } = this.props;
		onKVChange(path, event.target.value);
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
			this.setState({ show: true });
		}

		if (onKeyDown) onKeyDown(event);
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
		const { kv, path } = this.props;
		return kv.get(path, false, '');
	}

	getList() {
		const { options } = this.props;
		const value = this.getValue();

		if (this.prevValue !== value) {
			if (Array.isArray(options)) {
				// If is Array, query inline
				const queryStr = String(value).toUpperCase();

				this.latestPromise = null;
				this.state.selected = 0;
				this.cacheList = options.filter((option) => {
					const optionEntity = typeof option === 'string' ? { value: option } : option;
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
		const { selected, show } = this.state;
		const props = Object.assign({}, this.props);
		delete props.kv;
		delete props.path;
		delete props.styles;
		delete props.options;
		delete props.onKVChange;

		return (
			<div styleName="input" className="clearfix">
				<input
					type="text"
					value={value}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					onBlur={this.onBlur}
					{...props}
				/>
				{show && list.length ? (
						<ul styleName="typeAhead-list">
							{list.map((option, index) => {
								const optionEntity = typeof option === 'string' ? { value: option } : option;

								return (
									<Li
										key={index} role="button" data-value={optionEntity.value}
										className={index === selected && 'active'}
										onMouseDown={this.onOptionSelect}
									>
										{optionEntity.item || optionEntity.description || optionEntity.value}
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
	onKeyDown: PropTypes.func,
	onKVChange: PropTypes.func,
	path: PropTypes.array,
};

export default cssModules(KVTextInput, styles);
