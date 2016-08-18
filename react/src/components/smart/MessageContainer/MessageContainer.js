import { connect } from 'react-redux';

import Message from 'components/dumb/Message/Message';

const mapStateToProps = (state) => ({
	helloMsg: state.helloMsg
});

const MessageContainer = connect(mapStateToProps)(Message);

export default MessageContainer;
