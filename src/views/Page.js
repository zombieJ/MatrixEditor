import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Redirect from '../containers/Router/Redirect';

export const verifyProject = (Component) => {
	const VerifyPage = ({ hasProject, ...props }) => {
		if (hasProject) {
			return <Component {...props} />;
		}
		return <Redirect to="/" />;
	};

	VerifyPage.propTypes = {
		hasProject: PropTypes.bool,
	};


	const mapState = ({ project }) => ({
		hasProject: !!project.path,
	});

	return connect(mapState)(VerifyPage);
};


export default {};
