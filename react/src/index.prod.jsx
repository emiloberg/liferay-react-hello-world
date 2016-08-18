import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore.prod';
import App from 'components/dumb/App/App';

const Index = (initProps) => {
	const store = configureStore(initProps);

	return (
		<Provider store={store} >
			<App />
		</Provider>
	);
};

module.exports = {
	reactComponent: Index
};
