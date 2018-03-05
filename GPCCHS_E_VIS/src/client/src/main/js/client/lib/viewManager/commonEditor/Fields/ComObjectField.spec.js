import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';
import ComObjectField from './ComObjectField';

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
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: ComObjectField', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(ComObjectField, propsStub, {});
        });
      });
    });
  });
});
