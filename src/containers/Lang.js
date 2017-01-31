import React, { PropTypes } from 'react';
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

const withLangMapState = ({ international }) => ({
	lang: id => international.lang[id],
});

export function withLang(Component) {
	return connect(withLangMapState)(Component);
}
