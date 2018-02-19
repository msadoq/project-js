import { shallowRenderSnapshot } from 'common/jest/utils';
import EntryPointActions from './EntryPointActions';

const propsStub = {
  search: null,
  viewId: 'viewId',
  pageId: 'pageId',
  viewType: 'TextView',
  changeSearch: () => null,
  openModal: () => null,
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: EntryPoint', () => {
      describe('viewManager :: commonEditor :: EntryPoint :: EntryPointActions', () => {
        test('snapshot', () => {
          shallowRenderSnapshot(EntryPointActions, propsStub, {});
        });
      });
    });
  });
});
