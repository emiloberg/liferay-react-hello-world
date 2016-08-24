import React from 'react';
import { createURL } from 'helpers/url';
import { Link } from 'react-router';

import styles from 'components/dumb/NewApp/NewApp.css';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<h1>App</h1>
				<h2>{ FRIENDLYURLMAPPING }</h2>
				<div>
					<span className={ styles.green }>
						If the css is loaded, this should be green
					</span>
				</div>
				<ul>
					<li><a href="/">Front</a></li>
					<li><a href="http://local.dev:3000/-/hello-world/">Front with namespace</a></li>
					<li><a href="http://local.dev:3000/-/hello-world/about">Front with namespace + param</a></li>
				</ul>
				<ul>
					<li><a href="http://local.dev:3000/en_US/web/guest/react-example/">Sub trailing</a></li>
					<li><a href="http://local.dev:3000/en_US/web/guest/react-example">Sub no trailing</a></li>
					<li><a href="http://local.dev:3000/en_US/web/guest/react-example/-/hello-world/">Sub with namespace</a></li>
					<li><a href="http://local.dev:3000/en_US/web/guest/react-example/-/hello-world/about">Sub with namespace + param</a></li>
				</ul>

				<ul>
					<li><Link to={ createURL('/') }>Hem</Link></li>
					<li><Link to={ createURL('about') }>About</Link></li>
				</ul>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.any
};
