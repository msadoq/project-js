import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Tabs from 'windowProcess/Navigation/Tabs';
import { shallow } from 'enzyme';

const propsStub = {
  pages: [
    {},
    {},
  ],
  windowId: '5c467cc7-bfb4-4fae-85a8-b0fe7e87dfde',
  detachWindow: true,
  attachWindow: '5c467cc7-bfb4-4fae-85a8-b0fe7e87dfde',
  focusedPageId: '5c467cc7-cezl-5dcs-f54s-kjdshnlskjd45',
  focusPage: () => {},
  askClosePage: () => {},
  movePageToWindow: () => {},
  moveTabOrder: () => {},
  pageDragEvent: () => {},
};

describe('windowProcess', () => {
  describe('windowProcess :: Navigation', () => {
    describe('windowProcess :: Navigation :: Tabs', () => {
      test('Tabs :: render', () => {
        const store = createStore(state => state, {});
        const tree = shallow(
          <Provider store={store}>
            <Tabs {...propsStub} />
          </Provider>
        );
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
