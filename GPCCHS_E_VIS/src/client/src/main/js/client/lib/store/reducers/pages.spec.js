/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../common/test';
import * as actions from '../actions/pages';
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
  describe('add', () => {
    it('add', () => {
      const state = reducer(
        undefined,
        actions._add('myPageId', 'myTimebarId', 'Title', ['myViewId'], [
          { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
        ], '/path', '1234', '/absolutePath', true, [1, 2, 3, 4])
      );
      state.myPageId.should.deep.eql({
        title: 'Title',
        timebarHeight: 135,
        timebarUuid: 'myTimebarId',
        views: ['myViewId'],
        layout: [
          { viewId: 'myViewId', x: 10, y: 10, w: 10, h: 10 },
        ],
        editor: {
          isOpened: false,
          viewId: null,
          viewType: null,
        },
        path: '/path',
        oId: '1234',
        absolutePath: '/absolutePath',
        isModified: true,
        properties: [1, 2, 3, 4],
        timebarCollapsed: false,
      });
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions._add('myPageId')
      );
      state.myPageId.should.deep.eql({
        title: 'Unknown',
        timebarHeight: 135,
        timebarUuid: null,
        views: [],
        layout: [],
        editor: {
          isOpened: false,
          viewId: null,
          viewType: null,
        },
        path: undefined,
        oId: undefined,
        absolutePath: undefined,
        isModified: true,
        properties: [],
        timebarCollapsed: false,
      });
    });
  });
  describe('remove', () => {
    it('removePage', () => {
      const state = reducer(
        { myPageId: { title: 'Title' } },
        actions.removePage('myPageId')
      );
      state.should.not.have.property('myPageId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myPageId: { title: 'Title' } },
        actions.removePage('foo')
      );
      state.should.have.property('myPageId');
    });
  });
  describe('HSC workspace', () => {
    it('close', () => {
      reducer({ myPage: { timebarHeight: 5 } }, { type: types.HSC_CLOSE_WORKSPACE })
      .should.be.an('object').that.is.empty;
    });
  });
});
