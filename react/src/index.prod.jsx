import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore.prod';
import App from 'components/dumb/NewApp/NewApp';

const Index = (initProps) => {
	const store = configureStore(initProps);

	return (
		<Provider store={ store } >
			<App />
		</Provider>
	);
};

module.exports = {
	reactComponent: Index
};
