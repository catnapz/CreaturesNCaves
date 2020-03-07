import {
  IHealthStoreState,
  healthStoreReducer,
  healthRequest,
  healthResponse,
  HealthResponseAction,
  healthError,
  HealthErrorAction,
  selectHealthy,
  selectHealthCheckLoading,
  selectHealthStoreError,
  checkHealth
} from './health-store.slice';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { PayloadAction } from '@reduxjs/toolkit';

describe('HealthStore Slice', () => {

  describe('checkHealth thunk action', () => {

    const middleware = [thunk];
    const mockStore = configureStore(middleware);

    afterEach(() => {
      delete (global as any)['fetch'];
    });

    it('should call request and error actions when error occurs', async () => {
      (global as any)['fetch'] = jest.fn().mockImplementation(() => { throw new Error("Ignore Me, I'm a Mock Error") });
      const store = mockStore({});
      await store.dispatch(checkHealth() as any);
      const actions = store.getActions();
      const expectedActions: PayloadAction<HealthErrorAction | any>[] = [
        { payload: undefined, type: "healthStore/healthRequest" },
        { payload: {
            error: {
              msg: "Unable to fetch health check"
            }
          }, 
          type: "healthStore/healthError" 
        },
      ]
      expect(actions).toEqual(expectedActions);
    });

    it('should call request and resp actions when server is available', async () => {
      (global as any)['fetch'] = jest.fn().mockResolvedValue({ status: 200 });
      const store = mockStore({});
      await store.dispatch(checkHealth() as any);
      const actions = store.getActions();
      const expectedActions: PayloadAction<HealthResponseAction | any>[] = [
        { payload: undefined, type: "healthStore/healthRequest" },
        { payload: { statusCode: 200 }, type: "healthStore/healthResponse"}
      ]
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('Reducer', () => {
    it('should handle initial state', () => {
      const expectedState: IHealthStoreState = {
        healthy: false
      }
      expect(healthStoreReducer(undefined, { type: '' })).toMatchObject(expectedState);
    });

    it('should handle healthRequest action', () => {
      const state: IHealthStoreState = {
        healthy: false,
        loading: false
      }
      const expectedState: IHealthStoreState = {
        healthy: false,
        loading: true,
      }
      expect(healthStoreReducer(state, healthRequest())).toMatchObject(expectedState);
    });

    it('should handle healthResponse action (healthy response)', () => {
      const state: IHealthStoreState = {
        healthy: false,
        loading: true
      }
      const expectedState: IHealthStoreState = {
        healthy: true,
        loading: false,
      }
      const actionPayLoad: HealthResponseAction = { statusCode: 200 };
      expect(healthStoreReducer(state, healthResponse(actionPayLoad))).toMatchObject(expectedState);
    });

    it('should handle healthResponse action (unhealthy response)', () => {
      const state: IHealthStoreState = {
        healthy: false,
        loading: true
      }
      const expectedState: IHealthStoreState = {
        healthy: false,
        loading: false,
      }
      const actionPayLoad: HealthResponseAction = { statusCode: 404 };
      expect(healthStoreReducer(state, healthResponse(actionPayLoad))).toMatchObject(expectedState);
    });

    it('should handle healthError action', () => {
      const state: IHealthStoreState = {
        healthy: true
      }

      const actionPayLoad: HealthErrorAction = { error: { msg: "test msg" } };
      const expectedState: IHealthStoreState = {
        healthy: false,
        error: { msg: "test msg" }
      }
      expect(healthStoreReducer(state, healthError(actionPayLoad))).toMatchObject(expectedState);
    });

  });

  describe('Selectors', () => {
    const rootState = {
      healthStore: {
        healthy: true,
        loading: true,
        error: { msg: "test msg" }
      }
    }

    it('should be able to select healthy state', () => {
      expect(selectHealthy(rootState)).toBe(true);
    })

    it('should be able to select loading state', () => {
      expect(selectHealthCheckLoading(rootState)).toBe(true);
    })

    it('should be able to select healthy state', () => {
      expect(selectHealthStoreError(rootState)).toStrictEqual({ msg: "test msg" });
    })
  });

});
