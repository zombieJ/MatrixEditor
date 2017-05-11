import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { showMenu } from 'utils/menuUtil';
import { toggleKV, moveKV, moveKVInList, selectKV } from 'actions/kv';

import withTree from 'components/Tree';
import Avatar from 'components/Avatar';
import Lang, { withLang } from 'containers/Lang';
import NewKV from './NewKV';

import styles from './index.scss';

const TreeAvatar = withTree(({ kvList, id, selectedId, ...props }) => {
	const item = kvList[id];
	const { kv, list } = item;
	const isFolder = !!list;
	const name = isFolder ? item.name : kv.key;
	const comment = isFolder ? 'Is Folder~' : kv.comment;

	return (
		<Avatar
			kvList={kvList} id={id} selected={selectedId === id}
			isFolder={isFolder} open={item.open}
			name={name} comment={comment}
			{...props}
		/>
	);
}, ({ kvList, id, ...props }) => {
	const item = kvList[id];
	const { kv, list = [] } = item;

	// Skip kv entity
	if (kv) return [];

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
	}

	onAvatarClick = (avatarProps) => {
		const { dispatch, name } = this.props;
		const { id, isFolder } = avatarProps;
		if (isFolder) {
			dispatch(toggleKV(name, id));
		} else {
			dispatch(selectKV(name, id));
		}
	};

	onAvatarMove = (srcId, tgtId, moveType) => {
		const { dispatch, name } = this.props;
		dispatch(moveKV(name, srcId, tgtId, moveType));
	};

	onAvatarMoveIn = (srcId, tgtId) => {
		const { dispatch, name } = this.props;
		dispatch(moveKVInList(name, srcId, tgtId));
	};

	onNewClick = () => {
		const { lang } = this.props;
		showMenu({
			[lang('NewKV')]: this.newKV,
			[lang('NewKVGroup')]: () => { console.log(222); },
		});
	};

	newKV = () => {
		const { lang } = this.props;
		this.context.showDialog(
			lang('NewKV'),
			<NewKV ref={(ele) => { this.$form = ele; }} />,
		).then(() => {
			const { kv, name } = this.props;
			const { list = [] } = kv[name] || {};
			const newKvName = (this.$form.state.name || '').trim();
			const upperKvName = newKvName.toUpperCase();
			const conflictName = list.some(({ kv: k }) => k && (k.key || '').toUpperCase() === upperKvName);
			console.log('=>', list, conflictName);

			if (conflictName) {
				alert(lang('nameConflict'));
				return false;
			}
			// const { name } = this.$form.state;
			// console.log(this.props, name);
			return true;
		});
	};

	render() {
		const { kv, name, className } = this.props;
		const kvHolder = kv[name];
		if (!kvHolder) return <span>Loading...</span>;

		const { selected, list: kvList } = kvHolder;
		return (
			<div styleName="view" className={className}>
				<div styleName="tree-container">
					<TreeAvatar
						kvList={kvList} id={0} selectedId={selected}
						noHeader
						onItemClick={this.onAvatarClick}
						onItemMove={this.onAvatarMove}
						onItemMoveIn={this.onAvatarMoveIn}
					/>
				</div>
				<div styleName="operator">
					<a onClick={this.onNewClick}>
						<span className="fa fa-plus" />
						<Lang id="New" />
					</a>
				</div>
			</div>
		);
	}
}

KVTreeView.propTypes = {
	dispatch: PropTypes.func,
	kv: PropTypes.object,
	name: PropTypes.string,
	className: PropTypes.string,
	lang: PropTypes.func,
};

KVTreeView.contextTypes = {
	showDialog: PropTypes.func,
};

const mapState = ({ kv }) => ({
	kv,
});

export default connect(mapState)(withLang(cssModules(KVTreeView, styles)));
