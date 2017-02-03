import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Ability from '../../models/Ability';

import { switchKVTab, modifyKV } from '../../actions/kv';

import Lang, { withLang } from '../../containers/Lang';
import KVPathView from '../../containers/KVPathView';
import Tabs from '../../components/Tabs';
import TabContent from '../../components/Tabs/TabContent';

function getModal(name) {
	switch (name) {
		case 'ability':
			return Ability;
	}
	console.warn('Modal not found:', name);
	return {};
}

class KVEditor extends React.Component {
	constructor() {
		super();
		this.onKVChange = this.onKVChange.bind(this);
	}

	onSwitchTab = (index) => {
		const { dispatch, name } = this.props;
		dispatch(switchKVTab(name, index));
	};

	onKVChange(path, value) {
		const { dispatch, name, kv } = this.props;
		dispatch(modifyKV(name, kv.getIn([name, 'selected']), path, value));
	}

	render() {
		const { lang, kv, name } = this.props;
		const kvHolder = kv.get(name);
		const tab = kvHolder.get('tab');
		const selected = kvHolder.get('selected');
		const current = kvHolder.getIn(['list', selected]);
		const { attrGroup = [] } = getModal(name);

		if (!current || !current.get('kv')) {
			return (
				<div className="panel with-padding">
					<span className="fa fa-info-circle"/> <Lang id="KVEmpty"/>
				</div>
			);
		}

		return (
			<Tabs onSwitchTab={this.onSwitchTab} selected={tab}>
				{attrGroup.map((group) => {
					const { name, component: Component = KVPathView } = group;
					return (
						<TabContent key={name} title={lang(name)}>
							<Component {...group} kv={current.get('kv')} onKVChange={this.onKVChange} />
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
