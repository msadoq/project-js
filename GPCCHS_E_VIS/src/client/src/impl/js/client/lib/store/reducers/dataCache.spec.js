/* eslint no-unused-expressions: 0 */
import { should } from '../../common/test';
import reducer from './dataCache';
import * as actions from '../actions/dataCache';

describe('store:reducers:dataCache', () => {
  let payload;
  let remoteIds;
  before(() => {
    payload = { rId1: [
      { timestamp: 1, payload: { val1: 11, val2: 12, val3: 13 } },
      { timestamp: 2, payload: { val1: 21, val2: 22, val3: 23 } },
      { timestamp: 3, payload: { val1: 31, val2: 32, val3: 33 } },
      { timestamp: 4, payload: { val1: 41, val2: 42, val3: 43 } },
    ] };
    remoteIds = {
      rId1: {
        localIds: {
          lId1: { viewType: 'PlotView', field: 'val1', expectedInterval: [1, 3] },
          lId2: { viewType: 'TextView', field: 'val2', expectedInterval: [1, 2] },
        },
      }
    };
  });
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    // reducer({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } }, {})
    //   .should.eql({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } });
  });
  it('import with old state empty', () => {
    const retValue = reducer({}, actions.writePayload(payload, remoteIds));
    retValue.should.be.an('object').with.key('rId1');
    retValue.rId1.should.be.an('object').with.keys('lId1', 'lId2');
    retValue.rId1.lId1.should.be.an('object').with.keys('data', 'index');
    retValue.rId1.lId1.index.should.be.an('array').with.length(3)
    .that.have.properties([1, 2, 3]);
    retValue.rId1.lId2.should.be.an('object').with.keys('timestamp', 'value');
    retValue.rId1.lId2.timestamp.should.equal(2);
    retValue.rId1.lId2.value.should.equal(payload.rId1[1].payload.val2);
  });
  it('import with old state not empty', () => {
    const state = {
      rId1: {
        lId1: {
          data: { 0.3: 21, 0.5: 31, 8: 41 },
          index: ['0.3', '0.5', '8']
        },
        lId10: {
          data: { 2: 21, 3: 31, 4: 41 },
          index: ['2', '3', '4']
        }
      },
      rId2: {
        lId10: {
          data: { 2: 21, 3: 31, 4: 41 },
          index: ['2', '3', '4']
        }
      }
    };
    const retValue = reducer(state, actions.writePayload(payload, remoteIds));
    retValue.should.be.an('object').with.keys('rId1', 'rId2');
    retValue.rId2.should.have.properties(state.rId2);
    retValue.rId1.should.be.an('object').with.keys('lId1', 'lId2');
    retValue.rId1.lId1.should.be.an('object').with.keys('data', 'index');
    retValue.rId1.lId1.index.should.be.an('array').with.length(3)
    .that.have.properties([1, 2, 3]);
    retValue.rId1.lId2.should.be.an('object').with.keys('timestamp', 'value');
    retValue.rId1.lId2.timestamp.should.equal(2);
    retValue.rId1.lId2.value.should.equal(22);
  });
});
