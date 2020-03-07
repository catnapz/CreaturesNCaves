import {
  counterStoreReducer,
  increment,
  decrement,
  selectCount,
  COUNTER_STORE_FEATURE_KEY,
  ICounterStoreState,
  ICounterStorePersistableState,
  getCounterStorePersistableState
} from './counter-store.slice';

describe('Counter Slice', () => {

  describe('Reducer', () => {

    it("should handle initial state", () => {
      expect(counterStoreReducer(undefined, { type: "" })).toMatchObject({
        count: 0
      });
    });

    it("should handle increment action", () => {
      let state: ICounterStoreState = {
        count: 9
      };

      state = counterStoreReducer(state, increment());

      expect(state).toEqual({
        count: 10
      });

    });

    it("should handle increment action", () => {
      let state: ICounterStoreState = {
        count: 9
      };

      state = counterStoreReducer(state, decrement());

      expect(state).toEqual({
        count: 8
      });
    });

  });

  describe('Selectors', () => {
    const rootState = {
      [COUNTER_STORE_FEATURE_KEY]: {
        count: 4,
        incrementValue: 3
      }
    }

    it('should be able to select Locale state', () => {
      expect(selectCount(rootState)).toBe(4);
    });

  });

  describe('Persistable States', () => {
    const rootState = {
      [COUNTER_STORE_FEATURE_KEY]: {
        count: 4
      }
    }

    it('should have persistable states', () => {
      const expectedData: ICounterStorePersistableState = { count: 4 };
      const persistableState = getCounterStorePersistableState(rootState);
      expect(persistableState).toStrictEqual(expectedData);
    });

  });

});
