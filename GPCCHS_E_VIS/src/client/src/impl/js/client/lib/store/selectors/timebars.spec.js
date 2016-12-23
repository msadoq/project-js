/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import {
  getTimebar,
  getTimebarTimelines,
  getMasterTimeline,
  getMasterTimelineById,
} from './timebars';

describe('store:timebars:selectors', () => {
  it('getTimebar', () => {
    const { getState } = getStore({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    getTimebar(getState(), 'myTimebarId').should.have.property('id', 'Id');
    should.not.exist(getTimebar(getState(), 'unknownId'));
  });
  describe('getTimebarTimelines', () => {
    it('should return timelines', () => {
      getTimebarTimelines(
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
      getTimebarTimelines({}, {}, 'myId').should.eql([]);
      getTimebarTimelines({ myId: {} }, {}, 'myId').should.eql([]);
      getTimebarTimelines({ myId: { timelines: [] } }, {}, 'myId').should.eql([]);
      getTimebarTimelines({ myId: { timelines: ['myTimeline'] } }, {}, 'myId').should.eql([]);
      getTimebarTimelines({ myId: { timelines: ['myTimeline'] } }, {
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
        'myId'
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
        'myId',
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
        'myId',
      ));
    });
  });
  describe('getMasterTimeline', () => {
    it('should return master timeline', () => {
      getMasterTimeline(
        { myTimebar: { masterId: 'my timeline' } },
        { myTimeline: { id: 'my timeline' } },
        'myTimebar'
      ).should.eql({ id: 'my timeline' });
    });
    it('should return nothing', () => {
      should.not.exist(getMasterTimeline(
        { myTimebar: { masterId: '' } },
        { myTimeline: { id: 'my timeline' } },
        'myTimebar'
      ));
    });
  });
});
