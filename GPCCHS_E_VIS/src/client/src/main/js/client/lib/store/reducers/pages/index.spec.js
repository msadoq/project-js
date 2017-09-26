// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPageLayout simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPanels selectors in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getModifiedPagesIds simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getEditor simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Test set page modified if save as its views
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix broken test in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : SaveAs at a different path should set workspace isModified
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Add a test in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add getPageIsModified selectors . .
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rename test . . .
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Create getPageAbsolutePath selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeArgs } from '../../../common/jest';
import * as types from '../../types';
import * as actions from '../../actions/pages';
import pagesReducer, {
  getPages,
  getPage,
  getPanels,
  getPageLayout,
  getEditor,
  getModifiedPagesIds,
  getPageIdByViewId,
  getPageAbsolutePath,
  getPageIsModified,
  getPageDomainName,
  getPageSessionName,
} from '.';

/* --- Reducer -------------------------------------------------------------- */

const reducer = freezeArgs(pagesReducer);

describe('store:pages:reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('unknown action', () => {
    const state = { myPageId: { title: 'Title' } };
    expect(reducer(state, {})).toEqual(state);
  });
  test('unknown action with pageId', () => {
    const state = { myPageId: { title: 'Title' } };
    expect(reducer(state, { payload: { pageId: 'myPageId' } })).toEqual(state);
  });
  describe('HSC workspace', () => {
    test('close', () => {
      expect(
        reducer({ myPage: { timebarHeight: 5 } }, { type: types.HSC_CLOSE_WORKSPACE })
      ).toEqual({});
    });
  });
  describe('Update view path', () => {
    test('set modified page', () => {
      const state = {
        page1: { views: ['view1', 'view2'] },
        page2: { views: ['view3', 'view4'] },
      };
      const newState = reducer(state, { type: types.WS_VIEW_UPDATE_ABSOLUTEPATH, payload: { viewId: 'view3' } });
      expect(newState.page2).toHaveProperty('isModified');
      expect(newState.page1).not.toHaveProperty('isModified');
    });
    test('does not set modified page', () => {
      const state = {
        page1: { views: ['view1', 'view2'] },
        page2: { views: ['view3', 'view4'] },
      };
      const newState = reducer(state, { type: types.WS_VIEW_UPDATE_ABSOLUTEPATH, payload: { viewId: 'view5' } });
      expect(newState.page2).not.toHaveProperty('isModified');
      expect(newState.page1).not.toHaveProperty('isModified');
    });
  });
  test('remove pages when close window', () => {
    const state = {
      p1: {},
      p2: {},
      p3: {},
    };
    const newState = reducer(state, { type: types.WS_WINDOW_CLOSE, payload: { pages: ['p1', 'p2'] } });
    expect(newState).toEqual({ p3: {} });
  });
  test('should update sessionName', () => {
    const newState = reducer({ p1: {} }, actions.updateSessionName('p1', 'mySession'));
    expect(newState.p1).toEqual({ sessionName: 'mySession', isModified: true });
    expect(reducer(newState, actions.updateSessionName('p1', null))).toEqual({ p1: { isModified: true } });
  });
  test('should update domainName', () => {
    const newState = reducer({ p1: {} }, actions.updateDomainName('p1', 'myDomain'));
    expect(newState.p1).toEqual({ domainName: 'myDomain', isModified: true });
    expect(reducer(newState, actions.updateDomainName('p1', null))).toEqual({ p1: { isModified: true } });
  });
});

/* --- Selectors ------------------------------------------------------------ */

describe('store:page:selectors', () => {
  describe('getPage', () => {
    test('should returns page', () => {
      const state = {
        pages: {
          myPageId: { title: 'Title 1' },
        },
      };
      expect(getPage(state, { pageId: 'myPageId' })).toHaveProperty('title', 'Title 1');
      expect(getPage(state, 'unknownId')).toBeFalsy();
    });
  });
  describe('getPages', () => {
    test('should returns pages', () => {
      const state = {
        pages: {
          myId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };

      expect(getPages(state)).toBe(state.pages);
    });
  });
  describe('getPanels', () => {
    test('should returns panels', () => {
      const state = {
        pages: {
          myId: { title: 'Title', panels: { editorWidth: 0 } },
          myOtherId: { title: 'Title other', panels: undefined },
        },
      };
      expect(getPanels(state, { pageId: 'myId' })).toBe(state.pages.myId.panels);
      expect(getPanels(state, { pageId: 'myOtherId' })).toEqual({});
    });
  });
  describe('getPageLayout', () => {
    test('should returns current page layout', () => {
      const state = {
        pages: {
          myPageId: {
            layout: [],
          },
        },
      };
      expect(getPageLayout(state, { pageId: 'myPageId' })).toBeAnArray();
    });
  });
  describe('getEditor', () => {
    test('should returns current page layout', () => {
      const state = {
        pages: {
          myPageId: {
            editor: {},
          },
        },
      };
      expect(typeof getEditor(state, { pageId: 'myPageId' })).toBe('object');
    });
  });
  describe('getPageAbsolutePath', () => {
    test('should returns current page absolutePath', () => {
      const state = {
        pages: {
          myPageId: {
            absolutePath: true,
          },
        },
      };
      expect(getPageAbsolutePath(state, { pageId: 'myPageId' })).toBe(true);
    });
  });
  describe('getPageIsModified', () => {
    test('should returns current page isModified', () => {
      const state = {
        pages: {
          myPageId: {
            isModified: true,
          },
        },
      };
      expect(getPageIsModified(state, { pageId: 'myPageId' })).toBe(true);
    });
  });
  describe('getModifiedPagesIds', () => {
    test('should returns all modified pages ids', () => {
      const state = {
        pages: {
          myPageId1: { uuid: 'myPageId1', isModified: true },
          myPageId2: { uuid: 'myPageId2', isModified: false },
          myPageId3: { uuid: 'myPageId3', isModified: true },
        },
      };

      expect(getModifiedPagesIds(state)).toEqual([
        'myPageId1',
        'myPageId3',
      ]);
    });
  });
  describe('getPageIdByViewId', () => {
    test('should returns pageId', () => {
      const state = {
        pages: {
          myId: { uuid: 'myId', title: 'Title', views: ['view1', 'view2'] },
          myOtherId: { uuid: 'myOtherId', title: 'Title other', views: ['view3'] },
        },
      };
      expect(getPageIdByViewId(state, { viewId: 'view2' })).toBe('myId');
      expect(getPageIdByViewId(state, { viewId: 'view3' })).toBe('myOtherId');
    });
  });
  describe('getPageDomainName', () => {
    test('should return domainName', () => {
      const state = { pages: { p1: { domainName: 'myDomain' } } };
      expect(getPageDomainName(state, { pageId: 'p1' })).toEqual('myDomain');
    });
    test('should support empty state', () => {
      expect(getPageDomainName({ pages: { p1: {} } }, { pageId: 'p1' })).toBeFalsy();
    });
  });
  describe('getSessionName', () => {
    test('should return sessionName', () => {
      const state = { pages: { p1: { sessionName: 'mySession' } } };
      expect(getPageSessionName(state, { pageId: 'p1' })).toEqual('mySession');
    });
    test('should support empty state', () => {
      expect(getPageSessionName({ pages: { p1: {} } }, { pageId: 'p1' })).toBeFalsy();
    });
  });
});
