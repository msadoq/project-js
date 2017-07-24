import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/knownRanges';
import knownRangesReducer, {
  getKnownRanges,
  getKnownIntervals,
  isDataInCache,
} from '.';

const reducer = freezeArgs(knownRangesReducer);

/* --- Reducer -------------------------------------------------------------- */

describe('store:knownRanges:reducer', () => {
  test('should returns initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).toEqual({});
  });
  test('should ignore unknown action', () => {
    const state = { tbdId1: [[10, 20], [30, 40]] };
    expect(reducer(state, {})).toBe(state);
  });
  test('Should add tbdId known interval: one interval', () => {
    const nextState = reducer({}, actions.addKnownRanges('myTbdId1', [15, 25]));
    expect(nextState).toEqual({ myTbdId1: [[15, 25]] });
    const nextState2 = reducer(nextState, actions.addKnownRanges('myTbdId1', [[10, 20], [50, 60]]));
    expect(nextState2).toEqual({ myTbdId1: [[10, 25], [50, 60]] });
  });
  test('Should add tbdId known interval: multi intervals', () => {
    const nextState = reducer({ myTbdId0: [[15, 25]] },
      actions.addKnownRanges('myTbdId1', [[2, 6], [15, 25]]));
    expect(nextState).toEqual({ myTbdId0: [[15, 25]], myTbdId1: [[2, 6], [15, 25]] });
  });
  test('Remove intervals: empty state', () => {
    const nextState = reducer({}, actions.removeKnownRanges('tbdId1', [2, 4]));
    expect(nextState).toEqual({});
  });
  test('Remove intervals: unknown tbdId', () => {
    const nextState = reducer({ tbdId: [[2, 50]] }, actions.removeKnownRanges('tbdId1', [2, 4]));
    expect(nextState).toEqual({ tbdId: [[2, 50]] });
  });
  test('Remove intervals: known tbdId and interval', () => {
    const nextState = reducer({ tbdId: [[2, 50]] }, actions.removeKnownRanges('tbdId', [20, 40]));
    expect(nextState).toEqual({ tbdId: [[2, 20], [40, 50]] });
  });
  test('Remove intervals: known tbdId and complete interval', () => {
    const nextState = reducer({ tbdId: [[2, 50]], tbdId2: [[20, 30]] }, actions.removeKnownRanges('tbdId', [2, 50]));
    expect(nextState).toEqual({ tbdId2: [[20, 30]] });
  });
});

/* --- Selectors -------------------------------------------------------------- */

describe('store:knownRanges:selectors', () => {
  // GENERAL
  describe('getKnownRanges', () => {
    test('should return knownRanges', () => {
      const state = {
        knownRanges: {
          tbdId1: [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(getKnownRanges(state)).toEqual(state.knownRanges);
    });
  });
  describe('getKnownIntervals', () => {
    test('should return knownRanges for a specified tbdId', () => {
      const state = {
        knownRanges: {
          tbdId1: [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(getKnownIntervals(state, { tbdId: 'tbdId1' })).toEqual(state.knownRanges.tbdId1);
    });
    test('should return undefined for an unknown tbdId', () => {
      const state = {
        knownRanges: {
          tbdId1: [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(getKnownIntervals(state, { tbdId: 'unknownTbdId1' })).toBeUndefined();
    });
  });
  describe('isDataInCache', () => {
    const dataId = {
      catalog: 'catalog',
      parameterName: 'paramName',
      comObject: 'comObject',
      sessionId: 1,
      domainId: 2,
    };

    test('unknown dataId', () => {
      const state = {
        knownRanges: {
          'catalog.paramName<comObject>:1:2': [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(isDataInCache(state, { dataId, timestamp: 10 })).toEqual(false);
    });
    test('known dataId, timestamp inside interval', () => {
      const state = {
        knownRanges: {
          'catalog.paramName<comObject>:1:2': [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(isDataInCache(state, { dataId, timestamp: 18 })).toEqual(true);
    });
    test('known dataId, timestamp outside interval', () => {
      const state = {
        knownRanges: {
          tbdId1: [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(isDataInCache(state, { dataId, timestamp: 10 })).toEqual(false);
    });
    test('tbdId containing dataId, timestamp inside interval', () => {
      const state = {
        knownRanges: {
          'catalog.paramName<comObject>:1:2:filter': [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(isDataInCache(state, { dataId, timestamp: 18 })).toEqual(true);
    });
    test('tbdId containing dataId, timestamp outside interval', () => {
      const state = {
        knownRanges: {
          'catalog.paramName<comObject>:1:2:filter': [[2, 6], [15, 25]],
          tbdId2: [[0, 60], [115, 125]],
        },
      };
      expect(isDataInCache(state, { dataId, timestamp: 10 })).toEqual(false);
    });
  });
});
