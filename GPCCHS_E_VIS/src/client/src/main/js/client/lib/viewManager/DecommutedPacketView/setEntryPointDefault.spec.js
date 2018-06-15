import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/DecommutedPacketView/setEntryPointDefault';

describe('viewManager', () => {
  describe('viewManager :: DecommutedPacketView', () => {
    test('viewManager :: DecommutedPacketView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'decommutedPacketEP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          formula: '',
        },
        stateColors: [],
      });
    });

    test('viewManager :: DecommutedPacketView :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ connectedData: { domain: 'Niobé' } })).toEqual({
        name: 'decommutedPacketEP',
        connectedData: {
          domain: 'Niobé',
          timeline: get('WILDCARD_CHARACTER'),
          formula: '',
        },
        stateColors: [],
      });
    });
  });
});
