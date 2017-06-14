import { getTimebarTimelinesSelector } from './timebars';

describe('store:timebars:selectors', () => {
  test('getTimebarTimelinesSelector', () => {
    const state = {
      timebarTimelines: {
        tb1: ['tl2', 'masterTimeline'],
      },
      timebars: {
        tb1: {
          masterId: 'masterTimeline',
        },
      },
      timelines: {
        tl2: { id: 'tl2' },
        masterTimeline: { id: 'masterTimeline' },
      },
    };
    expect(getTimebarTimelinesSelector(state, { timebarUuid: 'tb1' })).toEqual([
      { id: 'masterTimeline' },
      { id: 'tl2' },
    ]);
    expect(getTimebarTimelinesSelector(state, { timebarUuid: 'unknown' })).toEqual([]);
  });
});
