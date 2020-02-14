import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/ApplicationState';
import * as CounterStore from '../store/CounterStore';

type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators;

class Counter extends React.PureComponent<CounterProps> {
    public render() {
        return (
            <>
                <button
                    type="button"
                    onClick={() => { this.props.increment(); }}>
                    Increment
                </button>
            </>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter as any);