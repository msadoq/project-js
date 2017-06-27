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
