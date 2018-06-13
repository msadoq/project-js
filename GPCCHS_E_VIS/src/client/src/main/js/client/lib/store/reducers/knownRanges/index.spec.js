// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : CReation of knownRanges reducer and actions
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : Update of knownRanges reducer and actions
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : update of preparePubSup middleware .
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : creatin of selectors on datamap
// VERSION : 1.1.2 : DM : #6700 : 27/07/2017 : update preparePubSub and add unit tests for it
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Add PubSubController and retrieveLast/Range update
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// END-HISTORY
// ====================================================================

import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/knownRanges';
import knownRangesReducer, {
  getKnownRanges,
  getMissingIntervals,
  isDataIdInCache,
  isTimestampInKnownRanges,
  getUpperIntervalIsInKnownRanges,
  getTbdIdsAndDataIdList,
} from '.';

const reducer = freezeArgs(knownRangesReducer);

/* --- Reducer -------------------------------------------------------------- */

describe('store:knownRanges:reducer', () => {
  const dataId = {
    catalog: 'catalog',
    parameterName: 'paramName',
    comObject: 'comObject',
    domainId: 4,
    sessionId: 181,
  };
  test('should returns initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).toEqual({});
  });
  test('should ignore unknown action', () => {
    const state = { tbdId1: { intervals: [[10, 20], [30, 40]] } };
    expect(reducer(state, {})).toBe(state);
  });
  test('Should add tbdId known interval: one interval', () => {
    const nextState = reducer({}, actions.sendArchiveQuery('myTbdId1', dataId, [15, 25], []));
    expect(nextState).toEqual({ myTbdId1: {
      flatDataId: 'catalog.paramName<comObject>:181:4:::',
      filters: [],
      intervals: [[15, 25]],
      dataId } });
    const nextState2 =
      reducer(nextState, actions.sendArchiveQuery('myTbdId1', dataId, [[10, 20], [50, 60]]));
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
      actions.sendArchiveQuery('myTbdId1', dataId, [[2, 6], [15, 25]]));
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
    const nextState = reducer({}, actions.removeKnownRanges('tbdId1', [2, 4]));
    expect(nextState).toEqual({});
  });
  test('Remove intervals: unknown tbdId', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
    };
    const nextState = reducer(state, actions.removeKnownRanges('tbdId1', [2, 4]));
    expect(nextState).toEqual(state);
  });
  test('Remove intervals: known tbdId and interval', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
    };
    const nextState = reducer(state, actions.removeKnownRanges('tbdId', [20, 40]));
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
    const nextState = reducer(state, actions.removeKnownRanges('tbdId', [2, 50]));
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
    const nextState = reducer(state, actions.resetKnownRange({ tbdId: { interval: [[20, 60]] } }));
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
    knownRanges: {
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
  describe('getKnownRanges', () => {
    test('should return knownRanges', () => {
      expect(getKnownRanges(state, { tbdId: 'catalog.paramName1<comObject>:2:1:::' }))
        .toEqual(state.knownRanges['catalog.paramName1<comObject>:2:1:::']);
    });
  });
  describe('getMissingIntervals', () => {
    test('unknown tbdId', () => {
      expect(getMissingIntervals(state, {
        tbdId: 'catalog.paramName3<comObject>:2:1:::',
        queryInterval: [5, 10] }))
      .toEqual([[5, 10]]);
    });
    test('known tbdId, complete interval', () => {
      expect(getMissingIntervals(state, {
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
      expect(isDataIdInCache(state, { dataId })).toEqual([]);
    });
    test('known dataId without filter', () => {
      dataId.parameterName = 'paramName1';
      expect(isDataIdInCache(state, { dataId })).toEqual(['catalog.paramName1<comObject>:2:1:::']);
    });
    test('known dataId with filter', () => {
      dataId.parameterName = 'paramName2';
      expect(isDataIdInCache(state, { dataId }))
      .toEqual(['catalog.paramName2<comObject>:2:1::extractedValue.=.2:']);
    });
  });
  describe('isTimestampInKnownRanges', () => {
    const state2 = { knownRanges: {
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
      expect(isTimestampInKnownRanges({ knownRanges: {} }, { tbdId: 'tbdId', timestamp: '12' }))
      .toEqual(false);
    });
    test('unknown tbdId', () => {
      expect(isTimestampInKnownRanges(state2, { tbdId: 'tbdId', timestamp: '12' }))
      .toEqual(false);
    });
    test('tbdId ok and timestamp inside', () => {
      expect(isTimestampInKnownRanges(state2, { tbdId: 'tbdId2', timestamp: '12' }))
      .toEqual(true);
    });
    test('tbdId ok and timestamp outside', () => {
      expect(isTimestampInKnownRanges(state2, { tbdId: 'tbdId2', timestamp: '25' }))
      .toEqual(false);
    });
  });

  describe('getUpperIntervalIsInKnownRanges', () => {
    const state2 = { knownRanges: {
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
      expect(getUpperIntervalIsInKnownRanges({ knownRanges: {} }, 'tbdId', [1, 12]))
      .toEqual({ isInInterval: false, interval: [] });
    });
    test('unknown tbdId', () => {
      expect(getUpperIntervalIsInKnownRanges(state2, 'tbdId', [1, 12]))
      .toEqual({ isInInterval: false, interval: [] });
    });
    test('tbdId ok and timestamp inside', () => {
      expect(getUpperIntervalIsInKnownRanges(state2, 'tbdId2', [1, 12]))
      .toEqual({ isInInterval: true, interval: [10, 12] });
    });
    test('tbdId ok and timestamp outside', () => {
      expect(getUpperIntervalIsInKnownRanges(state2, 'tbdId2', [1, 25]))
      .toEqual({ isInInterval: false, interval: [] });
    });
  });

  describe('getTbdIdsAndDataIdList', () => {
    const state3 = {
      knownRanges: {
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

    test('getTbdIdsAndDataIdList', () => {
      expect(getTbdIdsAndDataIdList(state3))
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
