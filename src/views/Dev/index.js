/**
 * Created by jiljiang on 2016/10/31.
 */

import React, { PropTypes } from 'react';
import Avatar from '../../components/Avatar';
import { connect as treeConnect } from '../../components/Tree';

const AvatarTree = treeConnect(Avatar);

const Dev = () => (
	<div>
		<h1>Dev</h1>
		<Avatar name="Test Avatar" />
		<hr />

		<AvatarTree />
	</div>
);

Dev.propTypes = {
	dispatch: PropTypes.func,
};

export default Dev;
