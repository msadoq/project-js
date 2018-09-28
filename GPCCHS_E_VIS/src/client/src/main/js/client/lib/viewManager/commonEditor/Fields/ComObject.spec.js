import ComObject from 'viewManager/commonEditor/Fields/ComObject';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

const propsStub = {
  timelineId: 'timelineId',
  comObjects: [{
    name: 'comObjectName',
    items: [],
  }],
  sessionId: 1,
  domainId: 1,
  catalogName: 'catalogName',
  itemName: 'itemName',
  askCatalogItemComObjects: () => null,
};
describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: ComObject', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(ComObject, propsStub, {});
        });
      });
    });
  });
});
