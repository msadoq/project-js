/* eslint no-unused-expressions: 0 */
import { should } from '../../utils/test';
import * as actions from '../actions/hsc';
import reducer from './hsc';

describe('store:hss', () => {
  describe('actions & reducer', () => {
    it('initial state', () => {
      reducer(undefined, {}).should.eql({ status: 'not-started' });
    });
    it('unknown action', () => {
      reducer({ status: 'started' }, {})
        .should.eql({ status: 'started' });
    });
    it('set state', () => {
      reducer(undefined, actions.updateStatus('started')).should.eql({ status: 'started' });
    });
  });
});
