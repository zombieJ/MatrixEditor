/**
 * Created by jiljiang on 2016/11/1.
 */

import React, { PropTypes } from 'react';

const Avatar = ({ name, onClick, children }) => (
	<div>
		<a onClick={onClick} tabIndex="0">
			<h1>{name}</h1>
		</a>
		<div>
			{children}
		</div>
	</div>
);

Avatar.propTypes = {
	name: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.element,
};

export default Avatar;
