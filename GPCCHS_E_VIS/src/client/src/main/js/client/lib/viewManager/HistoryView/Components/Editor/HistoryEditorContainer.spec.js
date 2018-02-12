import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HistoryEditorContainer from 'viewManager/HistoryView/Components/Editor/HistoryEditorContainer';

const propsStub = {
  viewId: 'view-id',
  pageId: 'page-id',
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

describe('HistoryEditorContainer :: render', () => {
  test('HistoryEditorContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(HistoryEditorContainer);
    const store = createStore(state => state, {});
    const tree = shallow(
      <Provider store={store}>
        <Decorated
          {...propsStub}
        />
      </Provider>
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
