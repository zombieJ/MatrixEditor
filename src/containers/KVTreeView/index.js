import React from 'react'; import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import KV from 'immutable-kv';

import { showMenu } from 'utils/menuUtil';
import { toggleKV, moveKV, moveKVInList, selectKV, createKV, createKVGroup } from 'actions/kv';

import withTree from 'components/Tree';
import Avatar from 'components/Avatar';
import Lang, { withLang } from 'containers/Lang';
import NewKV from './NewKV';
import NewKVGroup from './NewKVGroup';

import styles from './index.scss';

const TreeAvatar = withTree(({ kvList, id, selectedId, ...props }) => {
	const item = kvList[id];
	const { kv, list } = item;
	const isFolder = !!list;
	const name = isFolder ? item.name : kv.key;
	const comment = isFolder ? item.comment : kv.comment;

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
		const { id } = avatarProps;
		dispatch(selectKV(name, id));
	};

	onAvatarDblClick = (avatarProps) => {
		const { dispatch, name } = this.props;
		const { id, isFolder } = avatarProps;
		if (isFolder) {
			dispatch(toggleKV(name, id));
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
			[lang('NewKVGroup')]: this.newKVGroup,
		});
	};

	newKV = () => {
		const { lang } = this.props;
		this.context.showDialog({
			title: lang('NewKV'),
			content: <NewKV ref={(ele) => { this.$form = ele; }} />,
			confirm: true,
			onConfirm: () => {
				const { dispatch, kv, name } = this.props;
				const { list = [] } = kv[name] || {};
				const form = this.$form.state;
				const newKvName = (form.name || '').trim();

				if (!newKvName) {
					alert(lang('cantBeEmpty'));
					return false;
				}

				const upperKvName = newKvName.toUpperCase();
				const conflictName = list.some(({ kv: k }) => k && (k.key || '').toUpperCase() === upperKvName);

				if (conflictName) {
					alert(lang('nameConflict'));
					return false;
				}

				dispatch(createKV(name, new KV(newKvName, [], form.comment)));
				return true;
			},
		});
	};

	newKVGroup = () => {
		const { lang } = this.props;
		this.context.showDialog({
			title: lang('NewKVGroup'),
			content: <NewKVGroup ref={(ele) => { this.$form = ele; }} />,
			confirm: true,
			onConfirm: () => {
				const { dispatch, name } = this.props;
				const newGroupRelativePath = this.$form.getBase();

				if (!newGroupRelativePath) {
					alert(lang('cantBeEmpty'));
					return false;
				}

				dispatch(createKVGroup(name, newGroupRelativePath));
				return true;
			},
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
						onItemDblClick={this.onAvatarDblClick}
						onItemMove={this.onAvatarMove}
						onItemMoveIn={this.onAvatarMoveIn}
					/>
				</div>
				<div styleName="operator">
					<a role="button" onClick={this.onNewClick}>
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
