import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/TextView/setEntryPointDefault';

describe('viewManager', () => {
  describe('viewManager :: TextView', () => {
    test('viewManager :: TextView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'textEP',
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
          refTimestamp: 'groundDate',
          provider: get('WILDCARD_CHARACTER'),
        },
        stateColors: [],
      });
    });
    test('viewManager :: TextView :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ name: 'truc', connectedData: { format: 'float' } })).toEqual({
        name: 'truc',
        connectedData: {
          formula: '',
          unit: 's',
          digits: 5,
          format: 'float',
          filter: [],
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          convertFrom: '',
          convertTo: '',
          refTimestamp: 'groundDate',
          provider: get('WILDCARD_CHARACTER'),
        },
        stateColors: [],
      });
    });
  });
});
