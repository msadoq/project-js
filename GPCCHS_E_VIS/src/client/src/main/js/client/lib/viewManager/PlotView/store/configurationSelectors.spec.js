// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add getEntryPoints selector in PlotView configuration selectors
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add selectors in configurationSelectors + tests
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Move getFocusedPageTimelines in global store/selectors .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

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
