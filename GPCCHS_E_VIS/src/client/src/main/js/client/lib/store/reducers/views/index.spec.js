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
});
