import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PUSMMEView/setEntryPointDefault';

jest.mock('uuid', () => ({
  v4: () => 'MY_UUID',
}));

describe('viewManager', () => {
  describe('viewManager :: PUSMMEView', () => {
    test('viewManager :: PUSMMEView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'PUSMMEEP',
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.PusMmeModel<PusMmeModel>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });

    test('viewManager :: PUSMMEView :: setEntryPointDefault with nested data', () => {
      expect(setEntryPointDefault({ connectedData: { domain: 'Niobé' } })).toEqual({
        name: 'PUSMMEEP',
        connectedData: {
          domain: 'Niobé',
          session: get('WILDCARD_CHARACTER'),
          formula: 'PusGroundModelDefinition.PusMmeModel<PusMmeModel>', // fixed
          apidName: null,
          apidRawValue: null,
        },
        id: 'MY_UUID',
      });
    });
  });
});
