import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SamplingButton from 'windowProcess/View/SamplingButton';
import { shallow } from 'enzyme';

const propsStubA = {
  toggleSamplingStatus: () => {},
  viewId: 'abcdef-123456',
  sampling: {
    samplingLock: 'off',
    samplingStatus: 'off',
    zoomState: 'out',
  },
};

const propsStubB = {
  toggleSamplingStatus: () => {},
  viewId: 'abcdef-123456',
  sampling: {
    samplingLock: 'off',
    samplingStatus: 'on',
    zoomState: 'out',
  },
};

const propsStubC = {
  toggleSamplingStatus: () => {},
  viewId: 'abcdef-123456',
  sampling: {
    samplingLock: 'on',
    samplingStatus: 'off',
    zoomState: 'out',
  },
};

const propsStubD = {
  toggleSamplingStatus: () => {},
  viewId: 'abcdef-123456',
  sampling: {
    samplingLock: 'on',
    samplingStatus: 'on',
    zoomState: 'out',
  },
};

describe('windowProcess', () => {
  test('SamplingButton :: render A', () => {
    const storeA = createStore(state => state, {});
    const treeA = shallow(
      <Provider store={storeA}>
        <SamplingButton {...propsStubA} />
      </Provider>
    );
    expect(treeA).toMatchSnapshot();
  });
  test('SamplingButton :: render B', () => {
    const storeB = createStore(state => state, {});
    const treeB = shallow(
      <Provider store={storeB}>
        <SamplingButton {...propsStubB} />
      </Provider>
    );
    expect(treeB).toMatchSnapshot();
  });
  test('SamplingButton :: render C', () => {
    const storeC = createStore(state => state, {});
    const treeC = shallow(
      <Provider store={storeC}>
        <SamplingButton {...propsStubC} />
      </Provider>
    );
    expect(treeC).toMatchSnapshot();
  });
  test('SamplingButton :: render D', () => {
    const storeD = createStore(state => state, {});
    const treeD = shallow(
      <Provider store={storeD}>
        <SamplingButton {...propsStubD} />
      </Provider>
    );
    expect(treeD).toMatchSnapshot();
  });
});
