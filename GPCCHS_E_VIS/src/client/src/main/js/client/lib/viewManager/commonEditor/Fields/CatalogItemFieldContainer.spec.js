import CatalogItemFieldContainer from 'viewManager/commonEditor/Fields/CatalogItemFieldContainer';
import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';

const propsStub = {
  pageId: 1,
  viewId: 1,
  domainName: 'domainName',
  timelineId: 'timelineId',
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: CatalogItemFieldContainer', () => {
        describe('CatalogItemFieldContainer :: render', () => {
          test('snapshot', () => {
            shallowRenderSnapshotInReduxForm(CatalogItemFieldContainer, propsStub, {});
          });
        });
      });
    });
  });
});
