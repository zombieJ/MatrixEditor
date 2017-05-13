import React from 'react';

import Form from 'components/Form';
import Field from 'components/Form/Field';
import Lang from 'containers/Lang';

class NewKV extends React.Component {
	constructor() {
		super();
		this.state = {
			relativePath: '',
		};
	}

	getBase = () => {
		let { relativePath } = this.state;
		if (!relativePath) return '';

		if (!/\.txt$/.test(relativePath)) {
			relativePath += '.txt';
		}

		return relativePath.trim();
	};

	render() {
		const base = this.getBase();

		return (
			<div>
				<Form instance={this}>
					<Field path="relativePath" lang="RelativePath" />
				</Form>

				{base &&
				<p><Lang id="Preview" />: <code>{`#base "${base}"`}</code></p>
				}

				<p>* <Lang id="newKVGroupTips" /></p>
			</div>
		);
	}
}

export default NewKV;
