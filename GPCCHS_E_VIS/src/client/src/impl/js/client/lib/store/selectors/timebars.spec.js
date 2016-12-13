/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { should, getStore } from '../../common/test';
import {
  getTimebar,
  getTimebarTimelines,
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
    it('should return master timeline', () => {
      getMasterTimelineById(
        {
          myId: { masterId: 'timeline01' },
        },
        {
          azeazerze: { id: 'timeline01' },
          vqhrzefds: { id: 'timeline02' },
          ghsdrtrrr: { id: 'timeline03' },
        },
        'myId'
      ).should.eql(
        { id: 'timeline01' }
      );
    });
    it('should not find master timeline', () => {
      expect(getMasterTimelineById(
        {
          myId: { masterId: 'timeline04' },
        },
        {
          azeazerze: { id: 'timeline01' },
          vqhrzefds: { id: 'timeline02' },
          ghsdrtrrr: { id: 'timeline03' },
        },
        'myId'
      )).to.equal(undefined);
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
});
