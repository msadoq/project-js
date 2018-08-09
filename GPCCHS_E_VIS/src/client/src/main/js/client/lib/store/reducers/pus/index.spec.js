import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/pus/knownPus';
import EventReducer, {
  getKnownPus,
  getMissingIntervals,
} from '.';

const reducer = freezeArgs(EventReducer);

/* ------------------------ REDUCER ------------------------ */
describe('store:Pus:reducer', () => {
  test('should returns initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).toEqual({});
  });
  test('should ignore unknown action', () => {
    const state = { 'ORBIT:0:4': { intervals: [[10, 20], [30, 40]], apidName: 'ORBIT', apidRawValue: 2 } };
    expect(reducer(state, {})).toBe(state);
  });
  test('Should add pudIs known interval: one interval then multi interval', () => {
    const nextState = reducer({}, actions.sendArchiveQuery('ORBIT:0:4', 'ORBIT', [15, 25], []));
    expect(nextState).toEqual(
      {
        'ORBIT:0:4': {
          apidName: 'ORBIT',
          intervals: [[15, 25]],
        },
      }
    );
    const nextState2 =
      reducer(nextState, actions.sendArchiveQuery('ORBIT:0:4', 'ORBIT', [[10, 20], [50, 60]]));
    expect(nextState2).toEqual(
      {
        'ORBIT:0:4': {
          apidName: 'ORBIT',
          intervals: [[10, 25], [50, 60]],
        },
      }
    );
  });
  test('Remove intervals: empty state', () => {
    const nextState = reducer({}, actions.removeKnownPus('ORBIT:0:4', [2, 4]));
    expect(nextState).toEqual({});
  });
  test('Remove intervals: unknown tbdId', () => {
    const state = {
      'ORBIT:0:4': {
        apidName: 'ORBIT',
        intervals: [[2, 50]],
      },
    };
    const nextState = reducer(state, actions.removeKnownPus('test', [2, 4]));
    expect(nextState).toEqual(state);
  });
  test('Remove intervals: known pusId and interval', () => {
    const state = {
      'ORBIT:0:4': {
        apidName: 'ORBIT',
        intervals: [[2, 50]],
      },
    };
    const nextState = reducer(state, actions.removeKnownPus('ORBIT:0:4', [20, 40]));
    expect(nextState).toEqual({
      'ORBIT:0:4': {
        apidName: 'ORBIT',
        intervals: [[2, 20], [40, 50]],
      },
    });
  });
  test('Remove intervals: known pusId and complete interval', () => {
    const state =
      {
        'ORBIT:0:4': {
          apidName: 'ORBIT',
          intervals: [[2, 50]],
        },
        'YOLO:0:4': {
          apidName: 'YOLO',
          intervals: [[20, 30]],
        },
      };
    const nextState = reducer(state, actions.removeKnownPus('ORBIT:0:4', [2, 50]));
    expect(nextState).toEqual(
      {
        'YOLO:0:4': {
          apidName: 'YOLO',
          intervals: [[20, 30]],
        },
      }
    );
  });
});

/* ------------------------ SELECTORS ------------------------ */
describe('store:knownPus:selectors', () => {
  const state = {
    knownPus: {
      'YOLO:0:4': {
        apidName: 'YOLO',
        intervals: [[20, 30]],
      },
      'ORBIT:0:4': {
        apidName: 'ORBIT',
        intervals: [[2, 50]],
      },
    },
  };
  describe('getKnownPus', () => {
    test('should return knownPus', () => {
      expect(getKnownPus(state, { pusId: 'ORBIT:0:4' }))
        .toEqual(state.knownPus['ORBIT:0:4']);
    });
    test('should return undefined', () => {
      expect(getKnownPus(state, { pusId: 'EFDS:0:4' }))
        .toEqual(undefined);
    });
  });
  describe('getMissingIntervals', () => {
    test('unknown pusId', () => {
      expect(getMissingIntervals(state, {
        pusId: 'EFDS:0:4',
        queryInterval: [5, 10],
      })).toEqual([[5, 10]]);
    });
    test('known tbdId, complete interval', () => {
      expect(getMissingIntervals(state, {
        pusId: 'ORBIT:0:4',
        queryInterval: [50, 60] })).toEqual([[50, 60]]);
    });
  });
});
