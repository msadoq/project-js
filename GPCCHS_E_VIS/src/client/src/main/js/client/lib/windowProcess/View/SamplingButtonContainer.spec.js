import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SamplingButtonContainer from 'windowProcess/View/SamplingButtonContainer';
import { shallow } from 'enzyme';

const propsStubA = {
  viewId: 'abcdef-123456',
  pageId: 'zyxwvu-987654',
};

describe('windowProcess', () => {
  test('SamplingButtonContainer', () => {
    const storeA = createStore(state => state, {});
    const treeA = shallow(
      <Provider store={storeA}>
        <SamplingButtonContainer {...propsStubA} />
      </Provider>
    );
    expect(treeA).toMatchSnapshot();
  });
});
