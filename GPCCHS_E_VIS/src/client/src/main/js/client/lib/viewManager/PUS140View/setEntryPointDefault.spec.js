import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PUS140View/setEntryPointDefault';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));

describe('viewManager', () => {
  describe('viewManager :: PUS140View', () => {
    test('viewManager :: PUS140View :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'PUS140EP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus0140Model<Pus0140Model>', // fixed
          apidName: null,
          apids: null,
        },
        id: 'MY_UUID',
      });
    });

    test('viewManager :: PUS140View :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ connectedData: { domain: 'Niobé' } })).toEqual({
        name: 'PUS140EP',
        connectedData: {
          domain: 'Niobé',
          timeline: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus0140Model<Pus0140Model>', // fixed
          apidName: null,
          apids: null,
        },
        id: 'MY_UUID',
      });
    });
  });
});
