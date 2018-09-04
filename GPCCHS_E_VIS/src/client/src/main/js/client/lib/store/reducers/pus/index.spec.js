import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/pus/knownPus';
import { savePusData } from 'store/actions/pus';
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
    const dataId = {
      apids: ['ORBIT'],
      domainId: 4,
      sessionId: 0,
    };
    const nextState = reducer({}, actions.sendArchiveQuery(pusService, dataId, [15, 25], false));
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
      reducer(nextState, actions.sendArchiveQuery(pusService, dataId, [50, 60], false));
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

describe('savePusData', () => {
  test('should not add a delta out of range, empty state', () => {
    const state = {
      11: {
        '0:0:26': {
          interval: [122, 124],
        },
      },
    };
    const pusService = 11;
    const flattenId = '0:0:26';
    const groundDate = 126;
    const paylaod = {
      blah: 'test delta',
    };
    const isModel = false;
    const dataType = 5;
    expect(
      reducer(
        state,
        savePusData(
          pusService,
          flattenId,
          groundDate,
          paylaod,
          isModel,
          dataType
        )
      )).toEqual({
        11: {
          '0:0:26': {
            interval: [122, 124],
          },
        },
      });
  });
  test('should add a delta, empty state', () => {
    const state = {
      11: {
        '0:0:26': {
          interval: [122, 124],
        },
      },
    };
    const pusService = 11;
    const flattenId = '0:0:26';
    const groundDate = 123;
    const paylaod = {
      blah: 'test delta',
    };
    const isModel = false;
    const dataType = 5;
    expect(
      reducer(
        state,
        savePusData(
          pusService,
          flattenId,
          groundDate,
          paylaod,
          isModel,
          dataType
        )
      )).toEqual({
        11: {
          '0:0:26': {
            interval: [122, 124],
            deltas: {
              123: {
                dataType: 5,
                payload: {
                  blah: 'test delta',
                },
              },
            },
          },
        },
      });
  });
  test('should add a delta, non empty state for delta', () => {
    const state = {
      11: {
        '0:0:26': {
          interval: [122, 140],
          deltas: {
            123: {
              dataType: 5,
              payload: {
                blah: 'test delta',
              },
            },
            124: {
              dataType: 5,
              payload: {
                blah: 'test delta 2',
              },
            },
            126: {
              dataType: 5,
              payload: {
                blah: 'test delta 3',
              },
            },
          },
        },
      },
    };
    const pusService = 11;
    const flattenId = '0:0:26';
    const groundDate = 128;
    const paylaod = {
      blah: 'test delta 4',
    };
    const isModel = false;
    const dataType = 5;
    expect(
      reducer(
        state,
        savePusData(
          pusService,
          flattenId,
          groundDate,
          paylaod,
          isModel,
          dataType
        )
      )).toEqual({
        11: {
          '0:0:26': {
            interval: [122, 140],
            deltas: {
              123: {
                dataType: 5,
                payload: {
                  blah: 'test delta',
                },
              },
              124: {
                dataType: 5,
                payload: {
                  blah: 'test delta 2',
                },
              },
              126: {
                dataType: 5,
                payload: {
                  blah: 'test delta 3',
                },
              },
              128: {
                dataType: 5,
                payload: {
                  blah: 'test delta 4',
                },
              },
            },
          },
        },
      });
  });
  test('should add a model and update interval start, empty state', () => {
    const state = {
      11: {
        '0:0:26': {
          interval: [122, 140],
          deltas: {
            123: {
              dataType: 5,
              payload: {
                blah: 'test delta',
              },
            },
          },
        },
      },
    };
    const pusService = 11;
    const flattenId = '0:0:26';
    const groundDate = 128;
    const paylaod = {
      blah: 'test model',
    };
    const isModel = true;
    const dataType = 4;
    expect(
      reducer(
        state,
        savePusData(
          pusService,
          flattenId,
          groundDate,
          paylaod,
          isModel,
          dataType
        )
      )).toEqual({
        11: {
          '0:0:26': {
            interval: [128, 140],
            deltas: {},
            model: {
              groundDate: 128,
              payload: {
                blah: 'test model',
              },
            },
          },
        },
      });
  });
  test('should add a model, update interval start and remove deltas, empty state', () => {
    const state = {
      11: {
        '0:0:26': {
          interval: [122, 140],
          deltas: {
            123: {
              dataType: 5,
              payload: {
                blah: 'test delta',
              },
            },
            124: {
              dataType: 5,
              payload: {
                blah: 'test delta 2',
              },
            },
            126: {
              dataType: 5,
              payload: {
                blah: 'test delta 3',
              },
            },
            128: {
              dataType: 5,
              payload: {
                blah: 'test delta 4',
              },
            },
          },
        },
      },
    };
    const pusService = 11;
    const flattenId = '0:0:26';
    const groundDate = 128;
    const paylaod = {
      blah: 'test model',
    };
    const isModel = true;
    const dataType = 4;
    expect(
      reducer(
        state,
        savePusData(
          pusService,
          flattenId,
          groundDate,
          paylaod,
          isModel,
          dataType
        )
      )).toEqual({
        11: {
          '0:0:26': {
            interval: [128, 140],
            deltas: {},
            model: {
              groundDate: 128,
              payload: {
                blah: 'test model',
              },
            },
          },
        },
      });
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
