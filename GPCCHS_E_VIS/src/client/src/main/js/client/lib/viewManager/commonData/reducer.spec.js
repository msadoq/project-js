import { injectTabularData, mapTabularData, purgeTabularData, removeTabularData } from './reducer';

const createObj =
  index =>
    (keys = {}) =>
      keys.reduce((acc, cur) => ({ ...acc, [cur]: index }), {});

const keys = ['keyA', 'keyB', 'keyC'];

const createPayload =
  (n, offset = 0) =>
    [...new Array(n)].map((_, index) => createObj(index + offset)(keys));

describe('viewManager/commonData/reducer', () => {
  let tableId;

  beforeEach(() => {
    tableId = 'tableId';
  });

  describe('injectTabularData', () => {
    test('should inject properly 10 elements in an empty state', () => {
      const state = {};

      const updatedState =
        injectTabularData(
          state,
          tableId,
          createPayload(10)
        );

      expect(updatedState.tables[tableId].data.length)
        .toEqual(10);
    });
    test('should inject properly 10 element in state with 10 element', () => {
      const state = {
        tables: {
          [tableId]: {
            data: createPayload(10),
          },
        },
      };

      const updatedState =
        injectTabularData(
          state,
          tableId,
          createPayload(10)
        );

      expect(updatedState.tables[tableId].data.length)
        .toEqual(20);
    });
  });
  describe('removeTabularData', () => {
    test('should noop if data table is empty', () => {
      const state = {
        tables: {
          [tableId]: {
            data: [],
          },
        },
      };

      const updatedState = removeTabularData(state, tableId, () => true);

      expect(updatedState.tables[tableId].data.length)
        .toEqual(0);
    });
    test('should remove elements depending on a specified condition', () => {
      const state = {
        tables: {
          [tableId]: {
            data: createPayload(20),
          },
        },
      };

      const updatedState =
        removeTabularData(state, tableId, el => [0, 1].includes(el.keyA));

      expect(updatedState.tables[tableId].data.length)
        .toEqual(18);
      expect(updatedState.tables[tableId].data)
        .toEqual(createPayload(20).slice(2));
    });
  });
  describe('purgeTabularData', () => {
    test('should remove all data', () => {
      const state = {
        tables: {
          [tableId]: {
            data: createPayload(100),
          },
        },
      };

      const updatedState = purgeTabularData(state, tableId);

      expect(updatedState.tables[tableId].data.length)
        .toEqual(0);
    });
  });
  describe('mapTabularData', () => {
    test('should update all object with map function', () => {
      const state = {
        tables: {
          [tableId]: {
            data: createPayload(100),
          },
        },
      };

      const updatedState =
        mapTabularData(
          state,
          tableId,
          el => ({ keyA: el.keyA + 1, keyB: el.keyB + 1, keyC: el.keyC + 1 }));

      expect(updatedState.tables[tableId].data)
        .toEqual(createPayload(100, 1));
    });
  });
});
