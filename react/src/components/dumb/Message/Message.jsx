import React from 'react';

export default ({ helloMsg }) => {
	if (!helloMsg && helloMsg.length < 1) {
		return (<div>Edit the settings of the portlet to see a message here</div>);
	}

	return (<div>Here's my message: <b>{ helloMsg }</b></div>);
};
