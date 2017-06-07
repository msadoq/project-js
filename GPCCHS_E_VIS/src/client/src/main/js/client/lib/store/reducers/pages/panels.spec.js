/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/pages';
import panelsReducer from './panels';
import pagesReducer from '../pages';

const reducer = freezeArgs(pagesReducer);

describe('store:pages:reducer:panels', () => {
  it('should support unknown action', () => {
    const state = { editorWidth: 10 };
    expect(panelsReducer(state, {})).toBe(state);
  });
  it('should support empty state', () => {
    expect(panelsReducer(undefined, {})).toEqual({
      editorWidth: 250,
      editorViewId: undefined,
      editorIsMinimized: true,
      timebarHeight: 130,
      timebarIsMinimized: false,
      explorerWidth: 250,
      explorerTab: undefined,
      explorerIsMinimized: true,
    });
  });
  it('should load viewId in editor', () => {
    expect(
      reducer({ myId: { editorViewId: null } }, actions.loadInEditor('myId', 'myView'))
        .myId.panels.editorViewId
    ).toEqual('myView');
    expect(
      reducer({ myId: { editorViewId: 'myView' } }, actions.loadInEditor('myId', 'otherView'))
        .myId.panels.editorViewId
    ).toEqual('otherView');
  });
  it('should support resize editor', () => {
    expect(reducer({ myId: { editorWidth: null } }, actions.resizeEditor('myId', 20))
      .myId.panels.editorWidth).toEqual(20);
  });
  it('should support minimize editor', () => {
    expect(
      reducer({ myId: { editorIsMinimized: false } }, actions.minimizeEditor('myId', true))
        .myId.panels.editorIsMinimized
    ).toEqual(true);
  });
  it('should support resize timebar', () => {
    expect(
      reducer({ myId: { timebarHeight: null } }, actions.resizeTimebar('myId', 20))
        .myId.panels.timebarHeight
    ).toEqual(20);
  });
  it('should support minimize timebar', () => {
    expect(
      reducer({ myId: { timebarIsMinimized: false } }, actions.minimizeTimebar('myId', true))
        .myId.panels.timebarIsMinimized
    ).toEqual(true);
  });
  it('should focus tab in explorer', () => {
    expect(
      reducer({ myId: { explorerTab: null } }, actions.focusTabInExplorer('myId', 'myTab'))
        .myId.panels.explorerTab
    ).toEqual('myTab');
  });
  it('should support resize explorer', () => {
    expect(
      reducer({ myId: { explorerWidth: null } }, actions.resizeExplorer('myId', 20))
        .myId.panels.explorerWidth
    ).toEqual(20);
  });
  it('should support minimize explorer', () => {
    expect(
      reducer({ myId: { explorerIsMinimized: false } }, actions.minimizeExplorer('myId', true))
        .myId.panels.explorerIsMinimized
    ).toEqual(true);
  });
});
