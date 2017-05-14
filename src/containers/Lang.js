import React from 'react'; import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function getContent(props) {
	const { id, content } = props;
	return content || `[${id}]`;
}

class Lang extends React.Component {
	shouldComponentUpdate(nextProps) {
		const { className } = nextProps;
		return getContent(nextProps) !== getContent(this.props)
			|| className !== this.props.className;
	}

	render() {
		const { className } = this.props;
		return <span className={className}>{getContent(this.props)}</span>;
	}
}

Lang.propTypes = {
	// id: PropTypes.string,
	// content: PropTypes.string,
	className: PropTypes.string,
};

const mapState = ({ international }, { id }) => ({
	content: international.lang[id],
});

export default connect(mapState)(Lang);

const withLangMapState = (bindProp = 'lang') => (
	({ international }) => ({
		[bindProp]: (id) => {
			const str = international.lang[id];
			if (str !== undefined) return str;
			return `[MissString] ${id}`;
		},
	})
);

export function withLang(Component, bindProp = 'lang') {
	return connect(withLangMapState(bindProp))(Component);
}
