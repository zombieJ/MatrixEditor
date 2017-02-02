import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { switchKVTab } from '../../actions/kv';

import Tabs from '../../components/Tabs';
import TabContent from '../../components/Tabs/TabContent';

class KVEditor extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onSwitchTab = (index) => {
		const { dispatch, name } = this.props;
		dispatch(switchKVTab(name, index));
	};

	render() {
		const { kv, name } = this.props;
		const kvHolder = kv.get(name);
		const tab = kvHolder.get('tab');

		return (
			<Tabs onSwitchTab={this.onSwitchTab} selected={tab}>
				<TabContent title="111">
					<table className="table table-bordered">
						<tbody>
						<tr>
							<th width="1%" className="text-no-break">Title gg</th>
							<td>Content</td>
						</tr>
						</tbody>
					</table>
				</TabContent>
				<TabContent title="222">Content 2</TabContent>
				<TabContent title="333">Content 3</TabContent>
			</Tabs>
		);
	}
}

KVEditor.propTypes = {
	dispatch: PropTypes.func,
	kv: PropTypes.object,
	name: PropTypes.string,
};

const mapState = ({ kv }) => ({
	kv,
});

export default connect(mapState)(KVEditor);
