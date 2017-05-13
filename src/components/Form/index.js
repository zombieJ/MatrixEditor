import React from 'react'; import PropTypes from 'prop-types';

class Form extends React.Component {
	getChildContext() {
		return {
			getComponent: () => this.props.instance,
			getPath: () => this.props.path,
		};
	}

	render() {
		const { children } = this.props;
		return <div>{children}</div>;
	}
}

Form.propTypes = {
	instance: PropTypes.object,
	path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	children: PropTypes.node,
};

Form.childContextTypes = {
	getComponent: PropTypes.func,
	getPath: PropTypes.func,
};

export default Form;
