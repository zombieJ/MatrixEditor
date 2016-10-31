/**
 * Created by jiljiang on 2016/11/1.
 */

import React, { PropTypes } from 'react';

const Avatar = ({ onClick, children }) => (
	<div onClick={onClick}>
		<h1>Item</h1>
		<div>
			{children}
		</div>
	</div>
);

Avatar.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.element,
};

export default Avatar;
