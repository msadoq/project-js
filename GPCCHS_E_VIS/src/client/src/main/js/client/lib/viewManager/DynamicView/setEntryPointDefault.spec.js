import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/DynamicView/setEntryPointDefault';

describe('viewManager', () => {
  describe('viewManager :: DynamicView', () => {
    test('viewManager :: DynamicView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'dynamicEP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          formula: '',
        },
        stateColors: [],
      });
    });
  });
});
