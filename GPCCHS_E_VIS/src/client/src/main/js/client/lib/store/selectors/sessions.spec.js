// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : add tests on sessions selectors
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Remove missing only in tests
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all selectors from selectors/sessions to reducers/sessions
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove Timebar/Controls/ControlsSelectors + tests .
// END-HISTORY
// ====================================================================

import {
  getCurrentSessionExists,
  getCurrentSessionId,
} from './sessions';

describe('windowProcess:Timebar:Controls:ControlsSelector', () => {
  describe('getCurrentSessionExists', () => {
    test('returns false', () => {
      expect(getCurrentSessionExists({}, {})).toBe(false);
    });
    test('returns true', () => {
      const state = {
        timebars: {
          myId: {
            masterId: 'timeline01',
          },
        },
        timelines: {
          timeline_01: { id: 'timeline01', sessionName: 'mySession' },
        },
        timebarTimelines: {
          myId: ['timeline_01'],
        },
        sessions: [
          { id: 1, name: 'mySession' },
        ],
      };
      expect(getCurrentSessionExists(state, { timebarUuid: 'myId' })).toBe(true);
    });
  });
  describe('getCurrentSessionId', () => {
    const state = {
      timebars: {
        myId: {
          masterId: 'timeline01',
        },
      },
      timelines: {
        timeline_01: { id: 'timeline01', sessionName: 'mySession' },
      },
      timebarTimelines: {
        myId: ['timeline_01'],
      },
      sessions: [
        { id: 1, name: 'mySession' },
      ],
    };
    test('returns 1', () => {
      expect(getCurrentSessionId(state, { timebarUuid: 'myId' })).toEqual(1);
    });
    test('returns null', () => {
      expect(getCurrentSessionId(state, { timebarUuid: 'toto' })).toBeFalsy();
    });
  });
});
