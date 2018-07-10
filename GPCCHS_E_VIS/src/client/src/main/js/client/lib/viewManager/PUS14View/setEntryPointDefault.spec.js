import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PUS14View/setEntryPointDefault';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));

describe('viewManager', () => {
  describe('viewManager :: PUS14View', () => {
    test('viewManager :: PUS14View :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'PUS14EP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus014Model<Pus014Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });

    test('viewManager :: PUS14View :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ connectedData: { domain: 'Niobé' } })).toEqual({
        name: 'PUS14EP',
        connectedData: {
          domain: 'Niobé',
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus014Model<Pus014Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });
  });
});
