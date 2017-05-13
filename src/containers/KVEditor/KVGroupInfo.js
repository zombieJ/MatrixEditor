import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import PATH from 'path';

import { ABILITY_PATH } from 'actions/project';
import Lang from 'containers/Lang';

import styles from './KVGroupInfo.scss';

function getPathList(kvList, id) {
	const kvGroup = kvList[id];
	const relativePath = kvGroup.comment;
	const parentKvGroup = kvList.find(({ list }) => list && list.includes(id));
	const relativeDir = PATH.dirname(relativePath);

	let parentList = [];
	if (parentKvGroup && parentKvGroup.id !== 0) {
		parentList = getPathList(kvList, parentKvGroup.id);
	}

	return parentList.concat(relativeDir);
}

class KVGroupInfo extends React.Component {
	getAbsolutePath = () => {
		const { path, kvList, group } = this.props;
		const pathList = getPathList(kvList, group.id);
		const absolutePath = PATH.resolve(
			path, ABILITY_PATH,
			...pathList, PATH.basename(group.comment),
		);

		return absolutePath;
	};

	render() {
		const { group } = this.props;
		const { name, comment, list } = group;

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
							<td>{comment}</td>
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
			</div>
		);
	}
}

KVGroupInfo.propTypes = {
	path: PropTypes.string,
	kvList: PropTypes.array,
	group: PropTypes.object,
};

const mapState = ({ project: { path } }) => ({
	path,
});

export default connect(mapState)(cssModules(KVGroupInfo, styles));
