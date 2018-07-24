import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PUS12View/setEntryPointDefault';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));

describe('viewManager', () => {
  describe('viewManager :: PUS12View', () => {
    test('viewManager :: PUS12View :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'PUS12EP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus012Model<Pus012Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });

    test('viewManager :: PUS12View :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ connectedData: { domain: 'Niobé' } })).toEqual({
        name: 'PUS12EP',
        connectedData: {
          domain: 'Niobé',
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.Pus012Model<Pus012Model>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });
  });
});
