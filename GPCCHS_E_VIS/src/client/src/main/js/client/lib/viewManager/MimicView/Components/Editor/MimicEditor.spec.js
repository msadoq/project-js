import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MimicEditor from 'viewManager/MimicView/Components/Editor/MimicEditor';

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

describe('MimicEditor :: render', () => {
  test('MimicEditor :: render', () => {
    const tree = shallow(
      <MimicEditor
        {...propsStub}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
