import {} from '../../../common/test';
import reducer, { getIsCodeEditorOpened } from '.';
import * as actions from '../../actions/editor';
import * as types from '../../types';

const state = {
  textViewId: 'test',
};

describe('store:editor:reducer', () => {
  // TODO abesson add test should preserve state if unknown action dispatched
  it('should returns initial state', () => {
    const newState = reducer(undefined, {});
    newState.should.have.a.property('textViewId', null);
  });
  it('should update viewId', () => {
    reducer(undefined, actions._openHtmlEditor('test'))
    .textViewId.should.equal('test');
  });
  it('should reset viewId when close editor', () => {
    const newState = reducer(undefined, actions.closeHtmlEditor());
    newState.should.have.a.property('textViewId', null);
  });
  it('should reset viewId when delete associate view', () => {
    const newState = reducer(state, {
      type: types.WS_VIEW_CLOSE,
      payload: { viewId: 'test' },
    });
    newState.should.have.a.property('textViewId', null);
  });
  it('should does nothing', () => {
    const newState = reducer(state, {
      type: types.WS_VIEW_CLOSE,
      payload: { viewId: 'test2' },
    });
    newState.should.have.a.property('textViewId', 'test');
  });
});

describe('store:editor:selector', () => {
  it('should return false', () => {
    const state = { editor: { textViewId: null }};
    getIsCodeEditorOpened(state).should.eql(false);
  });
  it('should return false', () => {
    const state = {};
    getIsCodeEditorOpened(state).should.eql(false);
  });
  it('should return true', () => {
    const state = { editor: { textViewId: 'idView' }};
    getIsCodeEditorOpened(state).should.eql(true);
  });
})
