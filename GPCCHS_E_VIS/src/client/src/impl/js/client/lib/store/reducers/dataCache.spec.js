/* eslint no-unused-expressions: 0 no-console: 0 */
import u from 'updeep';
import { each } from 'lodash';
import reducer, { updateRangePayloads, cleanDataCache } from './dataCache';
import { selectData } from '../actions/dataCache';

describe('store:reducers:dataCache', () => {
  let payload;
  let remoteIdPlots;
  let remoteIdTexts;
  let remoteIds;
  let emptyState;
  let stateFilled;
  let bagPlots;
  // let bagTexts;
  let bag;
  let actionPlots;
  // let actionTexts;
  let action;
  before(() => {
    payload = { rId1: [], rId2: [], rId3: [] };
    for (let j = 100; j < 1000; j += 1) {
      payload.rId1.push({
        timestamp: j, payload: { val1: (j * 10) + 1, val2: (j * 10) + 2, val3: (j * 10) + 3 }
      });
      payload.rId2.push({
        timestamp: j, payload: { val1: (j * 10) + 1, val2: (j * 10) + 2, val3: (j * 10) + 3 }
      });
      payload.rId3.push({
        timestamp: j, payload: { val1: (j * 10) + 1, val2: (j * 10) + 2, val3: (j * 10) + 3 }
      });
    }
    remoteIdPlots = Object.freeze({
      rId1: {
        localIds: {
          lId1: { viewType: 'PlotView', field: 'val1', expectedInterval: [200, 255] },
          lId2: { viewType: 'PlotView', field: 'val2', expectedInterval: [150, 800] },
          lId3: { viewType: 'PlotView', field: 'val3', expectedInterval: [100, 999] },
        },
      },
      rId2: {
        localIds: {
          lId1: { viewType: 'PlotView', field: 'val1', expectedInterval: [200, 550] },
          lId2: { viewType: 'PlotView', field: 'val2', expectedInterval: [150, 800] },
          lId3: { viewType: 'PlotView', field: 'val3', expectedInterval: [100, 999] },
        },
      }
    });
    remoteIdTexts = Object.freeze({
      rId1: {
        localIds: {
          lId10: { viewType: 'TextView', field: 'val1', expectedInterval: [540, 550] },
          lId20: { viewType: 'TextView', field: 'val2', expectedInterval: [790, 800] },
        },
      },
      rId2: {
        localIds: {
          lId30: { viewType: 'TextView', field: 'val1', expectedInterval: [110, 120] },
          lId40: { viewType: 'TextView', field: 'val2', expectedInterval: [990, 1000] },
          lId50: { viewType: 'TextView', field: 'val1', expectedInterval: [545, 555] },
          lId60: { viewType: 'TextView', field: 'val2', expectedInterval: [101, 110] },
          lId70: { viewType: 'TextView', field: 'val1', expectedInterval: [220, 230] },
          lId80: { viewType: 'TextView', field: 'val2', expectedInterval: [999, 1009] },
          lId90: { viewType: 'TextView', field: 'val1', expectedInterval: [102, 112] },
          lId100: { viewType: 'TextView', field: 'val2', expectedInterval: [660, 670] },
        },
      }
    });

    emptyState = {};
    stateFilled = { rId1: { lId1: {} }, rId2: { lId70: {} }, rId3: { lId1: { 10: 23 } } };
    for (let i = 50; i < 250; i += 1) {
      stateFilled.rId1.lId1[(i + 0.5)] = (i * 10) + 0.5;
    }
    stateFilled.rId2.lId70 = { timestamp: 225, value: 265 };

    remoteIds = u(remoteIdPlots, remoteIdTexts);
    bagPlots = selectData(emptyState, remoteIdPlots, payload);
    // bagTexts = selectData(emptyState, remoteIdTexts, payload);
    bag = selectData(emptyState, remoteIds, payload);
    actionPlots = { type: 'DATA_IMPORT_PAYLOAD', payload: bagPlots };
    // actionTexts = { type: 'DATA_IMPORT_PAYLOAD', payload: bagTexts };
    action = { type: 'DATA_IMPORT_PAYLOAD', payload: bag };
  });
  it('unknown action', () => {
    reducer({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } }, {})
      .should.eql({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } });
  });
  it('action without payload', () => {
    const action = { type: 'DATA_IMPORT_PAYLOAD', payload: {} };
    reducer({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } }, action)
      .should.eql({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } });
  });
  it('action without eligible payload', () => {
    const action = { type: 'DATA_IMPORT_PAYLOAD', payload: { rId3: { lId1: {} } } };
    reducer({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } }, action)
      .should.eql({ myConnectedDataId: { formula: 'catalog.Parameter<Type>.field' } });
  });
  let retValueRef;
  it('import with old state empty', () => {
    const start = process.hrtime();
    const retValue = reducer({}, actionPlots);
    const duration = process.hrtime(start)[1] / 1e6;
    console.log(`dataCache update done in ${duration} ms`);
    retValue.should.have.keys(remoteIdPlots);
    retValue.rId1.should.have.all.keys(remoteIdPlots.rId1.localIds);
    retValue.rId2.should.have.all.keys(remoteIdPlots.rId2.localIds);
    retValueRef = retValue;
  });
  it('cleanDataCache empty cache', () => {
    const start = process.hrtime();
    const initialState = {};
    const updateVal = cleanDataCache(initialState, actionPlots);
    const duration = process.hrtime(start)[1] / 1e6;
    console.log(`cleanDataCache done in ${duration} ms`);
    updateVal.should.equal(initialState);
  });
  it('updateRangePayloads', () => {
    const start = process.hrtime();
    const updateValue = updateRangePayloads({}, actionPlots);
    const duration = process.hrtime(start)[1] / 1e6;
    console.log(`updateRangePayloads done in ${duration} ms`);
    updateValue.should.deep.equal(retValueRef);
  });
  it('updeep', () => {
    const start2 = process.hrtime();
    const newState = u(actionPlots.payload.data, emptyState);
    const duration2 = process.hrtime(start2)[1] / 1e6;
    console.log(`u(stateDataCache) done in ${duration2}ms`);
    newState.should.deep.equal(retValueRef);
  });
  describe('mixed payload', () => {
    let updatedValue;
    it('without updeep, empty state', () => {
      const start = process.hrtime();
      for (let i = 0; i < 100; i += 1) {
        const updatedState = cleanDataCache({}, action);
        updatedValue = updateRangePayloads(updatedState, action);
      }
      const duration = (process.hrtime(start)[1] / 1e6) / 100;
      console.log(`(without updeep, empty state) done in ${duration}ms`);
      updatedValue.should.have.properties(action.payload.data);
      each(action.payload.data, (val, rId) => {
        updatedValue[rId].should.have.properties(val);
      });
    });
    it('with updeep, empty state', () => {
      let retValue;
      const start = process.hrtime();
      for (let i = 0 ; i < 100; i += 1) {
        retValue = reducer({}, action);
      }
      const duration = (process.hrtime(start)[1] / 1e6) / 100;
      console.log(`dataCache update done in ${duration} ms`);
      retValue.should.deep.equal(updatedValue);
    });
    let result;
    it('without updeep, state filled', () => {
      const start = process.hrtime();
      for (let i = 0; i < 100; i += 1) {
        const updatedState = Object.assign({}, stateFilled, cleanDataCache(stateFilled, action));
        const payloads = updateRangePayloads(updatedState, action);
        result = Object.assign({}, updatedState, payloads);
      }
      const duration = (process.hrtime(start)[1] / 1e6) / 100;
      console.log(`(without updeep, empty state) done in ${duration}ms`);
      result.should.have.keys(['rId1', 'rId2', 'rId3']);
      result.rId3.should.equal(stateFilled.rId3);
      Object.keys(result.rId1.lId1)[0].should.equal('200');
      result.rId2.lId70.should.deep.equal({ timestamp: 230, value: 2301 });
    });
    it('with updeep, state filled', () => {
      const start = process.hrtime();
      let finalState;
      for (let i = 0 ; i < 100; i += 1) {
        const dataCache = cleanDataCache(stateFilled, action);
        finalState = u(action.payload.data, Object.assign({}, stateFilled, dataCache));
      }
      const duration = (process.hrtime(start)[1] / 1e6) / 100;
      console.log(`dataCache update done in ${duration} ms`);
      finalState.should.deep.equal(result);
    });
    it('using reducer', () => {
      const start = process.hrtime();
      let finalState;
      for (let i = 0 ; i < 100; i += 1) {
        finalState = reducer(stateFilled, action);
      }
      const duration = (process.hrtime(start)[1] / 1e6) / 100;
      console.log(`dataCache update done in ${duration} ms`);
      finalState.should.deep.equal(result);
    })
  });
});
