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
          offset: 0,
          localId: 'localEp7',
          stateColors: [
            {
              color: '#0000FF',
              condition: {
                field: 'val3',
                operator: '>',
                operand: '1',
              },
            },
          ],
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
          localId: 'localEp2',
          stateColors: [
            {
              color: '#0000FF',
              condition: {
                field: 'val3',
                operator: '>',
                operand: '1',
              },
            },
          ],
        },
        ep3: {
          remoteId: 'rId2',
          fieldX: 'time',
          fieldY: 'val4',
          offset: 0,
          localId: 'localrId2',
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
          localId: 'localrId1',
        },
      },
    },
  };
  const expectedIntervals = {
    rId1: {
      localrId1: { expectedInterval: [1001, 1005] },
      localEp2: { expectedInterval: [12, 16] },
      localEp7: { expectedInterval: [10, 15] },
    },
    rId2: {
      localrId2: { expectedInterval: [14, 18] },
    },
  };

  describe('range value', () => {
    it('state undefined', () => {
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', undefined, expectedIntervals);
      newState['10'].ep1.should.eql({ x: 10.2, value: 101, symbol: undefined, color: '#0000FF' });
      newState['15'].ep1.should.eql({ x: 15.2, value: 151, symbol: undefined, color: '#0000FF' });
    });
    it('state empty', () => {
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', {}, expectedIntervals);
      newState['10'].should.eql({ ep1: { x: 10.2, value: 101, symbol: undefined, color: '#0000FF' } });
      newState['15'].should.eql({ ep1: { x: 15.2, value: 151, symbol: undefined, color: '#0000FF' } });
    });
    it('state not empty', () => {
      const oldState = { 10: { ep10: { x: 11.5, col1: 101 } },
        12.5: { ep10: { x: 12.5, value: 102 } } };
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', oldState, expectedIntervals);
      newState['10'].should.eql({ ep1: { x: 10.2, value: 101, color: '#0000FF', symbol: undefined },
        ep10: { x: 11.5, col1: 101 } });
      newState['15'].should.eql({ ep1: { x: 15.2, value: 151, color: '#0000FF', symbol: undefined } });
    });
    it('no change', () => {
      const oldState = { 10: { ep1: [{ x: 1001.5, col1: 101 }, { x: 1002.5, value: 102 }] } };
      const newState = select(payload.rId1, viewDataMap.plot3.entryPoints.ep1,
        'ep1', oldState, expectedIntervals);
      newState.should.deep.equal({});
    });
  });
  describe('selectRangeValue', () => {
    it('unique entry point', () => {
      const viewData = extractValues({}, expectedIntervals, payload, 'myId', viewDataMap.plot1.entryPoints);
      viewData.should.have.all.keys(['remove', 'add', 'structureType', 'type']);
      const ep = viewDataMap.plot1.entryPoints.ep1;
      const interval = expectedIntervals.rId1.localEp7.expectedInterval;
      viewData.remove.lower.should.equal(interval[0] + ep.offset);
      viewData.remove.upper.should.equal(interval[1] + ep.offset);
      viewData.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      viewData.add['10'].should.eql({ ep1: { x: 10.2, value: 101, color: '#0000FF', symbol: undefined } });
      viewData.add['15'].should.eql({ ep1: { x: 15.2, value: 151, color: '#0000FF', symbol: undefined } });
      Object.keys(viewData.add).should.have.length(6);
    });
    it('multiple entry point', () => {
      const viewData = extractValues({}, expectedIntervals, payload, 'myId', viewDataMap.plot2.entryPoints);
      viewData.should.have.all.keys(['remove', 'add', 'structureType', 'type']);
      const ep = viewDataMap.plot2.entryPoints.ep2;
      const interval = expectedIntervals.rId1.localEp2.expectedInterval;
      viewData.remove.lower.should.equal(interval[0] + ep.offset);
      viewData.remove.upper.should.equal(interval[1] + ep.offset);
      viewData.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      viewData.add['14'].should.eql({ ep2: { x: 12.2, value: 122, color: '#0000FF', symbol: undefined },
        ep3: { x: 14.2, symbol: 'val4', value: 4 } });
      viewData.add['18'].should.eql({ ep2: { x: 16.2, value: 162, color: '#0000FF', symbol: undefined },
        ep3: { x: 18.2, symbol: 'val8', value: 8 } });
      Object.keys(viewData.add).should.have.length(5);
    });
  });
});
