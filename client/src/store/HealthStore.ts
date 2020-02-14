/**
 * Health Check slice of redux store. Uses redux-thunk to make an asynchronous
 * call to the node server (GET /health) as an action to check health.  
 */

import { Action, Reducer } from 'redux';
import { AppThunkAction } from './ApplicationState';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HealthState {
    healthy: boolean;
    isLoading?: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface HealthCheckReqAction { type: 'HEALTH_CHECK_REQ' }
export interface HealthCheckRespAction { type: 'HEALTH_CHECK_RESP', statusCode: number }
export interface HealthCheckErrorAction { type: 'HEALTH_CHECK_ERROR' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = HealthCheckReqAction | HealthCheckRespAction | HealthCheckErrorAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    checkHealth: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            dispatch({ type: 'HEALTH_CHECK_REQ' });
            let response: Response = await fetch('health');
            console.log(response.status);
            dispatch({ type: 'HEALTH_CHECK_RESP', statusCode: response.status });
        } catch (err) {
            console.error(err);
            // Handle errors here
            dispatch({ type: 'HEALTH_CHECK_ERROR' });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<HealthState> = (state: HealthState | undefined, incomingAction: Action): HealthState => {
    if (state === undefined) {
        return { healthy: false };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'HEALTH_CHECK_REQ':
            return { healthy: state.healthy, isLoading: true };
        case 'HEALTH_CHECK_RESP':
            return { healthy: (action.statusCode === 200) ? true : false };
        case 'HEALTH_CHECK_ERROR':
            return { healthy: false };
        default:
            return state;
    }
};
