import React from 'react';

const Counter = ({ counter, add, subtract }) => (
	<div>
		Counter is { counter }
		<button onClick={ add }>Add</button>
		<button onClick={ subtract }>Subtract</button>
	</div>
);

Counter.propTypes = {
	counter: React.PropTypes.number.isRequired,
	add: React.PropTypes.func.isRequired,
	subtract: React.PropTypes.func.isRequired
};

export default Counter;
