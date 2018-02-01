// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels configuration storage in page
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Refacto some selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPageLayout simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPanels selectors in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getModifiedPagesIds simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getEditor simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Replace selectors/pages/makeGetLayout by getPageLayoutWithCollapsed .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Move getPageModifiedViewsIds from selectors/pages to menuManager
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Test check editor is closed in smart play action creator
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix bug about playing timebar due to isAnyEditorOpened selector
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when opened in inspector
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

import {
  getPageViews,
  isAnyEditorOpened,
  isAnyInspectorOpened,
} from './pages';

describe('store:page:selectors', () => {
  test('getPageViews', () => {
    const state = {
      pages: {
        myPageId: {
          views: ['view1'],
        },
      },
      views: {
        views1: {},
        views2: {},
      },
    };

    expect(getPageViews(state, { pageId: 'myPageId' })).toEqual([
      { viewId: 'view1' },
    ]);
  });
  test('notice if any view is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            editorIsMinimized: false,
            editorWidth: 250,
          },
        },
        page2: {
          panels: {
            editorIsMinimized: true,
            editorWidth: 250,
          },
        },
      },
    };
    expect(isAnyEditorOpened(state)).toEqual(true);
  });
  test('notice if any view is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            editorWidth: 250,
            editorIsMinimized: true,
          },
        },
      },
    };
    expect(isAnyEditorOpened(state)).toEqual(false);
  });
  test('notice if any inspector is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            explorerIsMinimized: false,
            explorerTab: 'inspector',
          },
        },
      },
    };
    expect(isAnyInspectorOpened(state)).toEqual(true);
  });
  test('notice if no inspector is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            explorerIsMinimized: true,
            explorerTab: 'inspector',
          },
        },
      },
    };
    expect(isAnyInspectorOpened(state)).toEqual(false);
  });
});
