import { should } from '../../common/test';
import {
  getMasterTimelineById,
  getTimebarMasterId,
  getTimebarTimelinesSelector,
} from './timebars';

describe('store:timebars:selectors', () => {
  it('getTimebarMasterId', () => {
    const state = {
      timebars: {
        tb1: {
          masterId: 'master id',
          foo: 'bar',
        },
      },
    };
    getTimebarMasterId(state, { timebarUuid: 'tb1' }).should.be.eql('master id');
  });
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
  describe('getMasterTimelineById', () => {
    it('should return master timeline', () => {
      getMasterTimelineById(
        {
          timebars: {
            myId: {
              masterId: 'timeline01',
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      ).should.eql(
        {
          id: 'timeline01',
        }
      );
    });
    it('should not find master timeline', () => {
      should.not.exist(getMasterTimelineById(
        {
          timebars: {
            myId: {
              masterId: 'timeline04',
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      ));
    });
    it('no master timeline', () => {
      should.not.exist(getMasterTimelineById(
        {
          timebars: {
            myId: { },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      ));
    });
  });
});
