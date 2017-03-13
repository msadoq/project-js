import globalConstants from 'common/constants';

import extractValues, { select } from './extractValues';

describe('dataManager/range/extractValues', () => {
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
      newState.ep1['10'].should.eql({ x: 10.2, value: 101, symbol: undefined, color: '#0000FF' });
      newState.ep1['15'].should.eql({ x: 15.2, value: 151, symbol: undefined, color: '#0000FF' });
    });
    it('state empty', () => {
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', {}, expectedIntervals);
      newState.ep1['10'].should.eql({ x: 10.2, value: 101, symbol: undefined, color: '#0000FF' });
      newState.ep1['15'].should.eql({ x: 15.2, value: 151, symbol: undefined, color: '#0000FF' });
    });
    it('state not empty', () => {
      const oldState = { ep10: {
        10: { x: 11.5, col1: 101 },
        12.5: { x: 12.5, value: 102 },
      },
        min: { ep10: 101 },
        max: { ep10: 102 },
        minTime: { ep10: 10 },
        maxTime: { ep10: 12.5 },
      };
      const newState = select(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', oldState, expectedIntervals);
      newState.ep1.should.eql({ 10: { x: 10.2, value: 101, color: '#0000FF', symbol: undefined },
        11: { color: '#0000FF', symbol: undefined, value: 111, x: 11.2 },
        12: { color: '#0000FF', symbol: undefined, value: 121, x: 12.2 },
        13: { color: '#0000FF', symbol: undefined, value: 131, x: 13.2 },
        14: { color: '#0000FF', symbol: undefined, value: 141, x: 14.2 },
        15: { x: 15.2, value: 151, color: '#0000FF', symbol: undefined } });
      newState.min.should.eql({ ep10: 101, ep1: 101 });
      newState.max.should.eql({ ep10: 102, ep1: 151 });
      newState.minTime.should.eql({ ep10: 10, ep1: 10 });
      newState.maxTime.should.eql({ ep10: 12.5, ep1: 15 });
    });
    it('no change', () => {
      const oldState = { ep1: { 10: { x: 1001.5, col1: 101 },
        11: { x: 1002.5, value: 102 } },
        min: { ep1: 101 },
        max: { ep1: 102 },
        minTime: { ep1: 10 },
        maxTime: { ep1: 11 },
      };
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
      viewData.add.ep1.should.eql({
        10: { x: 10.2, value: 101, color: '#0000FF', symbol: undefined },
        11: { color: '#0000FF', symbol: undefined, value: 111, x: 11.2 },
        12: { color: '#0000FF', symbol: undefined, value: 121, x: 12.2 },
        13: { color: '#0000FF', symbol: undefined, value: 131, x: 13.2 },
        14: { color: '#0000FF', symbol: undefined, value: 141, x: 14.2 },
        15: { x: 15.2, value: 151, color: '#0000FF', symbol: undefined },
      });
    });
    it('multiple entry point', () => {
      const viewData = extractValues({}, expectedIntervals, payload, 'myId', viewDataMap.plot2.entryPoints);
      viewData.should.have.all.keys(['remove', 'add', 'structureType', 'type']);
      const ep = viewDataMap.plot2.entryPoints.ep2;
      const interval = expectedIntervals.rId1.localEp2.expectedInterval;
      viewData.remove.lower.should.equal(interval[0] + ep.offset);
      viewData.remove.upper.should.equal(interval[1] + ep.offset);
      viewData.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      viewData.add.ep2.should.eql({
        14: { x: 12.2, value: 122, color: '#0000FF', symbol: undefined },
        15: { color: '#0000FF', symbol: undefined, value: 132, x: 13.2 },
        16: { color: '#0000FF', symbol: undefined, value: 142, x: 14.2 },
        17: { x: 15.2, value: 152, color: '#0000FF', symbol: undefined },
        18: { x: 16.2, value: 162, color: '#0000FF', symbol: undefined },
      });
      viewData.add.ep3.should.eql({
        14: { x: 14.2, symbol: 'val4', value: 4 },
        15: { symbol: 'val5', value: 5, x: 15.2 },
        16: { symbol: 'val6', value: 6, x: 16.2 },
        17: { x: 17.2, value: 7, symbol: 'val7' },
        18: { x: 18.2, symbol: 'val8', value: 8 } });
      Object.keys(viewData.add).should.have.length(6);
    });
  });
});
