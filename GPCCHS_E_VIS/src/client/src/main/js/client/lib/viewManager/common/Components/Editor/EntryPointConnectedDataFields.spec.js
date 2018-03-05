import { shallowRenderSnapshot } from '../../../../common/jest/utils';
import EntryPointConnectedDataFields from './EntryPointConnectedDataFields';

const propsStub = {
  pageId: 'page1',
  viewId: 'view1',
  entryPoint: {},
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: false,
  valid: true,
  timeline: 'timeline',
  domain: 'domain',
  form: 'form',
  domains: [],
};
describe('viewManager', () => {
  describe('viewManager :: common', () => {
    describe('viewManager :: common :: Components', () => {
      describe('viewManager :: common :: Components :: Editor', () => {
        describe('viewManager :: common :: Components :: Editor :: EntryPointConnectedDataFields', () => {
          test('snapshot', () => {
            shallowRenderSnapshot(EntryPointConnectedDataFields, propsStub, {});
          });
        });
      });
    });
  });
});
