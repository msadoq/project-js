import globalConstants from 'common/constants';
import { selectData } from './inject';

describe('dataManager/inject', () => {
  const payload = { rId1: {}, rId2: {}, rId3: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: { type: 'uinteger', value: (j * 10) + 1 },
      val2: { type: 'uinteger', value: (j * 10) + 2 },
      val3: { type: 'uinteger', value: (j * 10) + 3 },
      referenceTimestamp: { type: 'time', value: j },
      time: { type: 'time', value: j + 0.2 },
    };

    payload.rId2[j] = payload.rId1[j];
    payload.rId3[j] = payload.rId1[j];
  }

  const intervals = {
    rId1: {
      local1: { expectedInterval: [10, 15] },
      local2: { expectedInterval: [12, 16] },
      local4: { expectedInterval: [1001, 1005] },
    },
    rId2: {
      local3: { expectedInterval: [14, 18] },
    },
    rId3: {
      local5: { expectedInterval: [10, 20] },
      local6: { expectedInterval: [18, 20] },
      local7: { expectedInterval: [10, 20] },
    },
  };

  const viewDataMap = {
    plot1: {
      type: 'PlotView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          offset: 0,
          localId: 'local1',
        },
      },
    },
    plot2: {
      type: 'PlotView',
      entryPoints: {
        ep2: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val2',
          offset: 2,
          localId: 'local2',
        },
        ep3: {
          remoteId: 'rId2',
          fieldX: 'time',
          fieldY: 'val2',
          offset: 0,
          localId: 'local3',
        },
      },
    },
    plot3: {
      type: 'PlotView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          offset: -987,
          localId: 'local4',
        },
      },
    },
    text1: {
      type: 'TextView',
      entryPoints: {
        ep4: {
          remoteId: 'rId3',
          field: 'val3',
          offset: 0,
          localId: 'local5',
        },
      },
    },
    text2: {
      type: 'TextView',
      entryPoints: {
        ep5: {
          remoteId: 'rId3',
          field: 'val3',
          offset: 0,
          localId: 'local6',
        },
        ep6: {
          remoteId: 'rId3',
          field: 'val3',
          offset: 0,
          localId: 'local7',
        },
      },
    },
  };
  const viewMap2 = {
    hist1: {
      type: 'HitoryView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          offset: 0,
        },
      },
    },
  };

  const state = { viewData: {
    plot2: {
      indexes: { ep5: [10, 14] },
      lines: {
        ep5: [{ masterTime: 10, x: 10.2, value: 100 }, { masterTime: 14, x: 10.7, value: 100 }],
        ep3: [{ masterTime: 10, x: 12.2, value: 25 }, { masterTime: 14, x: 12.7, value: 25 }],
      },
      min: { ep5: 100, ep3: 25 },
      max: { ep5: 100, ep3: 25 },
      minTime: { ep5: 14, ep3: 14 },
      maxTime: { ep5: 14, ep3: 14 },
    },
    text2: {
      index: { ep2: 18, ep3: 21 },
      values: { ep2: 1, ep3: 3 },
    },
  } };
  const count = { last: 0, range: 0 };


  describe('select data', () => {
    let bag;
    it('empty state', () => {
      bag = selectData({}, viewDataMap, intervals, payload, count);
      bag.should.have.all.keys(['plot1', 'plot2', 'plot3', 'text1', 'text2']);
      bag.plot1.should.have.all.keys(['remove', 'add', 'structureType', 'type']);
      bag.plot1.add.should.have.all.keys(['ep1', 'min', 'max', 'minTime', 'maxTime']);
      bag.plot1.remove.should.have.all.keys(['lower', 'upper']);
      bag.plot1.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      bag.plot2.should.have.all.keys(['remove', 'add', 'structureType', 'type']);
      bag.plot2.add.should.have.all.keys(['ep2', 'ep3', 'min', 'max', 'minTime', 'maxTime']);
      bag.plot2.add.ep2.should.have.keys('14', '15', '16', '17', '18');
      bag.plot2.remove.should.have.all.keys(['lower', 'upper']);
      bag.plot2.remove.lower.should.equal(14);
      bag.plot2.remove.upper.should.equal(18);
      bag.plot2.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      bag.plot3.should.have.all.keys(['remove', 'structureType', 'type']);
      bag.plot3.remove.should.have.all.keys(['lower', 'upper']);
      bag.plot2.remove.lower.should.equal(14);
      bag.plot2.remove.upper.should.equal(18);

      bag.text1.should.have.all.keys(['index', 'values', 'structureType', 'type']);
      bag.text1.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_LAST);
      bag.text1.index.ep4.should.equal(20);
      bag.text1.values.ep4.value.should.equal(203);
      bag.text2.should.have.all.keys(['index', 'values', 'structureType', 'type']);
      bag.text2.index.should.have.all.keys(['ep5', 'ep6']);
      bag.text2.index.ep5.should.equal(20);
      bag.text2.values.ep5.value.should.equal(203);
      bag.text2.index.ep6.should.equal(20);
      bag.text2.values.ep6.value.should.equal(203);
    });
    it('old state not empty', () => {
      const newState = selectData(state, viewDataMap, intervals, payload, count);
      newState.should.deep.equal(bag);
    });
    it('invalid view', () => {
      (() => selectData(state, viewMap2, intervals, payload, count)).should.throw();
    });
  });
});
