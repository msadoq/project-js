import _set from 'lodash/fp/set';
import { getIsSaveNeeded } from './hsc';

describe('store:hsc:selectors', () => {
  describe('getIsSaveNeeded', () => {
    const windowId = 'myWindowId';
    const state = {
      windows: {
        [windowId]: { pages: ['myPageId'] },
      },
      pages: {
        myPageId: { views: ['myViewId'], isModified: false },
      },
      views: {
        myViewId: { isModified: false },
      },
    };

    test('should not crash if empty store or unknown element', () => {
      // invalid window
      expect(getIsSaveNeeded(state, {})).toBe(false);
      expect(getIsSaveNeeded(state, { windowId: 'otherWindow' })).toBe(false);

      // invalid pages
      expect(getIsSaveNeeded(_set('windows.pages', undefined, state), { windowId }))
        .toBe(false);
      expect(getIsSaveNeeded(_set('windows.pages', [], state), { windowId }))
        .toBe(false);
      expect(getIsSaveNeeded(_set('windows.pages', ['other'], state), { windowId }))
        .toBe(false);

      // invalid views
      expect(getIsSaveNeeded(_set('pages.views', undefined, state), { windowId }))
        .toBe(false);
      expect(getIsSaveNeeded(_set('pages.views', [], state), { windowId }))
        .toBe(false);
      expect(getIsSaveNeeded(_set('pages.views', ['other'], state), { windowId }))
        .toBe(false);
    });
    test('should returns true if at least one page to save', () => {
      expect(getIsSaveNeeded(_set('pages.myPageId.isModified', true, state), { windowId }))
        .toBe(true);
    });
    test('should returns true if at least one view to save', () => {
      expect(getIsSaveNeeded(_set('views.myViewId.isModified', true, state), { windowId }))
        .toBe(true);
    });
    test('should returns false if nothing to save', () => {
      expect(getIsSaveNeeded(state, { windowId })).toBe(false);
    });
  });
});
