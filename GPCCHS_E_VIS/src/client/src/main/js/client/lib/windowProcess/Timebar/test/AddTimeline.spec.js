import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AddTimeline from '../LeftTab/AddTimeline';

const store = createStore(
  (state = {}) => state,
  {}
);

const propsStub = {
  form: 'test-addTimeline',
  handleSubmit: () => null,
  sessions: [],
  timelines: [],
  store,
  initialValues: {
    id: 'timeline01',
    color: '#11aa11',
    kind: 'session',
    sessionId: '10',
    master: false,
    offset: 0,
  },
};

describe.only('AddTimeline component', () => {
  it('AddTimeline (redux-form) renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <AddTimeline {...propsStub} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
