/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import reducer from './dataCache';

describe('store:reducers:dataCache', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
});
