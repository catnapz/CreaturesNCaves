/**
 * Decrementer component that connects to the CounterStore and decrements the count 
 */

import * as React from 'react';
import { connect } from 'react-redux';
import * as CounterStore from '../store/CounterStore';
import * as HealthStore from '../store/HealthStore';

type DecrementerProps =
    typeof CounterStore.actionCreators &
    typeof HealthStore.actionCreators;

const mapStateToProps = null;

const mapDispatchToProps = {
    ...CounterStore.actionCreators,
    ...HealthStore.actionCreators,
};

class Decrementer extends React.PureComponent<DecrementerProps> {
    public render() {
        return (
            <>
                <button
                    type="button"
                    onClick={() => { this.props.decrement(); this.props.checkHealth() }}>
                    Decrement
                </button>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decrementer as any);
