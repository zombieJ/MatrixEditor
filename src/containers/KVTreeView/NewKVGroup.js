import React from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import Field from 'components/Form/Field';
import Lang from 'containers/Lang';

class NewKV extends React.Component {
	constructor() {
		super();
		this.state = {
			relativePath: '',
			modify: false,
		};
	}

	componentWillMount() {
		const { relativePath } = this.props;
		if (relativePath) {
			this.setState({
				relativePath: relativePath.replace(/\.txt$/, ''),
				modify: true,
			});
		}
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
		const { modify } = this.state;
		const base = this.getBase();

		return (
			<div>
				<Form instance={this}>
					<Field path="relativePath" lang="RelativePath" />
				</Form>

				{base &&
				<p><Lang id="Preview" />: <code>{`#base "${base}"`}</code></p>
				}

				{!modify &&
					<p>* <Lang id="newKVGroupTips" /></p>
				}
			</div>
		);
	}
}

NewKV.propTypes = {
	relativePath: PropTypes.string,
};

export default NewKV;
