import ComObjectContainer from 'viewManager/commonEditor/Fields/ComObjectContainer';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

const propsStub = {
  domainName: 'domainName',
  timelineId: 'timelineId',
  viewId: 'viewId',
  pageId: 'pageId',
  catalogName: 'catalogName',
  itemName: 'itemName',
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: ComObjectContainer', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(ComObjectContainer, propsStub, {});
        });
      });
    });
  });
});
