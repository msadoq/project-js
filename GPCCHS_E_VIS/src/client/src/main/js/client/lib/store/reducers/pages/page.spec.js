/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/pages';
import pagesReducer from '../pages';
import * as types from '../../types';

const reducer = freezeArgs(pagesReducer);

describe('store:page:reducer', () => {
  describe('update layout', () => {
    it('update layout simple', () => {
      const state = reducer(
        { myPageId: { layout: [{ key: '1' }, { key: '2' }], title: 'aa' } },
        actions.updateLayout('myPageId', [{ key: '3' }, { key: '4' }])
      );
      state.myPageId.layout.should.eql([{ key: '3' }, { key: '4' }]);
      state.myPageId.isModified.should.be.true;
    });
  });
  describe('updateAbsolutePath', () => {
    it('empty state', () => {
      reducer({}, actions.updateAbsolutePath('myPage', 'myPath'))
      .should.be.an('object').that.is.empty;
    });
    it('invalid page id', () => {
      const state = { page1: {} };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATE_ABSOLUTEPATH,
        payload: {
          pageId: 'myPage',
          newPath: 'myPath',
        },
      });
      newState.should.eql(state);
    });
    it('valid page id', () => {
      const state = { page1: { absolutePath: 'path1' } };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATE_ABSOLUTEPATH,
        payload: {
          pageId: 'page1',
          newPath: 'newPath',
        },
      });
      newState.should.eql({ page1: { absolutePath: 'newPath', isModified: true } });
    });
    it('update absolutePath for new page', () => {
      const state = { page1: { pageId: 'page1' } };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATE_ABSOLUTEPATH,
        payload: {
          pageId: 'page1',
          newPath: 'newPath',
        },
      });
      newState.should.eql({ page1: { pageId: 'page1', absolutePath: 'newPath', isModified: true } });
    });
  });
  describe('updatePath', () => {
    it('empty state', () => {
      const newState = reducer({}, {
        type: types.WS_PAGE_UPDATEPATH,
        payload: {
          pageId: 'myPage',
          newPath: 'myPath',
        },
      });
      newState.should.be.an('object').that.is.empty;
    });
    it('valid page id', () => {
      const state = { page1: { path: 'path1' } };
      const newState = reducer(state, {
        type: types.WS_PAGE_UPDATEPATH,
        payload: {
          pageId: 'page1',
          newPath: 'newPath',
        },
      });
      newState.should.eql({ page1: { path: 'newPath', isModified: true } });
    });
  });
  describe('set page oid', () => {
    it('empty state', () => {
      const newState = reducer({}, {
        type: types.WS_PAGE_SET_OID,
        payload: {
          pageId: 'myPage',
          oid: '1234',
        },
      });
      newState.should.be.an('object').that.is.empty;
    });
    it('sets oid', () => {
      const state = { page1: { } };
      const newState = reducer(state, {
        type: types.WS_PAGE_SET_OID,
        payload: {
          pageId: 'page1',
          oid: '1234',
        },
      });
      newState.should.eql({ page1: { oId: '1234', isModified: true } });
    });
  });
  describe('setModified', () => {
    it('no change', () => {
      reducer({ myPage: { isModified: false } }, actions.setModified('myPage', false))
      .should.eql({ myPage: { isModified: false } });
      reducer({ myPage: { isModified: true } }, actions.setModified('myPage', true))
      .should.eql({ myPage: { isModified: true } });
    });
    it('false -> true', () => {
      reducer({ myPage: { isModified: false } }, actions.setModified('myPage', true))
      .should.eql({ myPage: { isModified: true } });
    });
    it('true -> false', () => {
      reducer({ myPage: { isModified: true } }, actions.setModified('myPage', false))
      .should.eql({ myPage: { isModified: false } });
    });
    it('invalid view id', () => {
      const state = { myPage: { isModified: true } };
      reducer(state, actions.setModified('noPage', false))
      .should.eql(state);
    });
  });
  describe('updateTimebarId', () => {
    it('ok', () => {
      const state = { myPage: { timebarUuid: 'tb1' } };
      const action = { type: types.WS_PAGE_UPDATE_TIMEBARID, payload: { pageId: 'myPage', timebarUuid: 'newTb1' } };
      const nextState = reducer(state, action);
      nextState.myPage.timebarUuid.should.be.eql('newTb1');
    });
  });
  describe('updateTimebarHeight', () => { // TODO boxmodel remove
    it('ok', () => { // TODO boxmodel remove
      reducer({ myPage: { timebarHeight: 5 } }, actions.updateTimebarHeight('myPage', 210)) // TODO boxmodel remove
      .should.eql({ myPage: { timebarHeight: 210, isModified: true } }); // TODO boxmodel remove
    }); // TODO boxmodel remove
    it('height to small', () => { // TODO boxmodel remove
      reducer({ myPage: { timebarHeight: 5 } }, actions.updateTimebarHeight('myPage', 20)) // TODO boxmodel remove
      .should.eql({ myPage: { timebarHeight: 135, isModified: true } }); // TODO boxmodel remove
    }); // TODO boxmodel remove
    it('invalid view id', () => { // TODO boxmodel remove
      reducer({ myPage: { timebarHeight: 5 } }, actions.updateTimebarHeight('noPage', 10)) // TODO boxmodel remove
      .should.eql({ myPage: { timebarHeight: 5 } }); // TODO boxmodel remove
    }); // TODO boxmodel remove
  }); // TODO boxmodel remove
  describe('collapse', () => { // TODO boxmodel remove
    it('collapses timebar', () => { // TODO boxmodel remove
      const state = { myPage: { timebarHeight: 42 } }; // TODO boxmodel remove
      const action = actions.collapseTimebar('myPage', true); // TODO boxmodel remove
      const newState = reducer(state, action); // TODO boxmodel remove
      newState.myPage.should.be.eql({ // TODO boxmodel remove
        timebarHeight: 42, // TODO boxmodel remove
        timebarCollapsed: true, // TODO boxmodel remove
        isModified: true, // TODO boxmodel remove
      }); // TODO boxmodel remove
    }); // TODO boxmodel remove
  });
});
