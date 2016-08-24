import React from 'react';
import Link from 'helpers/Link';

const App = ({ children }) => (
	<div>
		<h1>Hello World from React</h1>
		{/*<ul>*/}
			{/*<li><a href="/">Front</a></li>*/}
			{/*<li><a href="http://local.dev:3000/-/hello-world/">Front with namespace</a></li>*/}
			{/*<li><a href="http://local.dev:3000/-/hello-world/about">Front with namespace + param</a></li>*/}
		{/*</ul>*/}
		{/*<ul>*/}
			{/*<li><a href="http://local.dev:3000/en_US/web/guest/react-example/">Sub trailing</a></li>*/}
			{/*<li><a href="http://local.dev:3000/en_US/web/guest/react-example">Sub no trailing</a></li>*/}
			{/*<li><a href="http://local.dev:3000/en_US/web/guest/react-example/-/hello-world/">Sub with namespace</a></li>*/}
			{/*<li><a href="http://local.dev:3000/en_US/web/guest/react-example/-/hello-world/about">Sub with namespace + param</a></li>*/}
		{/*</ul>*/}

		<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="kitten">Image</Link></li>
			<li><Link to="counter">Counter</Link></li>
			<li><Link to="message">Data from portlet settings</Link></li>
		</ul>

		{ children }
	</div>
);

App.propTypes = {
	children: React.PropTypes.any
};

export default App;
