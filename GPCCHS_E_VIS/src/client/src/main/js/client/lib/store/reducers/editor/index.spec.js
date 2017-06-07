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
    expect(newState).toHaveProperty('textViewId', null);
  });
  it('should update viewId', () => {
    expect(reducer(undefined, actions._openHtmlEditor('test'))
    .textViewId).toBe('test');
  });
  it('should reset viewId when close editor', () => {
    const newState = reducer(undefined, actions.closeHtmlEditor());
    expect(newState).toHaveProperty('textViewId', null);
  });
  it('should reset viewId when delete associate view', () => {
    const newState = reducer(state, {
      type: types.WS_VIEW_CLOSE,
      payload: { viewId: 'test' },
    });
    expect(newState).toHaveProperty('textViewId', null);
  });
  it('should does nothing', () => {
    const newState = reducer(state, {
      type: types.WS_VIEW_CLOSE,
      payload: { viewId: 'test2' },
    });
    expect(newState).toHaveProperty('textViewId', 'test');
  });
});

describe('store:editor:selector', () => {
  it('should return false', () => {
    expect(getIsCodeEditorOpened({ editor: { textViewId: null } })).toEqual(false);
  });
  it('should return false', () => {
    expect(getIsCodeEditorOpened({})).toEqual(false);
  });
  it('should return true', () => {
    expect(getIsCodeEditorOpened({ editor: { textViewId: 'idView' } })).toEqual(true);
  });
});
