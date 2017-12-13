// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to reducers/views
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add configuration selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Create getViewAbsolutePath and getViewType simple selectors
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Migrate merged new tests in jest
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: "off" */
import * as types from 'store/types';
import { freezeArgs, freezeMe } from 'common/jest';
import viewsReducer, {
  getView,
  getViews,
  getModifiedViewsIds,
  getViewAbsolutePath,
  getViewType,
  getViewTitle,
  getViewTitleStyle,
  getViewDomainName,
  getViewSessionName,
  areLinksShown,
  getViewIsSaved,
} from '.';

const reducer = freezeArgs(viewsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:views:reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('unknown action', () => {
    expect(reducer({ myViewId: { title: 'Title' } }, {})).toEqual({ myViewId: { title: 'Title' } });
  });
  test('HSC workspace', () => {
    test('close', () => {
      const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      expect(typeof newState).toHaveLength(0);
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:views:selectors', () => {
  test('getView', () => {
    const state = freezeMe({
      views: {
        myViewId: { title: 'Title 1' },
      },
    });
    expect(getView(state, { viewId: 'myViewId' })).toHaveProperty('title', 'Title 1');
    expect(getView(state, { viewId: 'unknownId' })).toBeFalsy();
  });
  test('getViews', () => {
    const state = freezeMe({
      views: {
        myId: { title: 'Title' },
        myOtherId: { title: 'Title other' },
      },
    });
    expect(getViews(state)).toBe(state.views);
  });
  test('getModifiedViewsIds', () => {
    const state = freezeMe({
      views: {
        view1: { isModified: true },
        view2: { isModified: false },
        view3: { isModified: true },
      },
    });
    expect(getModifiedViewsIds(state)).toEqual(['view1', 'view3']);
  });
  test('getViewAbsolutePath', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          absolutePath: true,
        },
      },
    });
    expect(getViewAbsolutePath(state, { viewId: 'myViewId' })).toBe(true);
  });
  test('getViewType', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          type: 'PlotView',
        },
      },
    });
    expect(getViewType(state, { viewId: 'myViewId' })).toEqual('PlotView');
  });
  test('getViewTitle', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          title: 'TITLE',
        },
      },
    });
    expect(getViewTitle(state, { viewId: 'myViewId' })).toEqual('TITLE');
  });
  test('getViewTitleStyle', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          titleStyle: 'TITLE_STYLE',
        },
      },
    });
    expect(getViewTitleStyle(state, { viewId: 'myViewId' })).toEqual('TITLE_STYLE');
  });
  test('areLinksShown', () => {
    const state = {
      views: {
        myViewId: { showLinks: true },
      },
    };
    expect(areLinksShown(state, { viewId: 'myViewId' })).toBe(true);
  });
  describe('getDomainName', () => {
    test('should return domainName', () => {
      const state = freezeMe({ views: { v1: { domainName: 'myDomain' } } });
      expect(getViewDomainName(state, { viewId: 'v1' })).toEqual('myDomain');
    });
    test('should support empty state', () => {
      const state = freezeMe({ views: { v1: {} } });
      expect(getViewDomainName(state, { viewId: 'v1' })).toBeFalsy();
    });
  });
  describe('getSessionName', () => {
    test('should return sessionName', () => {
      const state = freezeMe({ views: { v1: { sessionName: 'mySession' } } });
      expect(getViewSessionName(state, { viewId: 'v1' })).toEqual('mySession');
    });
    test('should support empty state', () => {
      const state = freezeMe({ views: { v1: {} } });
      expect(getViewSessionName(state, { viewId: 'v1' })).toBeFalsy();
    });
  });
  describe('getViewIsSaved', () => {
    test('saved with oId', () => {
      const state = freezeMe({ views: { v1: { oId: 'abcdef' } } });
      expect(getViewIsSaved(state, { viewId: 'v1' })).toBeTruthy();
    });
    test('saved with absolutePath', () => {
      const state = freezeMe({ views: { v1: { absolutePath: '/a/b/c' } } });
      expect(getViewIsSaved(state, { viewId: 'v1' })).toBeTruthy();
    });
    test('not saved', () => {
      const state = freezeMe({ views: { v1: { } } });
      expect(getViewIsSaved(state, { viewId: 'v1' })).toBeFalsy();
    });
  });
});
