import EntryPointActionsContainer from 'viewManager/commonEditor/EntryPoint/EntryPointActionsContainer';
import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';

const propsStub = {
  search: null,
  viewId: 'viewId',
  pageId: 'pageId',
  viewType: 'TextView',
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: EntryPoint', () => {
      describe('viewManager :: commonEditor :: EntryPoint :: EntryPointActionsContainer', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(EntryPointActionsContainer, propsStub, {});
        });
      });
    });
  });
});
