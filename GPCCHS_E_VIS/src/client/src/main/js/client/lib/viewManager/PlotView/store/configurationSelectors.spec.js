/* eslint-disable no-unused-expressions */
import {
  getAxes,
  getShowYAxes,
  getGrids,
  getMarkers,
  getEntryPoints,
} from './configurationSelectors';

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
    PlotViewConfiguration: {
      v1: {
        entryPoints: [1, 2, 3],
        axes: true,
        showYAxes: true,
        grids: true,
        markers: true,
      },
    },
    views: {
      v1: {
        type: 'PlotView',
      },
    },
  };
  describe('getAxes', () => {
    test('returns undefined when page is unknown', () => {
      expect(getAxes(state, { viewId: 'unknownView' })).toBeFalsy();
    });
    test('returns view axes', () => {
      expect(getAxes(state, { viewId: 'v1' })).toBe(true);
    });
  });
  describe('getShowYAxes', () => {
    test('returns undefined when page is unknown', () => {
      expect(getShowYAxes(state, { viewId: 'unknownView' })).toBeFalsy();
    });
    test('returns view axes', () => {
      expect(getShowYAxes(state, { viewId: 'v1' })).toBe(true);
    });
  });
  describe('getGrids', () => {
    test('returns undefined when page is unknown', () => {
      expect(getGrids(state, { viewId: 'unknownView' })).toBeFalsy();
    });
    test('returns view axes', () => {
      expect(getGrids(state, { viewId: 'v1' })).toBe(true);
    });
  });
  describe('getMarkers', () => {
    test('returns undefined when page is unknown', () => {
      expect(getMarkers(state, { viewId: 'unknownView' })).toBeFalsy();
    });
    test('returns view axes', () => {
      expect(getMarkers(state, { viewId: 'v1' })).toBe(true);
    });
  });
  describe('getViewEntryPoints', () => {
    test('returns view entry points', () => {
      expect(getEntryPoints(state, { viewId: 'v1' })).toEqual([1, 2, 3]);
    });
    test('returns empty array when view is unknown', () => {
      expect(getEntryPoints(state, { viewId: 'unknownView' })).toEqual([]);
    });
  });
});
