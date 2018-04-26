import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/Events';
import EventReducer, {
  getEvents,
  getObsoleteEvents,
  isDataIdInEventCache,
  isTimestampEventInEvents,
} from '.';

const reducer = freezeArgs(EventReducer);

/* ------------------------ REDUCER ------------------------ */
describe('store:knownRanges:reducer', () => {
  test('should returns initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).toEqual({});
  });
  test('should ignore unknown action', () => {
    const state = { tbdId1: { intervals: [[10, 20], [30, 40]] } };
    expect(reducer(state, {})).toBe(state);
  });
  test('Add Event: Should ignore unknown eventCategory', () => {
    const dataId = {
      catalog: 'LogbookEventDefinition',
      parameterName: 'OBSOLETE_PARAMETER',
      comObject: '',
      domainId: 4,
      sessionId: 0,
    };
    const nextState = reducer({}, actions.sendArchiveQuery(dataId, 'parameterName', 123456789));
    expect(nextState).toEqual({});
  });
  test('Add Event: Should ignore unknown eventType', () => {
    const dataId = {
      catalog: 'LogbookEventDefinition',
      parameterName: '',
      comObject: 'LogbookEvent',
      domainId: 4,
      sessionId: 0,
    };
    const nextState = reducer({}, actions.sendArchiveQuery(dataId, 'parameterName', 123456789));
    expect(nextState).toEqual({});
  });
  test('Add Event: Should add one event to empty store.Events', () => {
    const dataId = {
      catalog: 'LogbookEventDefinition',
      parameterName: 'OBSOLETE_PARAMETER',
      comObject: 'LogbookEvent',
      domainId: 4,
      sessionId: 0,
    };
    const nextState = reducer({}, actions.sendArchiveQuery( dataId, 'parameterName', 123456789));
    expect(nextState).toEqual(
      {
        LogbookEvent: {
          OBSOLETE_PARAMETER: {
            '4-0': {
              parameterName: [
                123456789,
              ],
            },
          },
        },
      });
  });
  test('Add Event: Should add one tuple id with a parameterName and timestamp', () => {
    const dataId2 = {
      catalog: 'LogbookEventDefinition',
      parameterName: 'OBSOLETE_PARAMETER',
      comObject: 'LogbookEvent',
      domainId: 3,
      sessionId: 0,
    }
    const nextState = reducer({
      LogbookEvent: {
        OBSOLETE_PARAMETER: {
          '4-0': {
            parameterName: [
              123456789,
            ],
          },
        },
      },
    }, actions.sendArchiveQuery(dataId2, 'parameterName', 987456321));
    expect(nextState).toEqual(
      {
        LogbookEvent: {
          OBSOLETE_PARAMETER: {
            '4-0': {
              parameterName: [
                123456789,
              ],
            },
            '3-0': {
              parameterName: [
                987456321,
              ],
            },
          },
        },
      });
  });
  test('Add Event: Should add a new parameterName in the existing tuple', () => {
    const dataId = {
      catalog: 'LogbookEventDefinition',
      parameterName: 'OBSOLETE_PARAMETER',
      comObject: 'LogbookEvent',
      domainId: 4,
      sessionId: 0,
    };
    const nextState = reducer({
      LogbookEvent: {
        OBSOLETE_PARAMETER: {
          '4-0': {
            parameterName: [
              123456789,
            ],
          },
        },
      },
    }, actions.sendArchiveQuery(dataId, 'parameterName2', 987456321));
    expect(nextState).toEqual(
      {
        LogbookEvent: {
          OBSOLETE_PARAMETER: {
            '4-0': {
              parameterName: [
                123456789,
              ],
              parameterName2: [
                987456321,
              ],
            },
          },
        },
      });
  });
  test('Add Event: Should add one timestamp to existing event', () => {
    const dataId = {
      catalog: 'LogbookEventDefinition',
      parameterName: 'OBSOLETE_PARAMETER',
      comObject: 'LogbookEvent',
      domainId: 4,
      sessionId: 0,
    };
    const nextState = reducer({
      LogbookEvent: {
        OBSOLETE_PARAMETER: {
          '4-0': {
            parameterName: [
              123456789,
            ],
          },
        },
      },
    }, actions.sendArchiveQuery(dataId, 'parameterName', 987456321));
    expect(nextState).toEqual(
      {
        LogbookEvent: {
          OBSOLETE_PARAMETER: {
            '4-0': {
              parameterName: [
                123456789,
                987456321,
              ],
            },
          },
        },
      });
  });
  const state = {
    LogbookEvent: {
      OBSOLETE_PARAMETER: {
        '4-0': {
          parameterName: [
            123456789,
          ],
          parameterName2: [
            123456789,
          ],
        },
        '2-0': {
          parameterName: [
            123456789,
          ],
          parameterName2: [
            123456789,
            123456788,
            123456782,
          ],
        },
      },
    },
  }
  test('Remove Event: empty state', () => {
    const nextState = reducer({}, actions.removeEvents('LogbookEvent', 'OBSOLETE_PARAMETER', '4-0', 'parameterName2', []));
    expect(nextState).toEqual({});
  });
  test('Remove Event: Should ignore empty request', () => {
    const nextState = reducer(state, actions.removeEvents('', '', '', '', []));
    expect(nextState).toEqual(state);
  });
  test('Remove Event: Should ignore unknown eventCategory, eventType, tuple', () => {
    const nextState = reducer(state, actions.removeEvents('logbookEvent', 'TEST_PARAMETER', '4-0', '', []));
    expect(nextState).toEqual(state);
    const nextState2 = reducer(state, actions.removeEvents('', 'TEST_PARAMETER', '4-0', '', []));
    expect(nextState2).toEqual(state);
  });
  test('Remove Event: remove all tuple events regardless of the parameterName', () => {
    const nextState = reducer(state, actions.removeEvents('LogbookEvent', 'OBSOLETE_PARAMETER', '4-0', '', []));
    expect(nextState).toEqual(
      {
        LogbookEvent: {
          OBSOLETE_PARAMETER: {
            '2-0': {
              parameterName: [
                123456789,
              ],
              parameterName2: [
                123456789,
                123456788,
                123456782,
              ],
            },
          },
        },
      }
    );
  });
  test('Remove Event: remove all tuple / parameterName events', () => {
    const nextState = reducer(state, actions.removeEvents('LogbookEvent', 'OBSOLETE_PARAMETER', '4-0', 'parameterName2', []));
    expect(nextState).toEqual(
      {
        LogbookEvent: {
          OBSOLETE_PARAMETER: {
            '4-0': {
              parameterName: [
                123456789,
              ],
            },
            '2-0': {
              parameterName: [
                123456789,
              ],
              parameterName2: [
                123456789,
                123456788,
                123456782,
              ],
            },
          },
        },
      }
    );
  });
  test('Remove Event: remove all tuple / parameterName events', () => {
    const nextState = reducer(state, actions.removeEvents('LogbookEvent', 'OBSOLETE_PARAMETER', '2-0', 'parameterName2', [123456782, 123456788]));
    expect(nextState).toEqual(
      {
        LogbookEvent: {
          OBSOLETE_PARAMETER: {
            '4-0': {
              parameterName: [
                123456789,
              ],
              parameterName2: [
                123456789,
              ],
            },
            '2-0': {
              parameterName: [
                123456789,
              ],
              parameterName2: [
                123456789,
              ],
            },
          },
        },
      }
    );
  });
});

/* ---------------------- SELECTOR ---------------------- */
describe('getKnownRanges', () => {
  const state = {
    Events: {
      LogbookEvent: {
        OBSOLETE_PARAMETER: {
          '4-0': {
            parameterName: [
              123456789,
            ],
            parameterName2: [
              123456789,
            ],
          },
          '2-0': {
            parameterName: [
              123456789,
            ],
            parameterName2: [
              123456789,
            ],
          },
        },
      },
    },
  };
  test('getEvents : should return Events timestamps', () => {
    expect(getEvents(state, { eventCategory: 'LogbookEvent', eventType: 'OBSOLETE_PARAMETER', tuple: '4-0', parameterName: 'parameterName2' }))
      .toEqual(state.Events.LogbookEvent.OBSOLETE_PARAMETER['4-0'].parameterName2);
  });
  test('getObsoleteEvents : should return obsolete logbookEvents timestamps', () => {
    expect(getObsoleteEvents(state, { tuple: '4-0', parameterName: 'parameterName2' }))
      .toEqual(state.Events.LogbookEvent.OBSOLETE_PARAMETER['4-0'].parameterName2);
  });
  test('isDataIdInEventCache : should return true', () => {
    const dataId = {
      sessionId: 0,
      domainId: 4,
      catalog: 'LogbookEventDefinition',
      comObject: 'LogbookEvent',
      parameterName: 'OBSOLETE_PARAMETER',
      provider: '*',
    };
    expect(isDataIdInEventCache(state, { dataId, parameter: 'parameterName2' }))
      .toEqual(true);
  });
  test('isDataIdInEventCache : should return false', () => {
    const dataId = {
      sessionId: 0,
      domainId: 4,
      catalog: 'LogbookEventDefinition',
      comObject: 'LogbookEvent',
      parameterName: 'OBSOLETE_PARAMETER',
      provider: '*',
    };
    expect(isDataIdInEventCache(state, { dataId, parameter: 'parameterName3' }))
      .toEqual(false);
  });
  test('isDataIdInEventCache : should return false', () => {
    const dataId = {
      sessionId: 0,
      domainId: 4,
      catalog: 'LogbookEventDefinition',
      comObject: 'LogbookEvent',
      parameterName: 'OBSOLETE_PARAMETER',
      provider: '*',
    };
    const state2 = {
      Events: {},
    };
    expect(isDataIdInEventCache(state2, { dataId, parameter: 'parameterName3' }))
      .toEqual(false);
  });
  test('isTimestampEventInEvents : should return true', () => {
    const dataId = {
      sessionId: 0,
      domainId: 4,
      catalog: 'LogbookEventDefinition',
      comObject: 'LogbookEvent',
      parameterName: 'OBSOLETE_PARAMETER',
      provider: '*',
    };
    expect(isTimestampEventInEvents(state, { dataId, parameter: 'parameterName2', timestamp: 123456789 }))
      .toEqual(true);
  });
  test('isTimestampEventInEvents : should return false', () => {
    const dataId = {
      sessionId: 0,
      domainId: 4,
      catalog: 'LogbookEventDefinition',
      comObject: 'LogbookEvent',
      parameterName: 'OBSOLETE_PARAMETER',
      provider: '*',
    };
    expect(isTimestampEventInEvents(state, { dataId, parameter: 'parameterName2', timestamp: 457872 }))
      .toEqual(false);
  });
});
