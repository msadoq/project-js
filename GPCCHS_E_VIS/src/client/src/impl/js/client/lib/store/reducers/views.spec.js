/* eslint no-unused-expressions: 0 */
import * as actions from '../actions/views';
import reducer from './views';

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
          actions.add('myViewId', 'plot', { setting: 'value' })
        );
        state.myViewId.should.eql({
          type: 'plot',
          configuration: { setting: 'value' },
        });
      });
      it('add empty', () => {
        const state = reducer(
          undefined,
          actions.add('myViewId')
        );
        state.myViewId.should.eql({
          type: null,
          configuration: {
            title: null,
          },
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
  });
});
