import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import EditTimeline from '../timeline/EditTimeline';

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
  timelineUuid: 'aaaa-aaaa',
  store,
  initialValues: {
    master: 'masterId',
    id: 'timelineId',
    color: '#11aa11',
    kind: 'session',
    sessionId: '10',
    timelineUuid: 'timelineUuid',
    offset: 10,
  },
};

test('EditTimeline (redux-form) renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <EditTimeline {...propsStub} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
