/**
 * Created by jiljiang on 2016/10/26.
 */

import React from 'react';
import { connect } from 'react-redux';
import { propTypes } from 'react-router';

export const withRouter = (Component) => {
	const Page = (props, { router }) => (
		<Component {...props} router={router} />
	);

	Page.contextTypes = {
		router: propTypes.routerContext,
	};

	return Page;
};

export const withAuth = (Component) => {

};


export default withRouter;
