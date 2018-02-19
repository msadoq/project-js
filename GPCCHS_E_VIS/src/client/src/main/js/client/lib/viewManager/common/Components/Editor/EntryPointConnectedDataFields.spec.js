import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
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
            const renderer = new ShallowRenderer();
            renderer.render(
              <EntryPointConnectedDataFields
                {...propsStub}
              />
            );
            expect(renderer.getRenderOutput()).toMatchSnapshot();
          });
        });
      });
    });
  });
});
