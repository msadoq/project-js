/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../common/test';
import pagesReducer from './pages';
import * as types from '../types';

const reducer = freezeArgs(pagesReducer);

describe('store:page:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, {}).should.eql(state);
  });
  it('unknown action with pageId', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, { payload: { pageId: 'myPageId' } }).should.eql(state);
  });
  describe('HSC workspace', () => {
    it('close', () => {
      reducer({ myPage: { timebarHeight: 5 } }, { type: types.HSC_CLOSE_WORKSPACE })
      .should.be.an('object').that.is.empty;
    });
  });
});
