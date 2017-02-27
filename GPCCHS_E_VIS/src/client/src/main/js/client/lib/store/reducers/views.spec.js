/* eslint no-unused-expressions: "off" */
import * as actions from '../actions/views';
import * as types from '../types';
import viewsReducer from './views';
import { freezeArgs } from '../../common/test';

const reducer = freezeArgs(viewsReducer);

describe('store:views:reducer', () => {
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
        actions.add('myViewId', 'PlotView', { setting: 'value' }, 'path', 'old', 'absolutePath', false)
      );
      state.myViewId.should.eql({
        type: 'PlotView',
        configuration: { setting: 'value' },
        absolutePath: 'absolutePath',
        path: 'path',
        oId: 'old',
        isModified: false,
      });
    });
    it('add with entryPoints', () => {
      const action = actions.add(
        'myViewId',
        'PlotView',
        { setting: 'value', entryPoints: [{ a: true }, { b: true }] },
        'path',
        'old',
        'absolutePath',
        false
      );
      const eps = action.payload.configuration.entryPoints;
      const state = reducer(undefined, action);
      state.myViewId.should.eql({
        type: 'PlotView',
        configuration: { setting: 'value', entryPoints: [{ a: true, id: eps[0].id }, { b: true, id: eps[1].id }] },
        absolutePath: 'absolutePath',
        path: 'path',
        oId: 'old',
        isModified: false,
      });
    });
    it('add with entryPoints (DynamicView)', () => {
      const action = actions.add(
        'myViewId',
        'DynamicView',
        { setting: 'value', entryPoint: { a: true } },
        'path',
        'old',
        'absolutePath',
        false
      );
      const epUuid = action.payload.configuration.entryPoint.id;
      const state = reducer(undefined, action);
      state.myViewId.should.eql({
        type: 'DynamicView',
        configuration: { setting: 'value', entryPoints: [{ a: true, id: epUuid, name: 'dynamicEP' }] },
        absolutePath: 'absolutePath',
        path: 'path',
        oId: 'old',
        isModified: false,
      });
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions.add('myViewId')
      );
      state.myViewId.should.eql({
        absolutePath: undefined,
        oId: undefined,
        path: undefined,
        type: null,
        configuration: {
          title: null,
        },
        isModified: true,
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
  it('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
});
