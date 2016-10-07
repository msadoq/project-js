/* eslint no-unused-expressions: 0 */
import { should } from '../../utils/test';
import { getLocalIdData } from './dataCache';

describe('dataCache selector', () => {
  let state;
  before(() => {
    state = { dataCache: { rId1: {
      lId1:
       { data: { 2: 21, 3: 31, 4: 41, 8: 41, 0.3: 21, 0.5: 31 },
         index: ['0.3', '0.5', '2', '3', '4', '8'] },
      lId10:
       { data: { 2: 21, 3: 31, 4: 41 },
         index: ['2', '3', '4'] },
    } } };
  });
  it('valid', () => {
    const retValue = getLocalIdData(state, 'rId1', 'lId10');
    retValue.should.be.an('object').with.properties(state.dataCache.rId1.lId10);
  });
});
