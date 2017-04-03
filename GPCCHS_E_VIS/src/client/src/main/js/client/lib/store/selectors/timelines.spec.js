/* eslint-disable no-unused-expressions */
import {} from '../../common/test';
import { getFocusedPageTimelines } from './timelines';

describe('viewManager/PlotView/store/configurationSelectors', () => {
  const state = {
    windows: {
      w1: { focusedPage: 'p1' },
    },
    pages: {
      p1: {
        timebarUuid: '__tb1',
      },
    },
    timebarTimelines: {
      __tb1: ['__tl1', '__tl2'],
    },
    timelines: {
      __tl1: 1,
      __tl2: 2,
    },
    views: {
      v1: {
        configuration: {
          axes: true,
          showYAxes: true,
        },
      },
    },
  };
  describe('getFocusedPageTimelines', () => {
    it('returns focused page timelines', () => {
      getFocusedPageTimelines(state, { windowId: 'w1' }).should.be.eql([2, 1]);
    });
    it('returns nothing when windowId is unknown', () => {
      getFocusedPageTimelines(state, { windowId: 'unknownWindowId' }).should.be.eql([]);
    });
  });
});
