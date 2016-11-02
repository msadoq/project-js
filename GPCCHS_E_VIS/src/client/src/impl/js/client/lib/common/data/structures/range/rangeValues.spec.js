import selectRangeValues, { rangeValues } from './rangeValues';
import { constants as globalConstants } from 'common';

describe('data/map/rangeValues', () => {
  const payload = { rId1: {}, rId2: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: (j * 10) + 1,
      val2: (j * 10) + 2,
      val3: (j * 10) + 3,
      referenceTimestamp: j,
      time: j + 0.2
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
          expectedInterval: [12, 16],
          offset: 2,
        },
        ep3: {
          remoteId: 'rId2',
          fieldX: 'time',
          fieldY: 'val2',
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
    it('state undefined', () => {
      const newState = rangeValues(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', undefined);
      newState['10'].ep1.should.deep.equal({ x: 10.2, value: 101 });
      newState['15'].ep1.should.deep.equal({ x: 15.2, value: 151 });
    });
    it('state empty', () => {
      const newState = rangeValues(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', {});
      newState['10'].should.deep.equal({ ep1: { x: 10.2, value: 101 } });
      newState['15'].should.deep.equal({ ep1: { x: 15.2, value: 151 } });
    });
    it('state not empty', () => {
      const oldState = { 10: { ep10: { x: 11.5, col1: 101 } },
        12.5: { ep10: { x: 12.5, value: 102 } } };
      const newState = rangeValues(payload.rId1, viewDataMap.plot1.entryPoints.ep1,
        'ep1', oldState);
      newState['10'].should.deep.equal({ ep1: { x: 10.2, value: 101 }, ep10: { x: 11.5, col1: 101 } });
      newState['15'].should.deep.equal({ ep1: { x: 15.2, value: 151 } });
    });
    it('no change', () => {
      const oldState = { 10: { ep1: [{ x: 1001.5, col1: 101 }, { x: 1002.5, value: 102 }] } };
      const newState = rangeValues(payload.rId1, viewDataMap.plot3.entryPoints.ep1,
        'ep1', oldState);
      newState.should.deep.equal({});
    });
  });
  describe('selectRangeValue', () => {
    it('unique entry point', () => {
      const viewData = selectRangeValues(payload, viewDataMap.plot1.entryPoints);
      viewData.should.have.all.keys(['remove', 'add', 'structureType']);
      const ep = viewDataMap.plot1.entryPoints.ep1;
      viewData.remove.lower.should.equal(ep.expectedInterval[0] + ep.offset);
      viewData.remove.upper.should.equal(ep.expectedInterval[1] + ep.offset);
      viewData.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      viewData.add['10'].should.deep.equal({ ep1: { x: 10.2, value: 101 } });
      viewData.add['15'].should.deep.equal({ ep1: { x: 15.2, value: 151 } });
      Object.keys(viewData.add).should.have.length(6);
    });
    it('multiple entry point', () => {
      const viewData = selectRangeValues(payload, viewDataMap.plot2.entryPoints);
      viewData.should.have.all.keys(['remove', 'add', 'structureType']);
      const ep = viewDataMap.plot2.entryPoints.ep2;
      viewData.remove.lower.should.equal(ep.expectedInterval[0] + ep.offset);
      viewData.remove.upper.should.equal(ep.expectedInterval[1] + ep.offset);
      viewData.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_RANGE);
      viewData.add['14'].should.deep.equal({ ep2: { x: 12.2, value: 122 }, ep3: { x: 14.2, value: 142 } });
      viewData.add['18'].should.deep.equal({ ep2: { x: 16.2, value: 162 }, ep3: { x: 18.2, value: 182 } });
      Object.keys(viewData.add).should.have.length(5);
    });
  });
});
