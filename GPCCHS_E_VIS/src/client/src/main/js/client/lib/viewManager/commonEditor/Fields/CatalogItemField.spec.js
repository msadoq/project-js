import CatalogItemField from 'viewManager/commonEditor/Fields/CatalogItemField';
import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';

const propsStub = {
  catalogItems: [{
    name: 'CatalogItemFieldName',
    items: [],
  }],
  askCatalogItems: () => null,
  timelineId: 'timelineId',
  sessionId: 1,
  domainId: 1,
  catalogName: 'catalogName',
};
describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: CatalogItemField', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(CatalogItemField, propsStub, {});
        });
      });
    });
  });
});
