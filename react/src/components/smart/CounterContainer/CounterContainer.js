import { connect } from 'react-redux';
import { actionAddSubtract } from 'sagas/counter';
import Counter from 'components/dumb/Counter/Counter';

const mapStateToProps = (state) => ({
	counter: state.counter
});

const mapDispatchToProps = (dispatch) => ({
	add: () => { dispatch(actionAddSubtract({ modifier: 1 })); },
	subtract: () => { dispatch(actionAddSubtract({ modifier: -1 })); }
});

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default CounterContainer;
