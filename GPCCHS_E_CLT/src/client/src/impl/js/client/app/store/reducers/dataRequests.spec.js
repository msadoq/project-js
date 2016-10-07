/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import reducer from './dataRequests';

describe('store:reducers:dataRequests', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknow action', () => {
    // TODO
  });
  it('add request', () => {
    // TODO
  });
});
