import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TextEditor from 'viewManager/TextView/Components/Editor/TextEditor';

const propsStub = {
  viewId: 'view-id',
  pageId: 'pageId',
  search: 'search',
  tab: 0,
  openModal: () => null,
  updateViewTab: () => null,
  title: '',
  titleStyle: {},
  panels: {},
  updateViewPanels: () => null,
  configuration: {},
  currentDisplay: 0,
};

describe('TextEditor :: render', () => {
  test('TextEditor :: render', () => {
    const tree = shallow(
      <TextEditor
        {...propsStub}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
