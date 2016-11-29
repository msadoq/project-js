/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import * as actions from '../actions/windows';
import reducer from './windows';

describe('store:windows:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myWindowId: { title: 'Title' } }, {})
      .should.eql({ myWindowId: { title: 'Title' } });
  });
  describe('add', () => {
    it('add', () => {
      const state = reducer(
        undefined,
        actions.add('myWindowId', 'Title', { x: 110 }, ['myPageId'])
      );
      state.myWindowId.should.deep.eql({
        title: 'Title',
        focusedPage: null,
        pages: ['myPageId'],
        geometry: { w: 800, h: 600, x: 110, y: 10 },
        debug: { whyDidYouUpdate: false, timebarVisibility: true },
        isModified: false,
      });
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions.add('myWindowId')
      );
      state.myWindowId.should.deep.eql({
        title: 'Unknown',
        focusedPage: null,
        pages: [],
        geometry: { x: 10, y: 10, w: 800, h: 600 },
        debug: { whyDidYouUpdate: false, timebarVisibility: true },
        isModified: false,
      });
    });
  });
  describe('remove', () => {
    it('remove', () => {
      const state = reducer(
        { myWindowId: { title: 'Title' } },
        actions.remove('myWindowId')
      );
      state.should.not.have.property('myWindowId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myWindowId: { title: 'Title' } },
        actions.remove('foo')
      );
      state.should.have.property('myWindowId');
    });
  });
  describe('update geometry', () => {
    it('update only one', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
        actions.updateGeometry('myWindowId', 120)
      );
      state.myWindowId.should.have.property('geometry').with.properties({
        x: 120, y: 100, w: 100, h: 100
      });
    });
    it('update all', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
        actions.updateGeometry('myWindowId', 120, 130, 140, 150)
      );
      state.myWindowId.should.have.property('geometry').with.properties({
        x: 120, y: 130, w: 140, h: 150
      });
    });
    it('update nothing', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 120, y: 130, w: 140, h: 150 } } },
        actions.updateGeometry('myWindowId')
      );
      state.myWindowId.should.have.property('geometry').with.properties({
        x: 120, y: 130, w: 140, h: 150
      });
    });
  });
  it('focus page', () => {
    let state = reducer(
      { myWindowId: { focusedPage: null } },
      actions.focusPage('myWindowId', 'myPageId')
    );
    state.myWindowId.focusedPage.should.equal('myPageId');
    state = reducer(
      state,
      actions.focusPage('myWindowId')
    );
    should.not.exist(state.myWindowId.focusedPage);
  });
  describe('un/mount page', () => {
    it('mount', () => {
      let state = reducer(
        { myWindowId: { pages: [] } },
        actions.mountPage('myWindowId', 'myPageId')
      );
      state.myWindowId.pages.should.eql(['myPageId']);
      state = reducer(
        state,
        actions.mountPage('myWindowId', 'another')
      );
      state.myWindowId.pages.should.eql(['myPageId', 'another']);
    });
    it('unmount', () => {
      let state = reducer(
        { myWindowId: { pages: ['myPageId', 'another'] } },
        actions.unmountPage('myWindowId', 'myPageId')
      );
      state.myWindowId.pages.should.eql(['another']);
      state = reducer(
        state,
        actions.unmountPage('myWindowId', 'another')
      );
      state.myWindowId.pages.should.eql([]);
    });
  });
  describe('reorder pages', () => {
    it('reorder', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2', '3'] } },
        actions.reorderPages('myWindowId', ['2', '3', '1'])
      );
      state.myWindowId.pages.should.eql(['2', '3', '1']);
    });
    it('doesn\'t remove key', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2', '3'] } },
        actions.reorderPages('myWindowId', ['2', '3'])
      );
      state.myWindowId.pages.should.eql(['2', '3', '1']);
    });
    it('doesn\'t add key', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2'] } },
        actions.reorderPages('myWindowId', ['2', '3', '1'])
      );
      state.myWindowId.pages.should.eql(['2', '1']);
    });
  });
  describe('addAndMount/unmountAndRemove', () => {
    const { dispatch, getState } = getStore({ windows: { myWindowId: { pages: ['1'] } } });
    it('addAndMount', () => {
      dispatch(actions.addAndMount('myWindowId'));
      getState().windows.myWindowId.pages.should.be.an('array').with.lengthOf(2);
      getState().pages[getState().windows.myWindowId.pages[1]].title.should.equal('Unknown');
    });
    it('unmountAndRemove', () => {
      dispatch(actions.unmountAndRemove('myWindowId', getState().windows.myWindowId.pages[1]));
      getState().windows.myWindowId.pages.should.be.an('array').with.lengthOf(1);
      should.not.exist(getState().pages[getState().windows.myWindowId.pages[1]]);
    });
  });
});
