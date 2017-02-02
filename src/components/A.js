import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';

class A extends React.Component {
	constructor() {
		super();
	}

	onClick = (event) => {
		const { onClick } = this.props;
		if (onClick) onClick(event, this.props);
	};

	render() {
		return (
			<a {...this.props} onClick={this.onClick} />
		);
	}
}

A.propTypes = {
	onClick: PropTypes.func,
};

export default A;
