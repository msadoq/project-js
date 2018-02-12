import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HistoryEditor from 'viewManager/HistoryView/Components/Editor/HistoryEditor';

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

describe('HistoryEditor :: render', () => {
  test('HistoryEditor :: render', () => {
    const tree = shallow(
      <HistoryEditor
        {...propsStub}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
