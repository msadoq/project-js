import { getData } from './dataReducer';

describe('GroundAlarmView:dataReducer', () => {
  const state = {
    GroundAlarmViewData: {
      v1: {
        data: {
          0: {},
          1: { transitions: [] },
          2: { transitions: [{ a: true }, { a: true }, { a: true }] },
          3: { transitions: [{ b: true }] },
          4: { transitions: [{ c: true }, { c: true }] },
          5: { transitions: [{ d: true }] },
          6: { transitions: [{ e: true }] },
          7: { transitions: [] },
          8: { transitions: [{ f: true }] },
        },
        lines: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      },
    },
  };
  describe('getData', () => {
    test('getData should flatten alarms and transitions (in "lines" field)', () => {
      expect(getData(state, { viewId: 'v1' })).toMatchSnapshot();
    });
  });
});
