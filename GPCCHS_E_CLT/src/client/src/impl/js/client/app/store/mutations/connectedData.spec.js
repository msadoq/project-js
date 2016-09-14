/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import * as actions from './connectedDataActions';
import reducer, { getConnectedData } from './connectedDataReducer';

describe('store:connectedData', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.be.an('object').that.is.empty;
    });
    it('unknown action', () => {
      reducer({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } }, {})
        .should.eql({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } });
    });
    describe('add', () => {
      it('complete', () => {
        const state = reducer(
          undefined,
          actions.add(
            'myConnectedDataId',
            'catalog.Parameter<Type>.field',
            '.*',
            'timeline 1',
            [{ field: 'myField', operator: '==', operand: 10 }]
          )
        );
        state.myConnectedDataId.should.eql({
          formula: 'catalog.Parameter<Type>.field',
          domain: '.*',
          timeline: 'timeline 1',
          filter: [{ field: 'myField', operator: '==', operand: 10 }],
        });
      });
      it('add empty', () => {
        const state = reducer(
          undefined,
          actions.add('myConnectedDataId')
        );
        state.myConnectedDataId.should.eql({
          formula: null,
          domain: null,
          timeline: null,
          filter: null,
        });
      });
    });
    describe('remove', () => {
      it('remove', () => {
        const state = reducer(
          { myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } },
          actions.remove('myConnectedDataId')
        );
        state.should.not.have.property('myConnectedDataId');
      });
      it('remove unknown', () => {
        const state = reducer(
          { myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } },
          actions.remove('foo')
        );
        state.should.have.property('myConnectedDataId');
      });
    });
  });
  describe('selectors', () => {
    it('getConnectedData', () => {
      const { getState } = getStore({
        connectedData: {
          myConnectedDataId: { formula: 'f*f' },
        },
      });
      getConnectedData(getState(), 'myConnectedDataId').should.have.property('formula', 'f*f');
      should.not.exist(getConnectedData(getState(), 'unknownId'));
    });
  });
});
