import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/ApplicationState';
import * as CounterStore from '../store/CounterStore';
import Incrementer from './Incrementer';
import Decrementer from './Decrementer';

type CounterProps = CounterStore.CounterState;

const mapStateToProps = (state: ApplicationState) => state.counter;

const mapDispatchToProps = null;

class Counter extends React.PureComponent<CounterProps> {
    public render() {
        return (
            <>

                <h1>
                    Counter
                </h1>
            
                <div>
                    Current Count: <strong id='count'>{this.props.count}</strong>
                    < Incrementer />
                    < Decrementer />
                </div>
                    
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter as any);
