/**
 * Created by jiljiang on 2016/11/1.
 */

import React, { PropTypes } from 'react';

const Avatar = ({ children }) => (
	<div>
		<h1>Item</h1>
		<div>
			{children}
		</div>
	</div>
);

Avatar.propTypes = {
	children: PropTypes.element,
};

export default Avatar;
