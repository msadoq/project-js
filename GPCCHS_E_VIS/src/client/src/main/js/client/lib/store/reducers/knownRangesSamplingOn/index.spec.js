import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/knownRangesSamplingOn';
import knownRangesReducerSamplingOn, {
  getKnownRangesSamplingOn,
  getMissingIntervalsSamplingOn,
  isDataIdInCacheSamplingOn,
  isTimestampInKnownRangesSamplingOn,
  getUpperIntervalIsInKnownRangesSamplingOn,
  getTbdIdsAndDataIdListSamplingOn,
} from '.';

const reducer = freezeArgs(knownRangesReducerSamplingOn);

/* --- Reducer -------------------------------------------------------------- */

describe('store:knownRanges:reducer', () => {
  const dataId = {
    catalog: 'catalog',
    parameterName: 'paramName',
    comObject: 'comObject',
    domainId: 4,
    sessionId: 181,
  };
  test('should return initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).toEqual({});
  });
  test('should ignore unknown action', () => {
    const state = { tbdId1: { intervals: [[10, 20], [30, 40]] } };
    expect(reducer(state, {})).toBe(state);
  });
  test('Should add tbdId known interval: one interval', () => {
    const nextState = reducer({}, actions.sendArchiveQuerySamplingOn('myTbdId1', dataId, [15, 25], []));
    expect(nextState).toEqual({ myTbdId1: {
      flatDataId: 'catalog.paramName<comObject>:181:4:::',
      filters: [],
      intervals: [[15, 25]],
      dataId } });
    const nextState2 =
      reducer(nextState, actions.sendArchiveQuerySamplingOn('myTbdId1', dataId, [[10, 20], [50, 60]]));
    expect(nextState2).toEqual({ myTbdId1: {
      flatDataId: 'catalog.paramName<comObject>:181:4:::',
      filters: [],
      intervals: [[10, 25], [50, 60]],
      dataId } });
  });
  test('Should add tbdId known interval: multi intervals', () => {
    const nextState = reducer({ myTbdId0: {
      flatDataId: 'catalog.paramName0<comObject>:181:4:::',
      filters: [],
      intervals: [[15, 25]],
      dataId } },
      actions.sendArchiveQuerySamplingOn('myTbdId1', dataId, [[2, 6], [15, 25]]));
    expect(nextState).toEqual({
      myTbdId0: {
        flatDataId: 'catalog.paramName0<comObject>:181:4:::',
        filters: [],
        intervals: [[15, 25]],
        dataId },
      myTbdId1: {
        flatDataId: 'catalog.paramName<comObject>:181:4:::',
        filters: [],
        intervals: [[2, 6], [15, 25]],
        dataId } });
  });
  test('Remove intervals: empty state', () => {
    const nextState = reducer({}, actions.removeKnownRangesSamplingOn('tbdId1', [2, 4]));
    expect(nextState).toEqual({});
  });
  test('Remove intervals: unknown tbdId', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
    };
    const nextState = reducer(state, actions.removeKnownRangesSamplingOn('tbdId1', [2, 4]));
    expect(nextState).toEqual(state);
  });
  test('Remove intervals: known tbdId and interval', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
    };
    const nextState = reducer(state, actions.removeKnownRangesSamplingOn('tbdId', [20, 40]));
    expect(nextState).toEqual({
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 20], [40, 50]] } });
  });
  test('Remove intervals: known tbdId and complete interval', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
      tbdId2: {
        flatDataId: 'tbdId2',
        filters: [],
        intervals: [[20, 30]] },
    };
    const nextState = reducer(state, actions.removeKnownRangesSamplingOn('tbdId', [2, 50]));
    expect(nextState).toEqual({ tbdId2: {
      flatDataId: 'tbdId2',
      filters: [],
      intervals: [[20, 30]] } });
  });

  test('Reset intervals', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
      tbdId2: {
        flatDataId: 'tbdId2',
        filters: [],
        intervals: [[20, 30]] },
    };
    const nextState =
      reducer(state, actions.resetKnownRangeSamplingOn({ tbdId: { interval: [[20, 60]] } }));
    expect(nextState).toEqual({
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[20, 60]] } });
  });
});

/* --- Selectors -------------------------------------------------------------- */

describe('store:knownRanges:selectors', () => {
  const state = {
    knownRangesSamplingOn: {
      'catalog.paramName1<comObject>:2:1:::': {
        flatDataId: 'catalog.paramName1<comObject>:2:1:::',
        filters: [],
        intervals: [[2, 6], [15, 25]],
      },
      'catalog.paramName2<comObject>:2:1::extractedValue.=.2:': {
        flatDataId: 'catalog.paramName2<comObject>:2:1:::',
        filters: [{ field: 'extractedValue', operator: '=', operand: '2' }],
        intervals: [[0, 60], [115, 125]],
      },
    },
  };  // GENERAL
  describe('getKnownRangesSamplingOn', () => {
    test('should return knownRanges', () => {
      expect(getKnownRangesSamplingOn(state, { tbdId: 'catalog.paramName1<comObject>:2:1:::' }))
        .toEqual(state.knownRangesSamplingOn['catalog.paramName1<comObject>:2:1:::']);
    });
  });
  describe('getMissingIntervalsSamplingOn', () => {
    test('unknown tbdId', () => {
      expect(getMissingIntervalsSamplingOn(state, {
        tbdId: 'catalog.paramName3<comObject>:2:1:::',
        queryInterval: [5, 10] }))
      .toEqual([[5, 10]]);
    });
    test('known tbdId, complete interval', () => {
      expect(getMissingIntervalsSamplingOn(state, {
        tbdId: 'catalog.paramName1<comObject>:2:1:::',
        queryInterval: [50, 60] }))
      .toEqual([[50, 60]]);
    });
  });
  describe('isDataInCache', () => {
    const dataId = {
      catalog: 'catalog',
      parameterName: 'paramName',
      comObject: 'comObject',
      sessionId: 2,
      domainId: 1,
    };

    test('unknown dataId', () => {
      expect(isDataIdInCacheSamplingOn(state, { dataId })).toEqual([]);
    });
    test('known dataId without filter', () => {
      dataId.parameterName = 'paramName1';
      expect(isDataIdInCacheSamplingOn(state, { dataId })).toEqual(['catalog.paramName1<comObject>:2:1:::']);
    });
    test('known dataId with filter', () => {
      dataId.parameterName = 'paramName2';
      expect(isDataIdInCacheSamplingOn(state, { dataId }))
      .toEqual(['catalog.paramName2<comObject>:2:1::extractedValue.=.2:']);
    });
  });
  describe('isTimestampInKnownRangesSamplingOn', () => {
    const state2 = { knownRangesSamplingOn: {
      tbdId1: {
        flatDataId: 'tbdId1',
        filters: [],
        intervals: [[10, 20]],
      },
      tbdId2: {
        flatDataId: 'tbdId2',
        filters: [{ field: 'extractedValue', operator: '=', operand: '2' }],
        intervals: [[10, 20], [30, 40]],
      },
    } };
    test('empty state', () => {
      expect(isTimestampInKnownRangesSamplingOn({ knownRangesSamplingOn: {} }, { tbdId: 'tbdId', timestamp: '12' }))
      .toEqual(false);
    });
    test('unknown tbdId', () => {
      expect(isTimestampInKnownRangesSamplingOn(state2, { tbdId: 'tbdId', timestamp: '12' }))
      .toEqual(false);
    });
    test('tbdId ok and timestamp inside', () => {
      expect(isTimestampInKnownRangesSamplingOn(state2, { tbdId: 'tbdId2', timestamp: '12' }))
      .toEqual(true);
    });
    test('tbdId ok and timestamp outside', () => {
      expect(isTimestampInKnownRangesSamplingOn(state2, { tbdId: 'tbdId2', timestamp: '25' }))
      .toEqual(false);
    });
  });

  describe('getUpperIntervalIsInKnownRangesSamplingOn', () => {
    const state2 = { knownRangesSamplingOn: {
      tbdId1: {
        flatDataId: 'tbdId1',
        filters: [],
        intervals: [[10, 20]],
      },
      tbdId2: {
        flatDataId: 'tbdId2',
        filters: [{ field: 'extractedValue', operator: '=', operand: '2' }],
        intervals: [[10, 20], [30, 40]],
      },
    } };
    test('empty state', () => {
      expect(getUpperIntervalIsInKnownRangesSamplingOn({ knownRangesSamplingOn: {} }, 'tbdId', [1, 12]))
      .toEqual({ isInInterval: false, interval: [] });
    });
    test('unknown tbdId', () => {
      expect(getUpperIntervalIsInKnownRangesSamplingOn(state2, 'tbdId', [1, 12]))
      .toEqual({ isInInterval: false, interval: [] });
    });
    test('tbdId ok and timestamp inside', () => {
      expect(getUpperIntervalIsInKnownRangesSamplingOn(state2, 'tbdId2', [1, 12]))
      .toEqual({ isInInterval: true, interval: [10, 12] });
    });
    test('tbdId ok and timestamp outside', () => {
      expect(getUpperIntervalIsInKnownRangesSamplingOn(state2, 'tbdId2', [1, 25]))
      .toEqual({ isInInterval: false, interval: [] });
    });
  });

  describe('getTbdIdsAndDataIdListSamplingOn', () => {
    const state3 = {
      knownRangesSamplingOn: {
        tbdId1: {
          flatDataId: 'tbdId1',
          filters: [],
          intervals: [[10, 20]],
          dataId: 'dataId1',
        },
        tbdId2: {
          flatDataId: 'tbdId2',
          filters: [{ field: 'extractedValue', operator: '=', operand: '2' }],
          intervals: [[10, 20], [30, 40]],
          dataId: 'dataId2',
        },
      },
    };

    test('getTbdIdsAndDataIdListSamplingOn', () => {
      expect(getTbdIdsAndDataIdListSamplingOn(state3))
      .toEqual([{
        tbdId: 'tbdId1',
        dataId: 'dataId1',
      }, {
        tbdId: 'tbdId2',
        dataId: 'dataId2',
      }]);
    });
  });
});
