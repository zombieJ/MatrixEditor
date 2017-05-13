import React from 'react'; import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { redirectRouter } from '../../actions/router';

class Redirect extends React.Component {
	componentWillMount() {
		const { dispatch, to } = this.props;
		dispatch(redirectRouter(to));
	}

	render() {
		return null;
	}
}

Redirect.propTypes = {
	dispatch: PropTypes.func,
	to: PropTypes.string.isRequired,
};

export default connect()(Redirect);
