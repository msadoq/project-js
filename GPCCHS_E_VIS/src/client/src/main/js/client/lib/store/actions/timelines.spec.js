// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Write timelines action creators tests
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId ->
//  timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js
//  in jest/index.js
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { mockStore } from 'common/jest';
import * as actions from './timelines';

describe('store:actions:timelines', () => {
  const store = mockStore();

  afterEach(() => {
    store.clearActions();
  });

  describe('createNewTimeline', () => {
    test('creates a new timeline', () => {
      store.dispatch(actions.createNewTimeline('timebarUuid', { sessionName: 'Master' }));
      expect(store.getActions()).toMatchObject([
        {
          type: 'WS_TIMELINE_CREATE_NEW',
          payload: {
            timebarUuid: 'timebarUuid',
            timeline: {
              sessionName: 'Master',
            },
          },
        },
      ]);
      const firstAction = store.getActions()[0];
      expect(firstAction.payload.timeline.uuid).toBeAnUuid();
    });
  });

  test('creates a new timeline with random uuid', () => {
    store.dispatch(actions.createNewTimeline('timebarUuid', { sessionName: 'Master' }));
    const timelineUuid = store.getActions()[0].payload.timeline.uuid;
    expect(timelineUuid).toBeAnUuid();
  });

  test('creates a new timeline with given uuid', () => {
    const givenUuid = 'myUUID';
    store.dispatch(actions.createNewTimeline('timebarUuid', { sessionName: 'Master', uuid: givenUuid }));
    const timelineUuid = store.getActions()[0].payload.timeline.uuid;
    expect(timelineUuid).toBe(givenUuid);
  });

  describe('update', () => {
    test('does nothing with empty configuration', () => {
      store.dispatch(actions.update('myTimelineUuid', undefined));
      expect(store.getActions()).toEqual([]);
    });
    test('updates sessionName', () => {
      store.dispatch(actions.update('myTimelineUuid', { sessionName: 'session1' }));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMELINE_UPDATE_SESSIONNAME',
          payload: { timelineUuid: 'myTimelineUuid', sessionName: 'session1' } },
      ]);
    });
    test('updates offset', () => {
      store.dispatch(actions.update('myTimelineUuid', { offset: true }));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMELINE_UPDATE_OFFSET',
          payload: { timelineUuid: 'myTimelineUuid', offset: true },
        },
      ]);
    });
    test('updates id', () => {
      store.dispatch(actions.update('myTimelineUuid', { id: true }));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMELINE_UPDATE_ID',
          payload: { timelineUuid: 'myTimelineUuid', id: true },
        },
      ]);
    });
    test('updates sessionName, offset and id', () => {
      store.dispatch(actions.update('myTimelineUuid', { sessionName: 'session1', offset: true, id: true }));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMELINE_UPDATE_SESSIONNAME',
          payload: { timelineUuid: 'myTimelineUuid', sessionName: 'session1' },
        },
        {
          type: 'WS_TIMELINE_UPDATE_OFFSET',
          payload: { timelineUuid: 'myTimelineUuid', offset: true },
        },
        {
          type: 'WS_TIMELINE_UPDATE_ID',
          payload: { timelineUuid: 'myTimelineUuid', id: true },
        },
      ]);
    });
  });
});
