/* eslint no-unused-expressions: 0 */
import _ from 'lodash/fp';
import { freezeArgs } from '../common/test';
import * as types from './types';
import createReducerByViews from './createReducerByViews';

describe('store:createReducerByViews', () => {
  const dummyState = { a: 1, b: 2, c: 3 };
  const viewReducer = _.always('__VIEW__');
  const reducer = freezeArgs(createReducerByViews(viewReducer));
  describe('with all view types', () => {
    it('should reset state when close workspace', () => {
      reducer(dummyState, { type: types.HSC_CLOSE_WORKSPACE }).should.be.eql({});
    });
    it('should remove related views when close a page', () => {
      reducer(dummyState, { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['a', 'b'] } })
        .should.be.eql({ c: 3 });
    });
    it('should create a new view', () => {
      const createAction = type => ({ type, payload: { view: { uuid: 'abcd' } } });
      reducer(dummyState, createAction(types.WS_VIEW_OPEN)).should.be.eql({ ...dummyState, abcd: '__VIEW__' });
      reducer(dummyState, createAction(types.WS_VIEW_ADD_BLANK)).should.be.eql({ ...dummyState, abcd: '__VIEW__' });
    });
    it('should remove related views when close a window', () => {
      reducer(dummyState, { type: types.WS_WINDOW_CLOSE, payload: { views: ['a', 'b'] } })
        .should.be.eql({ c: 3 });
    });
    it('should remove closed view', () => {
      reducer(dummyState, { type: types.WS_VIEW_CLOSE, payload: { viewId: 'a' } })
        .should.be.eql({ b: 2, c: 3 });
    });
    it('add several views', () => {
      const createAction = type => ({ type, payload: { views: [{ uuid: 'd' }, { uuid: 'e' }] } });
      reducer({}, createAction(types.WS_PAGE_OPEN)).should.be.eql({ d: '__VIEW__', e: '__VIEW__' });
      reducer({}, createAction(types.WS_WORKSPACE_OPEN)).should.be.eql({ d: '__VIEW__', e: '__VIEW__' });
    });
    it('should call given reducer when have a viewId in payload', () => {
      const newState = reducer(dummyState, { type: 'DUMMY_ACTION', payload: { viewId: 'a' } });
      newState.should.be.eql({ a: '__VIEW__', b: 2, c: 3 });
    });
  });
});
