import globalConstants from 'common/constants';

import extractValues, { select } from './extractValues';

describe('data/map/extractValues', () => {
  const payload = { rId1: {}, rId2: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: { type: 'uinteger', value: (j * 10) + 1 },
      val2: { type: 'uinteger', value: (j * 10) + 2 },
      val3: { type: 'uinteger', value: (j * 10) + 3 },
      val4: { type: 'enum', value: j - 10, symbol: 'val'.concat(j - 10) },
      referenceTimestamp: { type: 'time', value: j },
      time: { type: 'time', value: j + 0.2 },
      monitoringState: { type: 'uinteger', value: 'ok' },
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
          fieldY: 'val4',
          expectedInterval: [14, 18],
          offset: 0,
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
          expectedInterval: [1001, 1005],
          offset: -987,
        }
      },
    },
  };

  describe('range value', () => {
    const count = { last: 0, range: 0 };
    it('state undefined', () => {
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', undefined, count);
      newState['10'].ep1.should.eql({ x: 10.2, value: 101, monit: 'ok', symbol: undefined });
      newState['15'].ep1.should.eql({ x: 15.2, value: 151, monit: 'ok', symbol: undefined });
    });
    it('state empty', () => {
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', {}, count);
      newState['10'].should.eql({ ep1: { x: 10.2, value: 101, monit: 'ok', symbol: undefined } });
      newState['15'].should.eql({ ep1: { x: 15.2, value: 151, monit: 'ok', symbol: undefined } });
    });
    it('state not empty', () => {
      const oldState = { 10: { ep10: { x: 11.5, col1: 101 } },
        12.5: { ep10: { x: 12.5, value: 102 } } };
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', oldState, count);
      newState['10'].should.eql({ ep1: { x: 10.2, value: 101, monit: 'ok', symbol: undefined },
        ep10: { x: 11.5, col1: 101 } });
      newState['15'].should.eql({ ep1: { x: 15.2, value: 151, monit: 'ok', symbol: undefined } });
    });
    it('no change', () => {
      const oldState = { 10: { ep1: [{ x: 1001.5, col1: 101 }, { x: 1002.5, value: 102 }] } };
      const newState = select(payload.rId1, viewDataMap.plot3.entryPoints.ep1,
        'ep1', oldState, count);
      newState.should.deep.equal({});
    });
  });
  describe('selectRangeValue', () => {
    it('unique entry point', () => {
      const count = { last: 0, range: 0 };
      const viewData = extractValues({}, payload, 'myId', viewDataMap.plot1.entryPoints, count);
      viewData.should.have.all.keys(['remove', 'add', 'structureType']);
      const ep = viewDataMap.plot1.entryPoints.ep1;
      viewData.remove.lower.should.equal(ep.expectedInterval[0] + ep.offset);
      viewData.remove.upper.should.equal(ep.expectedInterval[1] + ep.offset);
      viewData.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      viewData.add['10'].should.eql({ ep1: { x: 10.2, value: 101, monit: 'ok', symbol: undefined } });
      viewData.add['15'].should.eql({ ep1: { x: 15.2, value: 151, monit: 'ok', symbol: undefined } });
      Object.keys(viewData.add).should.have.length(6);
    });
    it('multiple entry point', () => {
      const count = { last: 0, range: 0 };
      const viewData = extractValues({}, payload, 'myId', viewDataMap.plot2.entryPoints, count);
      viewData.should.have.all.keys(['remove', 'add', 'structureType']);
      const ep = viewDataMap.plot2.entryPoints.ep2;
      viewData.remove.lower.should.equal(ep.expectedInterval[0] + ep.offset);
      viewData.remove.upper.should.equal(ep.expectedInterval[1] + ep.offset);
      viewData.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      viewData.add['14'].should.eql({ ep2: { x: 12.2, value: 122, monit: 'ok', symbol: undefined },
        ep3: { x: 14.2, symbol: 'val4', value: 4, monit: 'ok' } });
      viewData.add['18'].should.eql({ ep2: { x: 16.2, value: 162, monit: 'ok', symbol: undefined },
        ep3: { x: 18.2, symbol: 'val8', value: 8, monit: 'ok' } });
      Object.keys(viewData.add).should.have.length(5);
    });
  });
});
