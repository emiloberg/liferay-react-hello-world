import React from 'react';
import styles from './App.css';
import MessageContainer from 'components/smart/MessageContainer/MessageContainer';
import Kitten from 'components/dumb/Kitten/Kitten';
import CounterContainer from 'components/smart/CounterContainer/CounterContainer';

export default class AppRoot extends React.Component {
	render() {
		return (
			<div>
				<div>Hello World from React. <span className={ styles.green }>If the css is loaded, this should be green</span></div>
				<MessageContainer />
				<CounterContainer />
				<Kitten />
			</div>
		);
	}
}
