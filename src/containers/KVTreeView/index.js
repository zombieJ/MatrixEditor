import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { toggleKV, moveKV, selectKV } from '../../actions/kv';

import withTree from '../../components/Tree';
import Avatar from '../../components/Avatar';

import styles from './index.scss';

const TreeAvatar = withTree(({ kvList, id, selectedId, ...props }) => {
	const item = kvList.get(id);
	const kv = item.get('kv');
	const isFolder = !!item.get('list');
	const name = isFolder ? item.get('name') : kv.key;
	const comment = isFolder ? 'Is Folder~' : kv.comment;

	return (
		<Avatar
			kvList={kvList} id={id} selected={selectedId === id}
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
		noHeader: false,
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
		if (isFolder) {
			dispatch(toggleKV(name, id));
		} else {
			dispatch(selectKV(name, id));
		}
	}

	onAvatarMove(srcId, tgtId, moveType) {
		const { dispatch, name } = this.props;
		dispatch(moveKV(name, srcId, tgtId, moveType));
	}

	render() {
		const { kv, name, className } = this.props;
		const kvHolder = kv.get(name);
		const selected = kvHolder.get('selected');
		const kvList = kvHolder.get('list');
		if (!kvHolder) return <span>Loading...</span>;

		return (
			<div styleName="view" className={className}>
				<TreeAvatar
					kvList={kvList} id={0} selectedId={selected}
					noHeader
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
	className: PropTypes.string,
};

const mapState = ({ kv }) => ({
	kv,
});

export default connect(mapState)(cssModules(KVTreeView, styles));
