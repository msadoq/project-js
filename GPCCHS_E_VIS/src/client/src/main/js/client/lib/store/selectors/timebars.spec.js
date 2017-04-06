import {} from '../../common/test';
import { getTimebarTimelinesSelector } from './timebars';

describe('store:timebars:selectors', () => {
  it('getTimebarTimelinesSelector', () => {
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
    getTimebarTimelinesSelector(state, { timebarUuid: 'tb1' }).should.be.eql([
      { id: 'masterTimeline' },
      { id: 'tl2' },
    ]);
    getTimebarTimelinesSelector(state, { timebarUuid: 'unknown' }).should.be.eql([]);
  });
});
