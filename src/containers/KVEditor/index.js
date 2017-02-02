import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';

class Sample extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<p>Hello World</p>
		);
	}
}

Sample.propTypes = {
};

export default Sample;
