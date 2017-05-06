import React, { PropTypes } from 'react';

import Form from 'components/Form';
import Field from 'components/Form/Field';

class NewKV extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
		};
	}

	render() {
		return (
			<Form instance={this}>
				<Field path="name" lang="Name" />
			</Form>
		);
	}
}

export default NewKV;
