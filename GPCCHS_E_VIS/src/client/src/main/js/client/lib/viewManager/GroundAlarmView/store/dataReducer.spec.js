import { getData } from './dataReducer';

describe('GroundAlarmView:dataReducer', () => {
  describe('reducer', () => {
  });
  describe('selectors', () => {
    describe('getData', () => {
      const state = {
        GroundAlarmViewData: {
          v1: {
            stuff: true,
          },
        },
      };
      test('get view data', () => {
        expect(getData(state, { viewId: 'v1' })).toEqual({ stuff: true });
      });
      test('get undefined when view is unknown', () => {
        expect(getData(state, { viewId: 'unknown_view' })).toBe(undefined);
      });
    });
  });
});
