/* eslint-disable no-unused-expressions */
import { should } from '../../../common/test';
import { getAxes, getShowYAxes } from './configurationSelectors';

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
});
