// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Add getIsWorkspaceOpening selector in project
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove useless workspaceOpened in state.hsc
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : FA : #7081 : 27/06/2017 : Fix crash while closing application with document to save (a merge was probably deleted some code)
// END-HISTORY
// ====================================================================

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
