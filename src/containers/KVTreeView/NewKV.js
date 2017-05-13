import React from 'react';

import Form from 'components/Form';
import Field from 'components/Form/Field';
import Lang from 'containers/Lang';

class NewKV extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			comment: '',
		};
	}

	render() {
		return (
			<div>
				<Form instance={this}>
					<Field path="name" lang="Name" />
				</Form>
				<Form instance={this}>
					<Field path="comment" lang="Comment" />
				</Form>

				<p>* <Lang id="newKVTips" /></p>
			</div>
		);
	}
}

export default NewKV;
