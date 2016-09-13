/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './viewActions';
import reducer, { getView, getEntryPoints } from './viewReducer';

describe('store:views', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.be.an('object').that.is.empty;
    });
    it('unknown action', () => {
      reducer({ myViewId: { title: 'Title' } }, {})
        .should.eql({ myViewId: { title: 'Title' } });
    });
    describe('add', () => {
      it('add', () => {
        const state = reducer(
          undefined,
          actions.add('myViewId', 'plot', { setting: 'value' }, ['ep1'])
        );
        state.myViewId.should.eql({
          title: 'Unknown',
          type: 'plot',
          configuration: { setting: 'value' },
          entryPoints: ['ep1'],
        });
      });
      it('add empty', () => {
        const state = reducer(
          undefined,
          actions.add('myViewId')
        );
        state.myViewId.should.eql({
          title: 'Unknown',
          type: null,
          configuration: {},
          entryPoints: [],
        });
      });
    });
    describe('remove', () => {
      it('remove', () => {
        const state = reducer(
          { myViewId: { title: 'Title' } },
          actions.remove('myViewId')
        );
        state.should.not.have.property('myViewId');
      });
      it('remove unknown', () => {
        const state = reducer(
          { myViewId: { title: 'Title' } },
          actions.remove('foo')
        );
        state.should.have.property('myViewId');
      });
    });
    describe('un/mount entry point', () => {
      it('mount', () => {
        let state = reducer(
          { myViewId: { entryPoints: [] } },
          actions.mountEntryPoint('myViewId', 'myEntryPointId')
        );
        state.myViewId.entryPoints.should.eql(['myEntryPointId']);
        state = reducer(
          state,
          actions.mountEntryPoint('myViewId', 'another')
        );
        state.myViewId.entryPoints.should.eql(['myEntryPointId', 'another']);
      });
      it('unmount', () => {
        let state = reducer(
          { myViewId: { entryPoints: ['myViewId', 'another'] } },
          actions.unmountEntryPoint('myViewId', 'myViewId')
        );
        state.myViewId.entryPoints.should.eql(['another']);
        state = reducer(
          state,
          actions.unmountEntryPoint('myViewId', 'another')
        );
        state.myViewId.entryPoints.should.eql([]);
      });
    });
    describe('addAndMount/unmountAndRemove', () => {
      const { dispatch, getState } = getStore({ views: { myViewId: { entryPoints: ['ep1'] } } });
      let newEntryPointId;
      it('addAndMount', () => {
        dispatch(actions.addAndMount('myViewId'));
        getState().views.myViewId.entryPoints.should.be.an('array').with.lengthOf(2);
        newEntryPointId = getState().views.myViewId.entryPoints[1];
        getState().entryPoints[newEntryPointId].title.should.equal('Unknown');
      });
      it('unmountAndRemove', () => {
        dispatch(actions.unmountAndRemove('myViewId', newEntryPointId));
        getState().views.myViewId.entryPoints.should.be.an('array').with.lengthOf(1);
        should.not.exist(getState().entryPoints[newEntryPointId]);
      });
    });
  });
  describe('selectors', () => {
    it('getView', () => {
      const { getState } = getStore({
        views: {
          myViewId: { title: 'Title 1' },
        },
      });
      getView(getState(), 'myViewId').should.have.property('title', 'Title 1');
      should.not.exist(getView(getState(), 'unknownId'));
    });
    it('getEntryPoints', () => {
      const { getState } = getStore({
        views: {
          myViewId: { entryPoints: ['ep3', 'ep1', 'ep4'] },
        },
        entryPoints: { ep1: {}, ep2: {}, ep3: {} },
      });
      getEntryPoints(getState(), 'myViewId').should.eql([
        { entryPointId: 'ep3' },
        { entryPointId: 'ep1' },
      ]);
    });
  });
});
