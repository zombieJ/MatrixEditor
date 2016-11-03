/**
 * Created by jiljiang on 2016/11/1.
 */

import React, { PropTypes } from 'react';

export const connect = (Component) => {
	class TreeItem extends React.Component {
		constructor() {
			super();

			this.itemDown = this.itemDown.bind(this);
		}

		itemDown() {
			console.log('>>>>>', this);
		}

		render() {
			const { ...restProps } = this.props;
			return <Component {...restProps} />;
		}
	}

	TreeItem.propTypes = {
		id: PropTypes.string,
		list: PropTypes.arrayOf(PropTypes.shape({})),
	};

	return TreeItem;
};

export default connect;
