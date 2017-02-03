import React, { PropTypes } from 'react';

class A extends React.Component {
	onClick = (event) => {
		const { onClick } = this.props;
		if (onClick) onClick(event, this.props);
	};

	render() {
		return (
			<a role="button" {...this.props} onClick={this.onClick} />
		);
	}
}

A.propTypes = {
	onClick: PropTypes.func,
};

export default A;
