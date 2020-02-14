/** 
 * Unit tests for Counter Component
 */

import * as CounterStore from '../store/CounterStore';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('Counter Reducer', () => {

    it('should set count=0 as initial state', () => {
        const expectedState = {count: 0};
        const actualState = CounterStore.reducer(undefined, { type: ''});
        expect(actualState).toMatchObject(expectedState);
    });

    it('should increment count with a IncrementCountAction', () => {
        const expectedState = {count: 3};
        const actualState = CounterStore.reducer({count: 2}, { type: 'INCREMENT_COUNT'});
        expect(actualState).toMatchObject(expectedState);
    });
    
    it('should increment count with a DecrementCountAction', () => {
        const expectedState = {count: 1};
        const actualState = CounterStore.reducer({count: 2}, { type: 'DECREMENT_COUNT'});
        expect(actualState).toMatchObject(expectedState);
    });

});

describe('Counter Actions', () => {
    
    describe('increment action creator', () => {
        const increment = CounterStore.actionCreators.increment;

        it('should call the INCREMENT_COUNT action', async () => {
            const store = mockStore({});
            await store.dispatch( increment() );
            const actions = store.getActions();
            const expectedActions = [
                {"type": "INCREMENT_COUNT"}
            ]
            expect(actions).toEqual(expectedActions);
        });

    });
    
    describe('decrement action creator', () => {
        const decrement = CounterStore.actionCreators.decrement;

        it('should call the DECREMENT_COUNT action', async () => {
            const store = mockStore({});
            await store.dispatch( decrement() );
            const actions = store.getActions();
            const expectedActions = [
                {"type": "DECREMENT_COUNT"}
            ]
            expect(actions).toEqual(expectedActions);
        });

    });

});
