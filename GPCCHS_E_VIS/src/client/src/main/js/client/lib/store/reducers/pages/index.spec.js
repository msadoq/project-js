import { freezeArgs } from '../../../common/test';
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
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('unknown action', () => {
    const state = { myPageId: { title: 'Title' } };
    expect(reducer(state, {})).toEqual(state);
  });
  it('unknown action with pageId', () => {
    const state = { myPageId: { title: 'Title' } };
    expect(reducer(state, { payload: { pageId: 'myPageId' } })).toEqual(state);
  });
  describe('HSC workspace', () => {
    it('close', () => {
      expect(
        reducer({ myPage: { timebarHeight: 5 } }, { type: types.HSC_CLOSE_WORKSPACE })
      ).toEqual({});
    });
  });
  describe('Update view path', () => {
    it('set modified page', () => {
      const state = {
        page1: { views: ['view1', 'view2'] },
        page2: { views: ['view3', 'view4'] },
      };
      const newState = reducer(state, { type: types.WS_VIEW_UPDATE_ABSOLUTEPATH, payload: { viewId: 'view3' } });
      expect(newState.page2).toHaveProperty('isModified');
      expect(newState.page1).not.toHaveProperty('isModified');
    });
    it('does not set modified page', () => {
      const state = {
        page1: { views: ['view1', 'view2'] },
        page2: { views: ['view3', 'view4'] },
      };
      const newState = reducer(state, { type: types.WS_VIEW_UPDATE_ABSOLUTEPATH, payload: { viewId: 'view5' } });
      expect(newState.page2).not.toHaveProperty('isModified');
      expect(newState.page1).not.toHaveProperty('isModified');
    });
  });
  it('remove pages when close window', () => {
    const state = {
      p1: {},
      p2: {},
      p3: {},
    };
    const newState = reducer(state, { type: types.WS_WINDOW_CLOSE, payload: { pages: ['p1', 'p2'] } });
    expect(newState).toEqual({ p3: {} });
  });
  it('should update sessionName', () => {
    const newState = reducer({ p1: {} }, actions.updateSessionName('p1', 'mySession'));
    expect(newState.p1).toEqual({ sessionName: 'mySession', isModified: true });
    expect(reducer(newState, actions.updateSessionName('p1', null))).toEqual({ p1: { isModified: true } });
  });
  it('should update domainName', () => {
    const newState = reducer({ p1: {} }, actions.updateDomainName('p1', 'myDomain'));
    expect(newState.p1).toEqual({ domainName: 'myDomain', isModified: true });
    expect(reducer(newState, actions.updateDomainName('p1', null))).toEqual({ p1: { isModified: true } });
  });
});

/* --- Selectors ------------------------------------------------------------ */

describe('store:page:selectors', () => {
  describe('getPage', () => {
    it('should returns page', () => {
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
    it('should returns pages', () => {
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
    it('should returns panels', () => {
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
    it('should returns current page layout', () => {
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
    it('should returns current page layout', () => {
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
    it('should returns current page absolutePath', () => {
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
    it('should returns current page isModified', () => {
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
    it('should returns all modified pages ids', () => {
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
    it('should returns pageId', () => {
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
    it('should return domainName', () => {
      const state = { pages: { p1: { domainName: 'myDomain' } } };
      expect(getPageDomainName(state, { pageId: 'p1' })).toEqual('myDomain');
    });
    it('should support empty state', () => {
      expect(getPageDomainName({ pages: { p1: {} } }, { pageId: 'p1' })).toBeFalsy();
    });
  });
  describe('getSessionName', () => {
    it('should return sessionName', () => {
      const state = { pages: { p1: { sessionName: 'mySession' } } };
      expect(getPageSessionName(state, { pageId: 'p1' })).toEqual('mySession');
    });
    it('should support empty state', () => {
      expect(getPageSessionName({ pages: { p1: {} } }, { pageId: 'p1' })).toBeFalsy();
    });
  });
});
