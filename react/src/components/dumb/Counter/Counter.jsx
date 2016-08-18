import React from 'react';

export default ({ counter, add, subtract }) => (
	<div>
		Counter is { counter }
		<button onClick={ add }>Add</button>
		<button onClick={ subtract }>Subtract</button>
	</div>
);
