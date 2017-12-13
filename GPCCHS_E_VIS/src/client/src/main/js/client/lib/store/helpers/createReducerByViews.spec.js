/* eslint no-unused-expressions: 0 */
import _ from 'lodash/fp';
import { freezeArgs } from 'common/jest';
import * as types from '../types';
import createReducerByViews from './createReducerByViews';

describe('store:createReducerByViews', () => {
  const dummyState = { a: 1, b: 2, c: 3 };
  const viewReducer = _.always('__VIEW__');
  const reducer = freezeArgs(createReducerByViews(viewReducer));
  describe('with all view types', () => {
    test('should reset state when close workspace', () => {
      expect(reducer(dummyState, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
    });
    test('should remove related views when close a page', () => {
      expect(
        reducer(dummyState, { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['a', 'b'] } })
      ).toEqual({ c: 3 });
    });
    test('should create a new view', () => {
      const createAction = type => ({ type, payload: { view: { uuid: 'abcd' } } });
      expect(reducer(dummyState, createAction(types.WS_VIEW_OPENED))).toEqual({ ...dummyState, abcd: '__VIEW__' });
      expect(reducer(dummyState, createAction(types.WS_VIEW_ADD_BLANK))).toEqual({ ...dummyState, abcd: '__VIEW__' });
    });
    test('should remove related views when close a window', () => {
      expect(
        reducer(dummyState, { type: types.WS_WINDOW_CLOSE, payload: { views: ['a', 'b'] } })
      ).toEqual({ c: 3 });
    });
    test('should remove closed view', () => {
      expect(
        reducer(dummyState, { type: types.WS_VIEW_CLOSE, payload: { viewId: 'a' } })
      ).toEqual({ b: 2, c: 3 });
    });
    test('add several views', () => {
      const createAction = type => ({ type, payload: { views: [{ uuid: 'd' }, { uuid: 'e' }] } });
      expect(reducer({}, createAction(types.WS_PAGE_OPENED))).toEqual({ d: '__VIEW__', e: '__VIEW__' });
      expect(reducer({}, createAction(types.WS_WORKSPACE_OPENED))).toEqual({ d: '__VIEW__', e: '__VIEW__' });
    });
    test('should call given reducer when have a viewId in payload', () => {
      const newState = reducer(dummyState, { type: 'DUMMY_ACTION', payload: { viewId: 'a' } });
      expect(newState).toEqual({ a: '__VIEW__', b: 2, c: 3 });
    });
  });
});
