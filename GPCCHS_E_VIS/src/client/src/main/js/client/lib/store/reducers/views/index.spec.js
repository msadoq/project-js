/* eslint no-unused-expressions: "off" */
import * as types from '../../types';
import viewsReducer, {
  getView,
  getViews,
  getModifiedViewsIds,
  getViewConfiguration,
  getViewAbsolutePath,
  getViewType,
  getViewTitle,
  getViewTitleStyle,
  getViewDomainName,
  getViewSessionName,
  areLinksShown,
} from '.';
import { freezeArgs, freezeMe } from '../../../common/test';

const reducer = freezeArgs(viewsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:views:reducer', () => {
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('unknown action', () => {
    expect(reducer({ myViewId: { title: 'Title' } }, {})).toEqual({ myViewId: { title: 'Title' } });
  });
  it('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      expect(typeof newState).toHaveLength(0);
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:views:selectors', () => {
  it('getView', () => {
    const state = freezeMe({
      views: {
        myViewId: { title: 'Title 1' },
      },
    });
    expect(getView(state, { viewId: 'myViewId' })).toHaveProperty('title', 'Title 1');
    expect(getView(state, { viewId: 'unknownId' })).toBeFalsy();
  });
  it('getViews', () => {
    const state = freezeMe({
      views: {
        myId: { title: 'Title' },
        myOtherId: { title: 'Title other' },
      },
    });
    expect(getViews(state)).toBe(state.views);
  });
  it('getModifiedViewsIds', () => {
    const state = freezeMe({
      views: {
        view1: { isModified: true },
        view2: { isModified: false },
        view3: { isModified: true },
      },
    });
    expect(getModifiedViewsIds(state)).toEqual(['view1', 'view3']);
  });
  it('getViewConfiguration', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
          },
        },
      },
    });
    expect(getViewConfiguration(state, { viewId: 'myViewId' })).toEqual({
      title: 'Title 1',
    });
  });
  it('getViewAbsolutePath', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          absolutePath: true,
        },
      },
    });
    expect(getViewAbsolutePath(state, { viewId: 'myViewId' })).toBe(true);
  });
  it('getViewType', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          type: 'PlotView',
        },
      },
    });
    expect(getViewType(state, { viewId: 'myViewId' })).toEqual('PlotView');
  });
  it('getViewTitle', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          title: 'TITLE',
        },
      },
    });
    expect(getViewTitle(state, { viewId: 'myViewId' })).toEqual('TITLE');
  });
  it('getViewTitleStyle', () => {
    const state = freezeMe({
      views: {
        myViewId: {
          titleStyle: 'TITLE_STYLE',
        },
      },
    });
    expect(getViewTitleStyle(state, { viewId: 'myViewId' })).toEqual('TITLE_STYLE');
  });
  it('areLinksShown', () => {
    const state = {
      views: {
        myViewId: { showLinks: true },
      },
    };
    areLinksShown(state, { viewId: 'myViewId' }).should.eql(true);
  });
  describe('getDomainName', () => {
    it('should return domainName', () => {
      const state = freezeMe({ views: { v1: { domainName: 'myDomain' } } });
      expect(getViewDomainName(state, { viewId: 'v1' })).toEqual('myDomain');
    });
    it('should support empty state', () => {
      const state = freezeMe({ views: { v1: {} } });
      expect(getViewDomainName(state, { viewId: 'v1' })).toBeFalsy();
    });
  });
  describe('getSessionName', () => {
    it('should return sessionName', () => {
      const state = freezeMe({ views: { v1: { sessionName: 'mySession' } } });
      expect(getViewSessionName(state, { viewId: 'v1' })).toEqual('mySession');
    });
    it('should support empty state', () => {
      const state = freezeMe({ views: { v1: {} } });
      expect(getViewSessionName(state, { viewId: 'v1' })).toBeFalsy();
    });
  });
});
