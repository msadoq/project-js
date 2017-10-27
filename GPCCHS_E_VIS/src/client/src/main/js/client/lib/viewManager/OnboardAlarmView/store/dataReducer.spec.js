import { getData } from './dataReducer';

describe('OnboardAlarmView:dataReducer', () => {
  const state = {
    OnboardAlarmViewData: {
      v1: {
        stuff: true,
      },
    },
  };
  describe('getData', () => {
    test('getData should flatten alarms and transitions (in "lines" field)', () => {
      expect(getData(state, { viewId: 'v1' })).toMatchSnapshot();
    });
  });
});
