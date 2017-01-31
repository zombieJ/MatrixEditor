/**
 * Created by jiljiang on 2016/10/31.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadKVList } from '../../actions/kv';
import ImmutableKV from '../../models/ImmutableKV';

import KVTreeView from '../../containers/KVTreeView';

const DEV_KV = `
"DOTAAbilities"
{
	"Version"		"1"

	// Comment: AAA
	"AAA"
	{
		"AAA1"		"AAA"
	}
	// Comment: BBB
	"BBB"
	{
		"BBB1"		"BBB"
	}
	// Comment: CCC
	"CCC"
	{
		"CCC1"		"CCC"
	}
}
`;

class Dev extends React.Component {
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(loadKVList('dev', ImmutableKV.parse(DEV_KV).normalizr()));
	}

	render() {
		return (
			<div>
				<p>This page will auto fill kv reducer as dev field for dev usage!</p>
				<div>
					<KVTreeView name="dev" />
				</div>
			</div>
		);
	}
}

Dev.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(Dev);
