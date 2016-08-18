import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore.dev';
import App from 'components/dumb/App/App';

const Index = () => {
	const store = configureStore({
		helloMsg: 'Monator is awesome'
	});

	return (
		<Provider store={ store } >
			<App />
		</Provider>
	);
};

ReactDOM.render(
	<Index />,
	document.getElementById('root')
);
