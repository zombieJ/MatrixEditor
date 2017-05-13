import React from 'react'; import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Match = ({ path, pattern, component: Component }) => {
	if (path !== pattern) return null;

	return (
		<Component />
	);
};

Match.propTypes = {
	path: PropTypes.string,
	pattern: PropTypes.string,
	component: PropTypes.func,
};

const mapState = ({ router: { path } }) => ({
	path,
});

export default connect(mapState)(Match);
