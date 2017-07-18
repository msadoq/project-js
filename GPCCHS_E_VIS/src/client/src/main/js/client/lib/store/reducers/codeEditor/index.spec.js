import reducer, { getIsCodeEditorOpened } from '.';
import * as actions from '../../actions/editor';
import * as types from '../../types';

const state = {
  viewId: 'test',
};

describe('store:editor:reducer', () => {
  // TODO abesson add test should preserve state if unknown action dispatched
  test('should returns initial state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toHaveProperty('viewId', null);
  });
  test('should update viewId', () => {
    expect(reducer(undefined, actions.openCodeEditor('test'))
    .viewId).toBe('test');
  });
  test('should reset viewId when close editor', () => {
    const newState = reducer(undefined, actions.closeCodeEditor());
    expect(newState).toHaveProperty('viewId', null);
  });
  test('should reset viewId when delete associate view', () => {
    const newState = reducer(state, {
      type: types.WS_VIEW_CLOSE,
      payload: { viewId: 'test' },
    });
    expect(newState).toHaveProperty('viewId', null);
  });
  test('should does nothing', () => {
    const newState = reducer(state, {
      type: types.WS_VIEW_CLOSE,
      payload: { viewId: 'test2' },
    });
    expect(newState).toHaveProperty('viewId', 'test');
  });
});

describe('store:editor:selector', () => {
  test('should return false', () => {
    expect(getIsCodeEditorOpened({ codeEditor: { viewId: null } })).toEqual(false);
  });
  test('should return false', () => {
    expect(getIsCodeEditorOpened({})).toEqual(false);
  });
  test('should return true', () => {
    expect(getIsCodeEditorOpened({ codeEditor: { viewId: 'idView' } })).toEqual(true);
  });
});
