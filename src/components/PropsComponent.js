import React from 'react'; import PropTypes from 'prop-types';

const ACTIONS = ['onClick', 'onMouseDown', 'onChange'];

export default (Component) => {
	class PropsComponent extends React.Component {
		constructor() {
			super();

			ACTIONS.forEach((actionName) => {
				this[actionName] = (proxy, ...args) => {
					const action = this.props[actionName];

					if (action) {
						action(proxy, this.props, ...args);
					}
				};
			});
		}

		render() {
			const { children, ...props } = this.props;
			ACTIONS.forEach((actionName) => {
				props[actionName] = this[actionName];
			});

			return (
				<Component {...props} >
					{children}
				</Component>
			);
		}
	}

	PropsComponent.displayName = Component.displayName || Component.name;

	PropsComponent.propTypes = {
		onClick: PropTypes.func,
		onChange: PropTypes.func,
		children: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.element,
		]),
	};

	return PropsComponent;
};
