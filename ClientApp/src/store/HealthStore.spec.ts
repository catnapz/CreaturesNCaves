/** 
 * Unit tests for HealthStore
 */

import * as HealthStore from '../store/HealthStore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureStore(middleware);


describe('HealthDisplay Redux Tests', () => {

    describe('HealthDisplay Reducer', () => {

        it('should set healthy=false as initial state', () => {
            const expectedState = {"healthy": false};
            const actualState = HealthStore.reducer(undefined, { type: ''});
            expect(actualState).toMatchObject(expectedState);
        });

        it('should set isLoading=true with a HealthCheckReqAction', () => {
            const expectedState = {healthy: true, isLoading: true};
            const actualState = HealthStore.reducer({healthy:true}, { type: "HEALTH_CHECK_REQ"});
            expect(actualState).toMatchObject(expectedState);
        });

        describe('while handling HealthCheckRespAction', () => {
            
            it('should return healthy=true with 200 status code', () => {
                const expectedState = {healthy: true};
                const actualState = HealthStore.reducer({healthy:false}, { 
                    type: "HEALTH_CHECK_RESP",
                    statusCode: 200
                });
                expect(actualState).toMatchObject(expectedState);
            });

            it('should return healthy=false with a non-200 status code', () => {
                const expectedState = {healthy: false};
                const actualState = HealthStore.reducer({healthy:false}, { 
                    type: "HEALTH_CHECK_RESP",
                    statusCode: 418
                });
                expect(actualState).toMatchObject(expectedState);
            });

        });

        it('should set healthy=false with a HealthCheckErrorAction', () => {
            const expectedState = {healthy: false};
            const actualState = HealthStore.reducer({healthy:true}, { type: "HEALTH_CHECK_ERROR"});
            expect(actualState).toMatchObject(expectedState);
        });
    });

    describe('HealthDisplay Actions', () => {

        describe('checkHealth action creator', () => {
            const checkHealth = HealthStore.actionCreators.checkHealth as any;
                    
            afterEach(() => {
                delete (global as any)['fetch'];
            });

            it('should call request and error actions when error occurs', async () => {
                (global as any)['fetch'] = jest.fn().mockImplementation( () => {throw new Error("Ignore Me, I'm a Mock Error")} );
                const store = mockStore({});
                await store.dispatch(checkHealth());
                const actions = store.getActions();
                const expectedActions = [
                    {"type": "HEALTH_CHECK_REQ"}, 
                    {"type": "HEALTH_CHECK_ERROR"}
                ]
                expect(actions).toEqual(expectedActions);
            });
            
            it('should call request and resp actions when server is available', async () => {
                (global as any)['fetch'] = jest.fn().mockResolvedValue({status: 200});
                const store = mockStore({});
                await store.dispatch(checkHealth());
                const actions = store.getActions();
                const expectedActions = [
                    {"type": "HEALTH_CHECK_REQ"}, 
                    {"type": 'HEALTH_CHECK_RESP', "statusCode": 200}
                ]
                expect(actions).toEqual(expectedActions);
            });

        });
    })
    
}); 