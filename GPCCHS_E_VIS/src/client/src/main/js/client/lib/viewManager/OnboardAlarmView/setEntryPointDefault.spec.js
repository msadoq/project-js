import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/OnboardAlarmView/setEntryPointDefault';
import constants from 'constants';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));
describe('viewManager', () => {
  describe('viewManager :: OnboardAlarmView', () => {
    test('viewManager :: OnboardAlarmView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'onboardAlarmEP',
        id: 'MY_UUID',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          mode: constants.ALARM_MODE_ALL,
        },
        stateColors: [],
      });
    });
  });
});
