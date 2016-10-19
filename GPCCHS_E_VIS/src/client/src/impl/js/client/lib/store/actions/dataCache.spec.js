import { selectData } from './dataCache';
import { should, getStore } from '../../common/test';
import u from 'updeep';

describe('store/actions/dataCache', () => {
  let payload;
  let remoteIdPlots;
  let remoteIdTexts;
  let state;
  before(() => {
    payload = { rId1: [], rId2: [] };
    for (let j = 1; j < 1000; j++) {
      payload.rId1.push({ timestamp: j, payload: { val1: (j * 10) + 1, val2: (j * 10) + 2, val3: (j * 10) + 3 } })
      payload.rId2.push({ timestamp: j, payload: { val1: (j * 10) + 1, val2: (j * 10) + 2, val3: (j * 10) + 3 } })
    }
    remoteIdPlots = {
      rId1: {
        localIds: {
          lId1: { viewType: 'PlotView', field: 'val1', expectedInterval: [100, 550] },
          lId2: { viewType: 'PlotView', field: 'val2', expectedInterval: [10, 800] },
          lId3: { viewType: 'PlotView', field: 'val3', expectedInterval: [1, 999] },
        },
      },
      rId2: {
        localIds: {
          lId1: { viewType: 'PlotView', field: 'val1', expectedInterval: [100, 550] },
          lId2: { viewType: 'PlotView', field: 'val2', expectedInterval: [10, 800] },
          lId3: { viewType: 'PlotView', field: 'val3', expectedInterval: [1, 999] },
        },
      }
    };
    remoteIdTexts = {
      rId1: {
        localIds: {
          lId10: { viewType: 'TextView', field: 'val1', expectedInterval: [540, 550] },
          lId20: { viewType: 'TextView', field: 'val2', expectedInterval: [790, 800] },
        },
      },
      rId2: {
        localIds: {
          lId30: { viewType: 'TextView', field: 'val1', expectedInterval: [10, 20] },
          lId40: { viewType: 'TextView', field: 'val2', expectedInterval: [990, 1000] },
          lId50: { viewType: 'TextView', field: 'val1', expectedInterval: [545, 555] },
          lId60: { viewType: 'TextView', field: 'val2', expectedInterval: [1, 10] },
          lId70: { viewType: 'TextView', field: 'val1', expectedInterval: [220, 230] },
          lId80: { viewType: 'TextView', field: 'val2', expectedInterval: [999, 1009] },
          lId90: { viewType: 'TextView', field: 'val1', expectedInterval: [2, 12] },
          lId100: { viewType: 'TextView', field: 'val2', expectedInterval: [660, 670] },
        },
      }
    };

    state = { dataCache: {} };
  });
  it('range payload', () => {
    const start = process.hrtime();
    let end = 100;
    let bag;
    for (let i = 0; i < end; i++) {
      bag = selectData(state, remoteIdPlots, payload);
    }
    const duration = (process.hrtime(start)[1] / 1e6) / end;
    const count = Object.keys(payload).length ? Object.keys(payload).length : 0;
    console.log(`cacheData update done in ${duration}ms, for ${count} remoteIds`);
  });
  it('one payload', () => {
    const start = process.hrtime();
    let end = 100;
    let bag;
    for (let i = 0; i < end; i++) {
      bag = selectData(state, remoteIdTexts, payload);
    }
    const duration = (process.hrtime(start)[1] / 1e6) / end;
    const count = Object.keys(payload).length ? Object.keys(payload).length : 0;
    console.log(`cacheData update done in ${duration}ms, for ${count} remoteIds`);
  });
  it('mixed payload', () => {
    let end = 100;
    let bag;
    const remoteIds = u(remoteIdPlots, remoteIdTexts);
    const start = process.hrtime();
    for (let i = 0; i < end; i++) {
      bag = selectData(state, remoteIds, payload);
    }
    const duration = (process.hrtime(start)[1] / 1e6) / end;
    const count = Object.keys(payload).length ? Object.keys(payload).length : 0;
    console.log(`cacheData update done in ${duration}ms, for ${count} remoteIds`);
  });
});
