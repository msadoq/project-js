import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/GroundAlarmView/setEntryPointDefault';
import constants from 'constants';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));
describe('viewManager', () => {
  describe('viewManager :: GroundAlarmView', () => {
    test('viewManager :: GroundAlarmView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'groundAlarmEP',
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
