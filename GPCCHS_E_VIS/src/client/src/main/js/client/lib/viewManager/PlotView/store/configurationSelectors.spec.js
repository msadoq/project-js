/* eslint-disable no-unused-expressions */
import { should } from '../../../common/test';
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
    views: {
      v1: {
        configuration: {
          entryPoints: [1, 2, 3],
          axes: true,
          showYAxes: true,
          grids: true,
          markers: true,
        },
      },
    },
  };
  describe('getAxes', () => {
    it('returns undefined when page is unknown', () => {
      should.not.exist(getAxes(state, { viewId: 'unknownView' }));
    });
    it('returns view axes', () => {
      getAxes(state, { viewId: 'v1' }).should.be.true;
    });
  });
  describe('getShowYAxes', () => {
    it('returns undefined when page is unknown', () => {
      should.not.exist(getShowYAxes(state, { viewId: 'unknownView' }));
    });
    it('returns view axes', () => {
      getShowYAxes(state, { viewId: 'v1' }).should.be.true;
    });
  });
  describe('getGrids', () => {
    it('returns undefined when page is unknown', () => {
      should.not.exist(getGrids(state, { viewId: 'unknownView' }));
    });
    it('returns view axes', () => {
      getGrids(state, { viewId: 'v1' }).should.be.true;
    });
  });
  describe('getMarkers', () => {
    it('returns undefined when page is unknown', () => {
      should.not.exist(getMarkers(state, { viewId: 'unknownView' }));
    });
    it('returns view axes', () => {
      getMarkers(state, { viewId: 'v1' }).should.be.true;
    });
  });
  describe('getViewEntryPoints', () => {
    it('returns view entry points', () => {
      getEntryPoints(state, { viewId: 'v1' }).should.be.eql([1, 2, 3]);
    });
    it('returns empty array when view is unknown', () => {
      getEntryPoints(state, { viewId: 'unknownView' }).should.be.eql([]);
    });
  });
});
