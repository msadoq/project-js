/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import { getTimebar, getTimelines } from './timebars';


describe('selectors', () => {
  it('getTimebar', () => {
    const { getState } = getStore({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    getTimebar(getState(), 'myTimebarId').should.have.property('id', 'Id');
    should.not.exist(getTimebar(getState(), 'unknownId'));
  });
  it('getTimelines', () => {
    const { getState } = getStore({
      timebars: {
        myTimebarId: {
          id: 'Id',
          visuWindow: { lower: 10 },
          slideWindow: { lower: 20 },
          rulerResolution: 100,
          speed: 10,
          playingState: 'play',
          masterId: 'OtherId',
          timelines: ['myTimelineId1', 'myTimelineId3'],
        },
      },
      timelines: {
        myTimelineId1: { a: 1 },
        myTimelineId2: { a: 2 },
        myTimelineId3: { a: 3 },
      } });
    const tls = getTimelines(getState(), 'myTimebarId');
    tls.should.be.an('array').with.length(2);
    tls[0].a.should.equal(1);
    tls[1].a.should.equal(3);
    getTimelines(getState(), 'wrongId').should.have.length(0);
  });
});
