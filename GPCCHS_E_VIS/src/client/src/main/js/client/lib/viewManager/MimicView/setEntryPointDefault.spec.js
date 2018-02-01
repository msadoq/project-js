import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/MimicView/setEntryPointDefault';

describe('viewManager', () => {
  describe('viewManager :: MimicView', () => {
    test('viewManager :: MimicView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'mimicEP',
        connectedData: {
          formula: '',
          unit: 's',
          digits: 5,
          format: 'decimal',
          filter: [],
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          convertFrom: '',
          convertTo: '',
        },
        stateColors: [],
      });
    });
  });
});
