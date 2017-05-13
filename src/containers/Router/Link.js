import React from 'react'; import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toRouter } from '../../actions/router';

class Link extends React.Component {
	onClick = (event) => {
		const { dispatch, to, onClick } = this.props;
		if (onClick) onClick(event);

		dispatch(toRouter(to));
	};

	render() {
		const { children, ...props } = this.props;
		delete props.dispatch;
		delete props.to;

		return (
			<a role="button" {...props} onClick={this.onClick}>{children}</a>
		);
	}
}

Link.propTypes = {
	dispatch: PropTypes.func,
	to: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	children: PropTypes.node,
};

export default connect()(Link);
