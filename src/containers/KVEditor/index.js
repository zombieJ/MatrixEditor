import React from 'react'; import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Ability from '../../models/Ability';

import { switchKVTab, modifyKV } from '../../actions/kv';

import Lang, { withLang } from '../../containers/Lang';
import KVPathView from '../../containers/KVPathView';
import Tabs from '../../components/Tabs';
import TabContent from '../../components/Tabs/TabContent';
import FolderEditor from './KVGroupInfo';

function getModal(name) {
	switch (name) {
		case 'ability':
			return Ability;
	}
	console.warn('Modal not found:', name);
	return {};
}

class KVEditor extends React.Component {
	onSwitchTab = (index) => {
		const { dispatch, name } = this.props;
		dispatch(switchKVTab(name, index));
	};

	onKVChange = (path, value) => {
		const { dispatch, name, kv } = this.props;
		dispatch(modifyKV(name, kv[name].selected, path, value));
	};

	render() {
		const { lang, kv, name } = this.props;
		const kvHolder = kv[name];
		const tab = kvHolder.tab;
		const selected = kvHolder.selected;
		const current = kvHolder.list[selected];
		const { attrGroup = [] } = getModal(name);

		if (!current || !current.kv) {
			if (current.list) {
				return (
					<div className="panel with-padding">
						<FolderEditor kvList={kvHolder.list} group={current} />
					</div>
				);
			}

			return (
				<div className="panel with-padding">
					<span className="fa fa-info-circle" /> <Lang id="KVEmpty" />
				</div>
			);
		}

		return (
			<Tabs onSwitchTab={this.onSwitchTab} selected={tab}>
				{attrGroup.map((group) => {
					const { name: tabName, component: Component = KVPathView } = group;
					return (
						<TabContent key={tabName} title={lang(tabName)}>
							<Component {...group} kv={current.kv} onKVChange={this.onKVChange} />
						</TabContent>
					);
				})}
			</Tabs>
		);
	}
}

KVEditor.propTypes = {
	dispatch: PropTypes.func,
	lang: PropTypes.func,
	kv: PropTypes.object,
	name: PropTypes.string,
};

const mapState = ({ kv }) => ({
	kv,
});

export default connect(mapState)(withLang(KVEditor));
