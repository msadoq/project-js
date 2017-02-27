import {} from '../../common/test';
import reducer from './editor';
import * as actions from '../actions/editor';

describe('store:editor:reducer', () => {
  // TODO abesson add test should preserve state if unknown action dispatched
  it('should returns initial state', () => {
    const state = reducer(undefined, {});
    state.should.have.a.property('textViewId', null);
  });
  it('should update viewId', () => {
    reducer(undefined, actions._openHtmlEditor('test'))
    .textViewId.should.equal('test');
  });
  it('should reset viewId', () => {
    const state = reducer(undefined, actions.closeHtmlEditor());
    state.should.have.a.property('textViewId', null);
  });
});
