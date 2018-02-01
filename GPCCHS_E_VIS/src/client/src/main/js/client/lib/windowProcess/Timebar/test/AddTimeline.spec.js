// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix last two tests AddTimeline EditTimeline.
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Restore some snapshots in viewManager and windowProcess
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json patch
// END-HISTORY
// ====================================================================

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

describe('AddTimeline component', () => {
  test('AddTimeline (redux-form) renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <AddTimeline {...propsStub} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
