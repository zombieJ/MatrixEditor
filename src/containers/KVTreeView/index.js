import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { toggleKV } from '../../actions/kv';

import withTree from '../../components/Tree';
import Avatar from '../../components/Avatar';

import styles from './index.scss';

const TreeAvatar = withTree(({ kvList, id, ...props }) => {
	const item = kvList.get(id);
	const kv = item.get('kv');
	const isFolder = !kv;
	const name = isFolder ? item.get('name') : kv.key;
	const comment = isFolder ? 'Is Folder~' : kv.comment;
	// console.log('KV:', item);

	return (
		<Avatar
			kvList={kvList} id={id}
			isFolder={isFolder} open={item.get('open')}
			name={name} comment={comment}
			{...props}
		/>
	);
}, ({ kvList, id, ...props }) => {
	const item = kvList.get(id);
	const kv = item.get('kv');

	// Skip kv entity
	if (kv) return [];

	const list = item.get('list');
	const subPropsList = list.map((subId, index) => ({
		kvList,
		id: subId,
		index,
		...props,
	}));

	return subPropsList;
});

class KVTreeView extends React.Component {
	constructor() {
		super();
		this.state = {};
		this.onAvatarClick = this.onAvatarClick.bind(this);
		this.onAvatarMove = this.onAvatarMove.bind(this);
	}

	onAvatarClick(props) {
		const { dispatch, name } = this.props;
		const { id, isFolder } = props;
		if (isFolder) dispatch(toggleKV(name, id));
	}

	onAvatarMove() {
		console.log('Move!!!');
	}

	render() {
		const { kv, name } = this.props;
		const kvHolder = kv.get(name);
		const index = kvHolder.get('index');
		const kvList = kvHolder.get('list');
		if (!kvHolder) return <span>Loading...</span>;

		console.log('Index:', index);

		return (
			<div styleName="view">
				<TreeAvatar
					kvList={kvList} id="0"
					onItemClick={this.onAvatarClick}
					onItemMove={this.onAvatarMove}
				/>
			</div>
		);
	}
}

KVTreeView.propTypes = {
	dispatch: PropTypes.func,
	kv: PropTypes.object,
	name: PropTypes.string,
};

const mapState = ({ kv }) => ({
	kv,
});

export default connect(mapState)(cssModules(KVTreeView, styles));
