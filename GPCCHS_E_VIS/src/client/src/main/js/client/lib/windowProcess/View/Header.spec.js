import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Header from 'windowProcess/View/Header';
import { shallow } from 'enzyme';

const propsStub = {
  isViewsEditorOpen: false,
  title: 'stub',
  titleStyle: {},
  collapsed: false,
  isModified: false,
  saveView: () => {},
  collapseView: () => {},
  onContextMenu: () => {},
  domains: ['fr.cnes'],
  pageDomain: 'fr.cnes',
  workspaceDomain: '*',
  viewDomain: '*',
};

describe('windowProcess', () => {
  describe('windowProcess :: View', () => {
    describe('windowProcess :: View :: Header', () => {
      test('Header :: render', () => {
        const store = createStore(state => state, {});
        const tree = shallow(
          <Provider store={store}>
            <Header {...propsStub} />
          </Provider>
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
