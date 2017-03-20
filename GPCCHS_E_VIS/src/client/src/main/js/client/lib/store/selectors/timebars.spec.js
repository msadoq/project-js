import { should, getStore } from '../../common/test';
import {
  getTimebar,
  getMasterTimelineById,
  getTimebarMasterId,
  getTimebarTimelinesSelector,
} from './timebars';

describe('store:timebars:selectors', () => {
  it('getTimebar', () => {
    const { getState } = getStore({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    getTimebar(getState(), { timebarUuid: 'myTimebarId' }).should.have.property('id', 'Id');
    should.not.exist(getTimebar(getState(), { timebarUuid: 'unknownId' }));
  });
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
      { id: 'masterTimeline', timelineUuid: 'masterTimeline' },
      { id: 'tl2', timelineUuid: 'tl2' },
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
          timelineUuid: 'timeline_01',
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
