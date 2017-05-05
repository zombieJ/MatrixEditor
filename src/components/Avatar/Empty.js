import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';

import Lang from '../../containers/Lang';

import styles from './index.scss';

class Empty extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<span styleName="tips">
				<span className="fa fa-info-circle" />
				<Lang className="text-muted" id="EmptyList" />
			</span>
		);
	}
}

Empty.propTypes = {
};

export default cssModules(Empty, styles, { allowMultiple: true });
