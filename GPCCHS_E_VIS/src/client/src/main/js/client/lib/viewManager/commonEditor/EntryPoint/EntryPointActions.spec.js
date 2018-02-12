import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EntryPointActions from './EntryPointActions';

const propsStub = {
  search: null,
  viewId: 'viewId',
  pageId: 'pageId',
  viewType: 'TextView',
  changeSearch: () => null,
  openModal: () => null,
};

describe('EntryPointActions :: render', () => {
  test('EntryPointActions :: render', () => {
    const tree = shallow(
      <EntryPointActions
        {...propsStub}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
