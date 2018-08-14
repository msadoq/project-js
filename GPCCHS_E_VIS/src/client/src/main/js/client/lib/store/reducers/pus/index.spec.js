import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/pus/knownPus';
import EventReducer, {
  getKnownPus,
  getMissingIntervals,
} from '.';

const reducer = freezeArgs(EventReducer);

/* ------------------------ REDUCER ------------------------ */
describe('store:Pus:reducer', () => {
  const pusService = 11;

  test('should returns initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).toEqual({});
  });
  test('should ignore unknown action', () => {
    const state = { 'ORBIT:0:4': { intervals: [[10, 20], [30, 40]], apidName: 'ORBIT', apidRawValue: 2 } };
    expect(reducer(state, {})).toBe(state);
  });
  test('Should add pudIs known interval: one interval then multi interval', () => {
    const nextState = reducer({}, actions.sendArchiveQuery(pusService, 'ORBIT:0:4', [15, 25], false));
    expect(nextState).toEqual(
      {
        11: {
          'ORBIT:0:4': {
            interval: [15, 25],
          },
        },
      }
    );
    const nextState2 =
      reducer(nextState, actions.sendArchiveQuery(11, 'ORBIT:0:4', [50, 60], false));
    expect(nextState2).toEqual(
      {
        11: {
          'ORBIT:0:4': {
            interval: [50, 60],
          },
        },
      }
    );
  });
});

/* ------------------------ SELECTORS ------------------------ */
describe('store:knownPus:selectors', () => {
  const state = {
    knownPus: {
      11: {
        'YOLO:0:4': {
          interval: [20, 30],
        },
        'ORBIT:0:4': {
          interval: [2, 50],
        },
      },
    },
  };
  describe('getKnownPus', () => {
    test('should return knownPus', () => {
      expect(getKnownPus(state, { pusService: 11, pusId: 'ORBIT:0:4' }))
        .toEqual(state.knownPus[11]['ORBIT:0:4']);
    });
    test('should return undefined', () => {
      expect(getKnownPus(state, { pusService: 11, pusId: 'TEST:0:4' }))
        .toBeFalsy();
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
