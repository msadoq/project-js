// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels configuration storage in page
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Remove old explorer keys from store
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Fixed test : timebar collapsed panel property.
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/jest';
import * as actions from '../../actions/pages';
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
