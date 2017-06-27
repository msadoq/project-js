import { getPageTimelines, getFocusedPageTimelines, getMasterTimelineById } from './timelines';

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
    test('returns page timelines', () => {
      expect(getPageTimelines(state, { pageId: 'p1' })).toEqual([2, 1]);
    });
    test('returns nothing when pageId is unknown', () => {
      expect(getPageTimelines(state, { pageId: 'unknownPageId' })).toEqual([]);
    });
  });
  describe('getFocusedPageTimelines', () => {
    test('returns focused page timelines', () => {
      expect(getFocusedPageTimelines(state, { windowId: 'w1' })).toEqual([2, 1]);
    });
    test('returns nothing when windowId is unknown', () => {
      expect(getFocusedPageTimelines(state, { windowId: 'unknownWindowId' })).toEqual([]);
    });
  });
  describe('getMasterTimelineById', () => {
    test('should return master timeline', () => {
      expect(getMasterTimelineById(
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
      )).toEqual({
        id: 'timeline01',
      });
    });
    test('should not find master timeline', () => {
      expect(getMasterTimelineById(
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
      )).toBeFalsy();
    });
    test('no master timeline', () => {
      expect(getMasterTimelineById(
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
      )).toBeFalsy();
    });
  });
});
