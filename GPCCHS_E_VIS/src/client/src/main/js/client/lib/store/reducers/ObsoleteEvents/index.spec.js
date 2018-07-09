import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/ObsoleteEvents';
import EventReducer, {
  getObsoleteEvents,
  getMissingIntervals,
  isTimestampInObsoleteEvents,
  getUpperIntervalIsInObsoleteEvents,
} from '.';

const reducer = freezeArgs(EventReducer);

/* ------------------------ REDUCER ------------------------ */
describe('store:ObsoleteEvents:reducer', () => {
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
    const nextState = reducer({}, actions.removeObsoleteEvents('tbdId1', [2, 4]));
    expect(nextState).toEqual({});
  });
  test('Remove intervals: unknown tbdId', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
    };
    const nextState = reducer(state, actions.removeObsoleteEvents('tbdId1', [2, 4]));
    expect(nextState).toEqual(state);
  });
  test('Remove intervals: known tbdId and interval', () => {
    const state = {
      tbdId: {
        flatDataId: 'tbdId',
        filters: [],
        intervals: [[2, 50]] },
    };
    const nextState = reducer(state, actions.removeObsoleteEvents('tbdId', [20, 40]));
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
    const nextState = reducer(state, actions.removeObsoleteEvents('tbdId', [2, 50]));
    expect(nextState).toEqual({ tbdId2: {
      flatDataId: 'tbdId2',
      filters: [],
      intervals: [[20, 30]] } });
  });
});

/* ------------------------ SELECTORS ------------------------ */
describe('store:ObsoleteEvents:selectors', () => {
  const state = {
    ObsoleteEvents: {
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
  };
  describe('getObsoleteEvents', () => {
    test('should return ObsoleteEvents', () => {
      expect(getObsoleteEvents(state, { tbdId: 'catalog.paramName1<comObject>:2:1:::' }))
        .toEqual(state.ObsoleteEvents['catalog.paramName1<comObject>:2:1:::']);
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
  describe('isTimestampInObsoleteEvents', () => {
    const state2 = {
      ObsoleteEvents: {
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
      },
    };
    test('empty state', () => {
      expect(isTimestampInObsoleteEvents({ ObsoleteEvents: {} }, { tbdId: 'tbdId', timestamp: '12' }))
        .toEqual(false);
    });
    test('unknown tbdId', () => {
      expect(isTimestampInObsoleteEvents(state2, { tbdId: 'tbdId', timestamp: '12' }))
        .toEqual(false);
    });
    test('tbdId ok and timestamp inside', () => {
      expect(isTimestampInObsoleteEvents(state2, { tbdId: 'tbdId2', timestamp: '12' }))
        .toEqual(true);
    });
    test('tbdId ok and timestamp outside', () => {
      expect(isTimestampInObsoleteEvents(state2, { tbdId: 'tbdId2', timestamp: '25' }))
        .toEqual(false);
    });
  });
  describe('getUpperIntervalIsInObsoleteEvents', () => {
    const state2 = {
      ObsoleteEvents: {
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
      },
    };
    test('empty state', () => {
      expect(getUpperIntervalIsInObsoleteEvents({ ObsoleteEvents: {} }, 'tbdId', [1, 12]))
        .toEqual({ isInInterval: false, interval: [] });
    });
    test('unknown tbdId', () => {
      expect(getUpperIntervalIsInObsoleteEvents(state2, 'tbdId', [1, 12]))
        .toEqual({ isInInterval: false, interval: [] });
    });
    test('tbdId ok and timestamp inside', () => {
      expect(getUpperIntervalIsInObsoleteEvents(state2, 'tbdId2', [1, 12]))
        .toEqual({ isInInterval: true, interval: [10, 12] });
    });
    test('tbdId ok and timestamp outside', () => {
      expect(getUpperIntervalIsInObsoleteEvents(state2, 'tbdId2', [1, 25]))
        .toEqual({ isInInterval: false, interval: [] });
    });
  });
});
