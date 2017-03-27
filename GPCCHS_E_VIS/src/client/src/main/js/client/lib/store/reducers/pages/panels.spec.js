/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/pages';
import panelsReducer from './panels';
import pagesReducer from '../pages';

const reducer = freezeArgs(pagesReducer);

describe('store:pages:reducer:panels', () => {
  it('should support unknown action', () => {
    const state = { editorWidth: 10 };
    panelsReducer(state, {}).should.equal(state);
  });
  it('should support empty state', () => {
    panelsReducer(undefined, {}).should.eql({
      editorWidth: 0,
      editorViewId: undefined,
      timebarHeight: 130,
      explorerWidth: 0,
      explorerTab: undefined,
    });
  });
  it('should load viewId in editor', () => {
    reducer({ myId: { editorViewId: null } }, actions.loadInEditor('myId', 'myView'))
      .myId.panels.editorViewId.should.eql('myView');
    reducer({ myId: { editorViewId: 'myView' } }, actions.loadInEditor('myId', 'otherView'))
      .myId.panels.editorViewId.should.eql('otherView');
  });
  it('should support resize editor', () => {
    reducer({ myId: { editorWidth: null } }, actions.resizeEditor('myId', 20))
      .myId.panels.editorWidth.should.eql(20);
  });
  it('should support resize timebar', () => {
    reducer({ myId: { timebarHeight: null } }, actions.resizeTimebar('myId', 20))
      .myId.panels.timebarHeight.should.eql(20);
  });
  it('should focus tab in explorer', () => {
    reducer({ myId: { explorerTab: null } }, actions.focusTabInExplorer('myId', 'myTab'))
      .myId.panels.explorerTab.should.eql('myTab');
  });
  it('should support resize explorer', () => {
    reducer({ myId: { explorerWidth: null } }, actions.resizeExplorer('myId', 20))
      .myId.panels.explorerWidth.should.eql(20);
  });
});
