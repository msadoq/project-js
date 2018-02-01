// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix Timebar jest snapshots .
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix last two tests AddTimeline EditTimeline.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import EditTimeline from '../LeftTab/EditTimeline';

const store = createStore(
  (state = {}) => state,
  {}
);

const propsStub = {
  form: 'test-editTrack',
  onSubmit: () => null,
  sessions: [],
  timelines: [],
  masterId: 'masterId',
  id: 'timelineId',
  uuid: 'aaaa-aaaa',
  store,
  initialValues: {
    master: 'masterId',
    id: 'timelineId',
    color: '#11aa11',
    kind: 'session',
    sessionId: '10',
    uuid: 'timelineUuid',
    offset: 10,
  },
};

describe('EditTimeline component', () => {
  test('EditTimeline (redux-form) renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <EditTimeline {...propsStub} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
