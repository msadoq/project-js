import { should, getStore } from '../../common/test';
import {
  getTimebar,
  _getTimebarTimelines,
  _getMasterTimeline,
  getMasterTimelineById,
  getTimebarByPageId,
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
  it('getTimebarByPageId', () => {
    const state = {
      pages: {
        page1: {
          title: 'titre',
          timebarUuid: 'timebar1',
        },
      },
      timebars: {
        timebar1: {
          foo: 'bar',
        },
      },
    };
    getTimebarByPageId(state, { pageId: 'page1' }).should.eql({
      foo: 'bar',
    });
    should.not.exist(getTimebarByPageId(state, {}));
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
      { id: 'masterTimeline', timelineId: 'masterTimeline' },
      { id: 'tl2', timelineId: 'tl2' },
    ]);
    getTimebarTimelinesSelector(state, { timebarUuid: 'unknown' }).should.be.eql([]);
  });
  describe('_getTimebarTimelines', () => {
    it('should return timelines', () => {
      const state = {
        timebarTimelines: {
          myId: [
            'myTimeline', 'myOtherTimeline', 'invalidSessionId', 'invalidId', 'unknown',
          ],
          myOtherId: ['other'],
        },
        timelines: {
          myTimeline: { id: 'myTimelineId', sessionId: 1 },
          invalidSessionId: { id: 'myTimelineId', sessionId: 'string' },
          invalidId: { sessionId: 1 },
          other: { id: 'other', sessionId: 1 },
          myOtherTimeline: { id: 'myOtherTimelineId', sessionId: 2 },
        },
      };
      _getTimebarTimelines(state.timebarTimelines.myId, state.timelines).should.eql([
        { id: 'myTimelineId', sessionId: 1 },
        { id: 'myOtherTimelineId', sessionId: 2 },
      ]);
    });
    it('should not return timeline', () => {
      _getTimebarTimelines({}, {}, 'myId').should.eql([]);
      _getTimebarTimelines({ myId: [] }, {}, 'myId').should.eql([]);
      _getTimebarTimelines({ myId: ['myTimeline'] }, {}, 'myId').should.eql([]);
      _getTimebarTimelines({ myId: ['myTimeline'] }, {
        other: { id: 'myTimelineId', sessionId: 'mySession' },
      }, 'myId');
    });
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
          timelineId: 'timeline_01',
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
  describe('_getMasterTimeline', () => {
    it('should return master timeline', () => {
      _getMasterTimeline(
        { myTimebar: { masterId: 'my timeline' } },
        { myTimeline: { id: 'my timeline' } },
        'myTimebar'
      ).should.eql({ id: 'my timeline' });
    });
    it('should return nothing', () => {
      should.not.exist(_getMasterTimeline(
        { myTimebar: { masterId: '' } },
        { myTimeline: { id: 'my timeline' } },
        'myTimebar'
      ));
    });
  });
});
