import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MimicEditorContainer from 'viewManager/MimicView/Components/Editor/MimicEditorContainer';

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

describe('MimicEditorContainer :: render', () => {
  test('MimicEditorContainer :: render', () => {
    const Decorated = reduxForm({ form: 'testForm' })(MimicEditorContainer);
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
