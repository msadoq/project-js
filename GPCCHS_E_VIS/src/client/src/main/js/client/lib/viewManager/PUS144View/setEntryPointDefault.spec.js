import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PUS144View/setEntryPointDefault';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));

describe('viewManager', () => {
  describe('viewManager :: PUS144View', () => {
    test('viewManager :: PUS144View :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'PUS144EP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus0144Model<Pus0144Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });

    test('viewManager :: PUS144View :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ connectedData: { domain: 'Niobé' } })).toEqual({
        name: 'PUS144EP',
        connectedData: {
          domain: 'Niobé',
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus0144Model<Pus0144Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });
  });
});
