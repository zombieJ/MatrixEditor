import React, { PropTypes } from 'react';
import warning from 'warning';

const connect = (Component, subPropsListGenerator) => {
	warning(subPropsListGenerator, 'Tree sub props generate function can\' be empty.');

	const TreeComponent = ({ ...props }) => {
		const list = subPropsListGenerator(props);

		warning(list, 'Tree sub props generate empty list.');

		return (
			<Component {...props}>
				{list.map((subProps, index) => (
					<TreeComponent key={index} {...subProps} />
				))}
			</Component>
		);
	};

	return TreeComponent;
};

export default connect;
