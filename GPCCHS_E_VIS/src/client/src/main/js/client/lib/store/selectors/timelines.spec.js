/* eslint-disable no-unused-expressions */
import {} from '../../common/test';
import { getPageTimelines, getFocusedPageTimelines } from './timelines';

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
  describe('getPageTimelines', () => {
    it('returns page timelines', () => {
      expect(getPageTimelines(state, { pageId: 'p1' })).toEqual([2, 1]);
    });
    it('returns nothing when pageId is unknown', () => {
      expect(getPageTimelines(state, { pageId: 'unknownPageId' })).toEqual([]);
    });
  });
  describe('getFocusedPageTimelines', () => {
    it('returns focused page timelines', () => {
      expect(getFocusedPageTimelines(state, { windowId: 'w1' })).toEqual([2, 1]);
    });
    it('returns nothing when windowId is unknown', () => {
      expect(getFocusedPageTimelines(state, { windowId: 'unknownWindowId' })).toEqual([]);
    });
  });
});
