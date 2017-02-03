import React, { PropTypes } from 'react';

const ACTIONS = ['onClick', 'onMouseDown', 'onChange'];

export const withProps = (Component) => {
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

export default withProps;
