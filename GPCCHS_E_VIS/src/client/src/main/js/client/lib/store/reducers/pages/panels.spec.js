/* eslint no-unused-expressions: 0 */
import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/pages';
import panelsReducer from './panels';
import pagesReducer from '../pages';

const reducer = freezeArgs(pagesReducer);

describe('store:pages:reducer:panels', () => {
  test('should support unknown action', () => {
    const state = { editorWidth: 10 };
    expect(panelsReducer(state, {})).toBe(state);
  });
  test('should support empty state', () => {
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
  test('should load viewId in editor', () => {
    expect(
      reducer({ myId: { editorViewId: null } }, actions.loadInEditor('myId', 'myView'))
        .myId.panels.editorViewId
    ).toEqual('myView');
    expect(
      reducer({ myId: { editorViewId: 'myView' } }, actions.loadInEditor('myId', 'otherView'))
        .myId.panels.editorViewId
    ).toEqual('otherView');
  });
  test('should support resize editor', () => {
    expect(reducer({ myId: { editorWidth: null } }, actions.resizeEditor('myId', 20))
      .myId.panels.editorWidth).toEqual(20);
  });
  test('should support minimize editor', () => {
    expect(
      reducer({ myId: { editorIsMinimized: false } }, actions.minimizeEditor('myId', true))
        .myId.panels.editorIsMinimized
    ).toEqual(true);
  });
  test('should support resize timebar', () => {
    expect(
      reducer({ myId: { timebarHeight: null } }, actions.resizeTimebar('myId', 20))
        .myId.panels.timebarHeight
    ).toEqual(20);
  });
  test('should support minimize timebar', () => {
    expect(
      reducer({ myId: { timebarIsMinimized: false } }, actions.minimizeTimebar('myId', true))
        .myId.panels.timebarIsMinimized
    ).toEqual(true);
  });
  test('should focus tab in explorer', () => {
    expect(
      reducer({ myId: { explorerTab: null } }, actions.focusTabInExplorer('myId', 'myTab'))
        .myId.panels.explorerTab
    ).toEqual('myTab');
  });
  test('should support resize explorer', () => {
    expect(
      reducer({ myId: { explorerWidth: null } }, actions.resizeExplorer('myId', 20))
        .myId.panels.explorerWidth
    ).toEqual(20);
  });
  test('should support minimize explorer', () => {
    expect(
      reducer({ myId: { explorerIsMinimized: false } }, actions.minimizeExplorer('myId', true))
        .myId.panels.explorerIsMinimized
    ).toEqual(true);
  });
});
