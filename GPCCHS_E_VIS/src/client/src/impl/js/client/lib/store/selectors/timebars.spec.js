/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import { getTimebar, getTimebarTimelines, getPlayingTimebar } from './timebars';

describe('selectors/timebars', () => {
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
  // it('getTimelines', () => {
  //   const { getState } = getStore({
  //     timebars: {
  //       myTimebarId: {
  //         id: 'Id',
  //         visuWindow: { lower: 10 },
  //         slideWindow: { lower: 20 },
  //         rulerResolution: 100,
  //         speed: 10,
  //         playingState: 'play',
  //         masterId: 'OtherId',
  //         timelines: ['myTimelineId1', 'myTimelineId3'],
  //       },
  //     },
  //     timelines: {
  //       myTimelineId1: { a: 1 },
  //       myTimelineId2: { a: 2 },
  //       myTimelineId3: { a: 3 },
  //     } });
  //   const tls = getTimelines(getState(), 'myTimebarId');
  //   tls.should.be.an('array').with.length(2);
  //   tls[0].a.should.equal(1);
  //   tls[1].a.should.equal(3);
  //   getTimelines(getState(), 'wrongId').should.have.length(0);
  // });
  describe('getPlayingTimebar', () => {
    it('should return the playing timebar', () => {
      getPlayingTimebar({
        timebars: {
          tb1: { id: 'myId', playingState: 'pause' },
          tb3: { id: 'anotherId' },
          tb2: { id: 'myOtherId', playingState: 'play' },
        },
      }).should.eql({ id: 'myOtherId', playingState: 'play' });
    });
    it('should support empty state', () => {
      should.not.exist(getPlayingTimebar({}));
      should.not.exist(getPlayingTimebar({ timebars: {} }));
      should.not.exist(getPlayingTimebar({
        timebars: {
          tb1: { id: 'myId', playingState: 'pause' },
        },
      }));
    });
  });
});
