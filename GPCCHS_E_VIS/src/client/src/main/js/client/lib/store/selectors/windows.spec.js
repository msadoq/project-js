/* eslint no-unused-expressions: 0 */
import { expect } from '../../common/test';
import {
  getFocusedWindow,
  getWindowPages,
  getWindowFocusedPageSelector,
} from './windows';

describe('store:window:selectors', () => {
  const emptyState = {};
  describe('getFocusedWindow', () => {
    it('should return focused window', () => {
      const state = {
        hsc: {
          focusWindow: 'window1',
        },
        windows: {
          window1: { title: 'foo' },
          window2: { title: 'bar' },
        },
      };
      getFocusedWindow(state).should.eql({ title: 'foo' });
    });
    it('should return undefined with no focusWindow', () => {
      const state = {
        windows: {
          window1: { title: 'foo' },
          window2: { title: 'bar' },
        },
      };
      expect(getFocusedWindow(state)).to.be.undefined;
    });
    it('should return undefined with empty state', () => {
      expect(getFocusedWindow(emptyState)).to.be.undefined;
    });
  });

  it('getWindowPages', () => {
    const state = {
      windows: {
        myWindowId: {
          pages: ['page1', 'page2'],
        },
      },
      pages: {
        page1: {
          title: 'foo',
        },
        page2: {
          title: 'bar',
        },
      },
    };
    getWindowPages(state, { windowId: 'myWindowId' }).should.eql([
      { pageId: 'page1', title: 'foo' },
      { pageId: 'page2', title: 'bar' },
    ]);
    getWindowPages(state, { windowId: 'unknownWindow' }).should.be.eql([]);
  });

  it('getWindowFocusedPageSelector', () => {
    const state = {
      windows: {
        window1: {
          focusedPage: 'page1',
        },
      },
      pages: {
        page1: {
          title: 'foo',
        },
      },
    };
    getWindowFocusedPageSelector(state, { windowId: 'window1' }).should.eql({
      title: 'foo',
    });
  });
});
