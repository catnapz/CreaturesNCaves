/**
 * React component that reports the health check (GET /health)  
 */

import * as React from 'react';
import { connect } from 'react-redux';
import * as HealthStore from '../store/HealthStore';
import { ApplicationState } from '../store/ApplicationState';

type HealthDisplayProps = (
    HealthStore.HealthState &
    typeof HealthStore.actionCreators
);

const mapStateToProps = ( state: ApplicationState ) => state.health;
const mapDispatchToProps = { ...HealthStore.actionCreators };

class HealthDisplay extends React.PureComponent<HealthDisplayProps> {

    /**
     * This method is called when this component is first added to the document 
     */ 
    public componentDidMount() {
        this.props.checkHealth();
    }
    
    public render() {
        return (
            <>
                <p> I am <strong>{
                    (this.props.isLoading && <span>checking health...</span>) ||
                    ((this.props.healthy === true) ? 'HEALTHY' : 'UNHEALTHY')
                }</strong></p>
                <button
                    type="button"
                    onClick={() => { this.props.checkHealth(); }}>
                    Check Health
                </button>
            </>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(HealthDisplay as any);
