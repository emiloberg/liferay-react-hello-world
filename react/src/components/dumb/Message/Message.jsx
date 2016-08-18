import React from 'react';

const Message = ({ helloMsg }) => {
	if (!helloMsg && helloMsg.length < 1) {
		return (<div>Edit the settings of the portlet to see a message here</div>);
	}

	return (<div>Here's my message: <b>{ helloMsg }</b></div>);
};

Message.propTypes = {
	helloMsg: React.PropTypes.string
};

export default Message;
