/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './entryPointActions';
import reducer, { getEntryPoint } from './entryPointReducer';

describe('store:entryPoint', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.be.an('object').that.is.empty;
    });
    it('unknown action', () => {
      reducer({ myEntryPointId: { title: 'Title' } }, {})
        .should.eql({ myEntryPointId: { title: 'Title' } });
    });
    describe('add', () => {
      it('add', () => {
        const state = reducer(
          undefined,
          actions.add('myEntryPointId', 'Title')
        );
        state.myEntryPointId.should.eql({
          title: 'Title',
        });
      });
      it('add empty', () => {
        const state = reducer(
          undefined,
          actions.add('myEntryPointId')
        );
        state.myEntryPointId.should.eql({
          title: 'Unknown',
        });
      });
    });
    describe('remove', () => {
      it('remove', () => {
        const state = reducer(
          { myEntryPointId: { title: 'Title' } },
          actions.remove('myEntryPointId')
        );
        state.should.not.have.property('myEntryPointId');
      });
      it('remove unknown', () => {
        const state = reducer(
          { myEntryPointId: { title: 'Title' } },
          actions.remove('foo')
        );
        state.should.have.property('myEntryPointId');
      });
    });
  });
  describe('selectors', () => {
    it('getEntryPoint', () => {
      const { getState } = getStore({
        entryPoints: {
          myEntryPointId: { title: 'Title 1' },
        },
      });
      getEntryPoint(getState(), 'myEntryPointId').should.have.property('title', 'Title 1');
      should.not.exist(getEntryPoint(getState(), 'unknownId'));
    });
  });
});
