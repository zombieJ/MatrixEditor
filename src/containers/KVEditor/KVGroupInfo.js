import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import PATH from 'path';

import { ABILITY_PATH } from 'actions/project';
import { modifyKVGroup } from 'actions/kv';
import Lang, { withLang } from 'containers/Lang';
import NewKVGroup from 'containers/KVTreeView/NewKVGroup';

import styles from './KVGroupInfo.scss';

function getPathList(kvList, id) {
	const kvGroup = kvList[id];
	const { relativePath } = kvGroup;
	const parentKvGroup = kvList.find(({ list }) => list && list.includes(id));
	const relativeDir = PATH.dirname(relativePath);

	let parentList = [];
	if (parentKvGroup && parentKvGroup.id !== 0) {
		parentList = getPathList(kvList, parentKvGroup.id);
	}

	return parentList.concat(relativeDir);
}

class KVGroupInfo extends React.Component {
	onModifyClick = () => {
		const { lang, group: { id, relativePath } } = this.props;
		this.context.showDialog({
			title: lang('ModifyKVGroup'),
			content: <NewKVGroup ref={(ele) => { this.$form = ele; }} relativePath={relativePath} />,
			confirm: true,
			onConfirm: () => {
				const { dispatch, name } = this.props;
				const newGroupRelativePath = this.$form.getBase();

				if (!newGroupRelativePath) {
					alert(lang('cantBeEmpty'));
					return false;
				}

				dispatch(modifyKVGroup(name, id, newGroupRelativePath));
				return true;
			},
		});
	};

	getAbsolutePath = () => {
		const { path, kv, name, group } = this.props;
		const kvList = kv[name].list;
		const pathList = getPathList(kvList, group.id);
		return PATH.resolve(
			path, ABILITY_PATH,
			...pathList, PATH.basename(group.relativePath),
		);
	};

	render() {
		const { group } = this.props;
		const { name, relativePath, list } = group;

		return (
			<div styleName="group">
				<h3><Lang id="KVGroupInfo" /></h3>
				<table className="table table-bordered">
					<tbody>
						<tr>
							<th width="20%"><Lang id="Name" /></th>
							<td>{name}</td>
						</tr>
						<tr>
							<th><Lang id="RelativePath" /></th>
							<td>{relativePath}</td>
						</tr>
						<tr>
							<th><Lang id="AbsolutePath" /></th>
							<td>{this.getAbsolutePath()}</td>
						</tr>
						<tr>
							<th><Lang id="KVGroupLeafCount" /></th>
							<td>{list.length}</td>
						</tr>
					</tbody>
				</table>
				<button className="btn" onClick={this.onModifyClick}>
					<Lang id="Modify" />
				</button>
			</div>
		);
	}
}

KVGroupInfo.propTypes = {
	dispatch: PropTypes.func,
	lang: PropTypes.func,
	path: PropTypes.string,
	kv: PropTypes.object,
	name: PropTypes.string,
	group: PropTypes.object,
};

KVGroupInfo.contextTypes = {
	showDialog: PropTypes.func,
};

const mapState = ({ project: { path } }) => ({
	path,
});

export default connect(mapState)(withLang(cssModules(KVGroupInfo, styles)));
