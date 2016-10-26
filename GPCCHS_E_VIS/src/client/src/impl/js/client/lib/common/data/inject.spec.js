import { cleanRangeData, oneValue, rangeValues, selectData } from './inject';
import { getStore } from '../test';

describe.only('common/data/inject', () => {
  const payload = { rId1: [], rId2: [] };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1.push({
      timestamp: j, payload: { val1: (j * 10) + 1, val2: (j * 10) + 2, val3: (j * 10) + 3, time: j }
    });
    payload.rId2.push({
      timestamp: j, payload: { val1: (j * 10) + 1, val2: (j * 10) + 2, val3: (j * 10) + 3, time: j }
    });
  }

  const viewDataMap = {
    plot1: {
      type: 'PlotView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          color: 'red',
          expectedInterval: [10, 15],
        }
      },
    },
    plot2: {
      type: 'PlotView',
      entryPoints: {
        ep2: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val2',
          color: 'red',
          expectedInterval: [10, 18],
        },
        ep3: {
          remoteId: 'rId2',
          fieldX: 'time',
          fieldY: 'val2',
          color: 'red',
          expectedInterval: [15, 20],
        }
      },
    },
    plot3: {
      type: 'PlotView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          color: 'red',
          expectedInterval: [1001, 1005],
        }
      },
    },
    text1: {
      type: 'TextView',
      entryPoints: {
        ep4: {
          remoteId: 'rId1',
          field: 'val3',
          expectedInterval: [10, 20]
        }
      }
    },
    text2: {
      type: 'TextView',
      entryPoints: {
        ep5: {
          remoteId: 'rId1',
          field: 'val3',
          expectedInterval: [18, 20]
        },
        ep6: {
          remoteId: 'rId2',
          field: 'val3',
          expectedInterval: [12, 20]
        }
      },
    },
  };
  const viewMap2 = {
    history: {
      type: 'HistoryView',
      entryPoints: {
        ep5: {
          remoteId: 'rId1',
          field: 'val3',
          expectedInterval: [10, 20]
        }
      },
    }
  };

  const state = { viewData: {} };

  describe('cleanRangeData', () => {
    // cleanRangeData(viewSubState, ep, epName)
    it('empty state', () => {
      const cleanedState = cleanRangeData({}, viewDataMap.plot1.entryPoints.ep1, 'ep1');
      if (cleanedState) {
        should.not.exist(cleanedState);
      }
    });
    it('no data to keep', () => {
      const tmpState = { index: { ep1: [0, 1, 2, 3] },
      columns: {
        ep1: [
          { x: 0, col1: 0.1 },
          { x: 1, col1: 1.1 },
          { x: 2, col1: 2.1 },
          { x: 3, col1: 3.1 },
        ] },
      lines: [{ key: 'col1', color: 'red', name: 'ep1' }] };
      const cleanedState = cleanRangeData(tmpState, viewDataMap.plot1.entryPoints.ep1, 'ep1');
      cleanedState.index.ep1.should.have.length(0);
      cleanedState.columns.ep1.should.have.length(0);
      cleanedState.lines[0].should.deep.equal({ key: 'col1', color: 'red', name: 'ep1' });
    });
    it('interval to keep', () => {
      const tmpState = { index: { ep1: [8.5, 9.5, 10.5, 11.5] },
      columns: {
        ep1: [
          { x: 8.5, col1: 0.1 },
          { x: 9.5, col1: 1.1 },
          { x: 10.5, col1: 2.1 },
          { x: 11.5, col1: 3.1 },
        ] },
      lines: [{ key: 'col1', color: 'red', name: 'ep1' }] };
      const cleanedState = cleanRangeData(tmpState, viewDataMap.plot1.entryPoints.ep1, 'ep1');
      cleanedState.index.ep1.should.deep.equal([10.5, 11.5]);
      cleanedState.columns.ep1.should.have.length(2);
      cleanedState.columns.ep1[0].should.deep.equal({ x: 10.5, col1: 2.1 });
      cleanedState.columns.ep1[1].should.deep.equal({ x: 11.5, col1: 3.1 });
      cleanedState.lines[0].should.equal(tmpState.lines[0]);
    });
    it('whole interval to keep', () => {
      const tmpState = { index: { ep1: [10.5, 11.5, 14.5] },
      columns: {
        ep1: [
          { x: 10.5, col1: 2.1 },
          { x: 11.5, col1: 3.1 },
          { x: 14.5, col1: 0.1 },
        ] },
      lines: [{ key: 'col1', color: 'red', name: 'ep1' }] };
      const cleanedState = cleanRangeData(tmpState, viewDataMap.plot1.entryPoints.ep1, 'ep1');
      cleanedState.index.ep1.should.deep.equal([10.5, 11.5, 14.5]);
      cleanedState.columns.ep1.should.have.length(3);
      cleanedState.columns.ep1[0].should.deep.equal({ x: 10.5, col1: 2.1 });
      cleanedState.columns.ep1[1].should.deep.equal({ x: 11.5, col1: 3.1 });
      cleanedState.columns.ep1[2].should.deep.equal({ x: 14.5, col1: 0.1 });
      cleanedState.lines[0].should.equal(tmpState.lines[0]);
    });
  });
  describe('one value', () => {
    it('state undefined', () => {
      const newState = oneValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', undefined);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value > current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 22;
      oldState.values.ep4 = 22;
      const newState = oneValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value < current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 18.5;
      oldState.values.ep4 = 22;
      const newState = oneValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value = current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 20;
      oldState.values.ep4 = 22;
      const newState = oneValue(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
  });
  describe('range value', () => {
    it('state undefined', () => {
      const newState = rangeValues(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', 'col1');
      newState.index.ep1.should.deep.equal([10, 11, 12, 13, 14, 15]);
      newState.columns.ep1[0].should.deep.equal({ x: 10, col1: 101 });
      newState.columns.ep1[5].should.deep.equal({ x: 15, col1: 151 });
    });
    it('state empty', () => {
      const oldState = { index: { ep1: [] },
        columns: { ep1: [] },
        lines: { key: 'col1', color: 'red', name: 'ep1' } };
      const newState = rangeValues(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', 'col1', oldState);
      newState.index.ep1.should.deep.equal([10, 11, 12, 13, 14, 15]);
      newState.columns.ep1[0].should.deep.equal({ x: 10, col1: 101 });
      newState.columns.ep1[5].should.deep.equal({ x: 15, col1: 151 });
    });
    it('state not empty', () => {
      const oldState = { index: { ep1: [11.5, 12.5] },
        columns: { ep1: [{ x: 11.5, col1: 101 }, { x: 12.5, col1: 102 }] },
        lines: { key: 'col1', color: 'red', name: 'ep1' } };
      const newState = rangeValues(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', 'col1', oldState);
      newState.index.ep1.should.deep.equal([10, 11, 11.5, 12, 12.5, 13, 14, 15]);
      newState.columns.ep1[0].should.deep.equal({ x: 10, col1: 101 });
      newState.columns.ep1[2].should.deep.equal({ x: 11.5, col1: 101 });
      newState.lines.should.deep.equal(oldState.lines);
    });
    it('state not changed', () => {
      const oldState = { index: { ep1: [1001.5, 1002.5] },
        columns: { ep1: [{ x: 1001.5, col1: 101 }, { x: 1002.5, col1: 102 }] },
        lines: { key: 'col1', color: 'red', name: 'ep1' } };
      const newState = rangeValues(payload.rId1, viewDataMap.plot3.entryPoints.ep1,
        'ep1', 'col1', oldState);
      newState.should.equal(oldState);
    });
  });
  describe('select data', () => {
    it('empty state', () => {
      const bag = selectData(state, viewDataMap, payload);
      bag.should.have.all.keys(['plot1', 'plot2', 'text1', 'text2']);
      bag.plot1.should.have.all.keys(['index', 'lines', 'columns']);
      bag.plot2.should.have.all.keys(['index', 'lines', 'columns']);
      bag.text1.should.have.all.keys(['index', 'values']);
      bag.text2.should.have.all.keys(['index', 'values']);
      bag.plot2.index.should.have.all.keys(['ep2', 'ep3']);
      bag.plot2.lines.should.have.length(2);
      bag.text2.index.should.have.all.keys(['ep5', 'ep6']);
    });
    it('invalid view', () => {
      (() => selectData(state, viewMap2, payload)).should.throw();
    });
  });
});
