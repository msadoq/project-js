import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PUS15View/setEntryPointDefault';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));

describe('viewManager', () => {
  describe('viewManager :: PUS15View', () => {
    test('viewManager :: PUS15View :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'PUS15EP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus015Model<Pus015Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });

    test('viewManager :: PUS15View :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ connectedData: { domain: 'Niobé' } })).toEqual({
        name: 'PUS15EP',
        connectedData: {
          domain: 'Niobé',
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus015Model<Pus015Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });
  });
});
