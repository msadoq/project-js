import globalConstants from 'common/constants';
import { selectData } from './inject';

describe('common/data/inject', () => {
  const payload = { rId1: {}, rId2: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: { type: 'uinteger', value: (j * 10) + 1 },
      val2: { type: 'uinteger', value: (j * 10) + 2 },
      val3: { type: 'uinteger', value: (j * 10) + 3 },
      referenceTimestamp: { type: 'time', value: j },
      time: { type: 'time', value: j + 0.2 },
    };

    payload.rId2[j] = payload.rId1[j];
  }

  const viewDataMap = {
    plot1: {
      type: 'PlotView',
      entryPoints: {
        ep1: {
          remoteId: 'rId1',
          fieldX: 'time',
          fieldY: 'val1',
          expectedInterval: [10, 15],
          offset: 0,
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
          expectedInterval: [12, 16],
          offset: 2,
        },
        ep3: {
          remoteId: 'rId2',
          fieldX: 'time',
          fieldY: 'val2',
          expectedInterval: [14, 18],
          offset: 0,
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
          expectedInterval: [1001, 1005],
          offset: -987,
        },
      },
    },
    text1: {
      type: 'TextView',
      entryPoints: {
        ep4: {
          remoteId: 'rId1',
          field: 'val3',
          expectedInterval: [10, 20],
          offset: 0,
        },
      },
    },
    text2: {
      type: 'TextView',
      entryPoints: {
        ep5: {
          remoteId: 'rId1',
          field: 'val3',
          expectedInterval: [18, 20],
          offset: 0,
        },
        ep6: {
          remoteId: 'rId2',
          field: 'val3',
          expectedInterval: [12, 20],
          offset: 0,
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
          expectedInterval: [10, 15],
          offset: 0,
        },
      },
    },
  };

  const state = { viewData: {
    plot2: {
      index: [10, 14],
      columns: [{ x: 10, ep5: { x: 10.2, value: 100 }, ep3: { x: 12.2, value: 25 } },
                { x: 14, ep5: { x: 10.7, value: 100 }, ep3: { x: 12.7, value: 25 } }],
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
      bag = selectData({}, viewDataMap, payload, count);
      bag.should.have.all.keys(['plot1', 'plot2', 'plot3', 'text1', 'text2']);
      bag.plot1.should.have.all.keys(['remove', 'add', 'structureType', 'type']);
      bag.plot1.add.should.have.all.keys(['10', '11', '12', '13', '14', '15']);
      bag.plot1.remove.should.have.all.keys(['lower', 'upper']);
      bag.plot1.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      bag.plot2.should.have.all.keys(['remove', 'add', 'structureType', 'type']);
      bag.plot2.add.should.have.all.keys(['14', '15', '16', '17', '18']);
      bag.plot2.add[14].should.have.keys('ep2', 'ep3');
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
      const newState = selectData(state, viewDataMap, payload, count);
      newState.should.deep.equal(bag);
    });
    it('invalid view', () => {
      (() => selectData(state, viewMap2, payload, count)).should.throw();
    });
  });
});
