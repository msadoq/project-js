import globalConstants from 'common/constants';
import lastValue, { select } from './extractValues';

describe('dataManager/last/extractValues', () => {
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
    text1: {
      type: 'TextView',
      entryPoints: {
        ep4: {
          remoteId: 'rId1',
          field: 'val3',
          localId: 'localrId1',
          offset: 0,
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
        ep7: {
          remoteId: 'rId2',
          field: 'val4',
          offset: 0,
          localId: 'localrId2',
        },
      },
    },
    text2: {
      type: 'TextView',
      entryPoints: {
        ep5: {
          remoteId: 'rId1',
          field: 'val3',
          offset: 0,
          localId: 'localEp5',
        },
        ep6: {
          remoteId: 'rId2',
          field: 'val3',
          offset: 0,
          localId: 'localEp6',
        },
      },
    },
    dynamic: {
      type: 'DynamicView',
      entryPoints: {
        dynamicEP: {
          remoteId: 'rId1',
          decommutedValues: [{ name: 'val1' }, { name: 'val2' }],
          offset: 0,
          localId: 'localEpDyn',
        },
      },
    },
  };
  const expectedIntervals = {
    rId1: {
      localrId1: { expectedInterval: [10, 20] },
      localEp5: { expectedInterval: [18, 20] },
      localEpDyn: { expectedInterval: [18, 20] },
    },
    rId2: {
      localrId2: { expectedInterval: [10, 13] },
      localEp6: { expectedInterval: [12, 20] },
    },
  };
  describe('select', () => {
    it('state undefined', () => {
      const newState = select(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', undefined, 'TextView', expectedIntervals);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value > current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 22;
      oldState.values.ep4 = 22;
      const newState = select(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState, 'TextView', expectedIntervals);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value < current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 18.5;
      oldState.values.ep4 = 22;
      const newState = select(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState, 'TextView', expectedIntervals);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
    it('state with value = current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 20;
      oldState.values.ep4 = 22;
      const newState = select(payload.rId1, viewDataMap.text1.entryPoints.ep4, 'ep4', oldState, 'TextView', expectedIntervals);
      newState.timestamp.should.equal(20);
      newState.value.should.equal(203);
    });
  });
  describe('lastValue', () => {
    it('state empty', () => {
      const newState = lastValue({}, expectedIntervals, payload, 'text1', viewDataMap.text1.entryPoints, 'TextView');
      newState.index.ep4.should.equal(20);
      newState.values.ep4.should.eql({ value: 203, color: '#0000FF' });
      newState.index.ep7.should.equal(13);
      newState.values.ep7.should.eql({ value: 'val3' });
      newState.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_LAST);
    });
    it('state undefined', () => {
      const newState = lastValue(undefined, expectedIntervals, payload, 'text1', viewDataMap.text1.entryPoints, 'TextView');
      newState.index.ep4.should.equal(20);
      newState.values.ep4.should.eql({ value: 203, color: '#0000FF' });
      newState.index.ep7.should.equal(13);
      newState.values.ep7.should.eql({ value: 'val3' });
      newState.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_LAST);
    });
    it('multiple entry points', () => {
      const newState = lastValue({}, expectedIntervals, payload, 'text2', viewDataMap.text2.entryPoints, 'TextView');
      newState.index.ep6.should.equal(20);
      newState.values.ep6.should.eql({ value: 203 });
      newState.index.ep5.should.equal(20);
      newState.values.ep5.should.eql({ value: 203 });
      newState.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_LAST);
    });
    it('dynamic view', () => {
      const newState = lastValue({}, expectedIntervals, payload, 'dynamic', viewDataMap.dynamic.entryPoints, 'DynamicView');
      newState.index.dynamicEP.should.equal(20);
      newState.values.dynamicEP.value.should.eql({
        val1: { type: 'uinteger', value: 201 },
        val2: { type: 'uinteger', value: 202 },
        val3: { type: 'uinteger', value: 203 },
        val4: { type: 'enum', value: 10, symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: 20 },
        time: { type: 'time', value: 20.2 },
        monitoringState: { type: 'uinteger', value: 'ok' } });
      newState.structureType.should.equal(globalConstants.DATASTRUCTURETYPE_LAST);
    });
  });
});
