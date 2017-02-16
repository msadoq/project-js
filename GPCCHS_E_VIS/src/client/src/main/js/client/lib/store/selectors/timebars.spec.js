/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import {
  getTimebar,
  _getTimebarTimelines,
  _getMasterTimeline,
  getMasterTimelineById,
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
  describe('getTimebarTimelines', () => {
    it('should return timelines', () => {
      _getTimebarTimelines(
        {
          myId: { timelines: [
            'myTimeline', 'myOtherTimeline', 'invalidSessionId', 'invalidId', 'unknown',
          ] },
          myOtherId: { timelines: ['other'] },
        },
        {
          myTimeline: { id: 'myTimelineId', sessionId: 1 },
          invalidSessionId: { id: 'myTimelineId', sessionId: 'string' },
          invalidId: { sessionId: 1 },
          other: { id: 'other', sessionId: 1 },
          myOtherTimeline: { id: 'myOtherTimelineId', sessionId: 2 },
        },
        'myId'
      ).should.eql([
        { id: 'myTimelineId', sessionId: 1 },
        { id: 'myOtherTimelineId', sessionId: 2 },
      ]);
    });
    it('should not return timeline', () => {
      _getTimebarTimelines({}, {}, 'myId').should.eql([]);
      _getTimebarTimelines({ myId: {} }, {}, 'myId').should.eql([]);
      _getTimebarTimelines({ myId: { timelines: [] } }, {}, 'myId').should.eql([]);
      _getTimebarTimelines({ myId: { timelines: ['myTimeline'] } }, {}, 'myId').should.eql([]);
      _getTimebarTimelines({ myId: { timelines: ['myTimeline'] } }, {
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
              timelines: ['timeline_01', 'timeline_02'],
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
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
              timelines: ['timeline_01', 'timeline_02'],
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
        },
        { timebarUuid: 'myId' }
      ));
    });
    it('no master timeline', () => {
      should.not.exist(getMasterTimelineById(
        {
          timebars: {
            myId: {
              timelines: ['timeline_01', 'timeline_02'],
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
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
