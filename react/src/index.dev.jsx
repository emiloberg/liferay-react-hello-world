import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore.dev';
import App from 'components/dumb/NewApp/NewApp';

const store = configureStore({
	helloMsg: 'Monator is awesome'
});

const Index = () => (
	<Provider store={ store } >
		<App />
	</Provider>
);


ReactDOM.render(
	<Index />,
	document.getElementById('root')
);
