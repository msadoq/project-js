import CatalogField from 'viewManager/commonEditor/Fields/CatalogField';
import { REQUESTING } from 'store/reducers/catalogs';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';


const propsStub = {
  timelineId: 'timelineId',
  catalogs: [{
    name: 'catalogName',
    items: [],
  }],
  sessionId: 1,
  domainId: 1,
  askCatalogs: () => null,
};
describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: CatalogField', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(CatalogField, propsStub, {});
        });
        test('snapshot 2', () => {
          const propsStub2 = { ...propsStub, catalogs: REQUESTING };
          shallowRenderSnapshotInReduxForm(CatalogField, propsStub2, {});
        });
      });
    });
  });
});
