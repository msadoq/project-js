import React from 'react';
import { shallow } from 'enzyme';
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
describe('EntryPointConnectedDataFields :: render', () => {
  test('EntryPointConnectedDataFields :: render', () => {
    const tree = shallow(
      <EntryPointConnectedDataFields
        {...propsStub}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
