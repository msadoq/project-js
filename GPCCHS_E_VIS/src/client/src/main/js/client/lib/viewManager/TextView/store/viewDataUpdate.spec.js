import { viewDataUpdate, selectDataPerView } from './viewDataUpdate';

describe('viewManager/TextView/store/viewDataUpdate', () => {
  describe('Update', () => {
    it('should ignore payloads', () => {
      const frozen = Object.freeze({ index: {}, values: {} });
      viewDataUpdate(frozen, {}).should.equal(frozen);
    });
    it('should add', () => {
      const frozen = Object.freeze({ index: {}, values: {} });
      viewDataUpdate(frozen, { index: { myEntryPoint: 15 }, values: { myEntryPoint: 300 } })
      .should.eql({
        index: { myEntryPoint: 15 },
        values: { myEntryPoint: 300 },
      });
    });
    it('should update', () => {
      const state = Object.freeze({
        index: { myEntryPoint: 10 },
        values: { myEntryPoint: 150 },
      });
      viewDataUpdate(state, { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } })
      .should.eql({
        index: { myEntryPoint: 20 },
        values: { myEntryPoint: 300 },
      });
    });
    it('should preserve other values', () => {
      const state = Object.freeze({
        index: { myEntryPoint: 10, myOther: 20 },
        values: { myEntryPoint: 150, myOther: 200 },
      });
      viewDataUpdate(state, { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } })
      .should.eql({
        index: { myEntryPoint: 20, myOther: 20 },
        values: { myEntryPoint: 300, myOther: 200 },
      });
    });
  });
  describe('selectDataPerView', () => {
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
    it('state undefined', () => {
      // (currentViewMap, intervalMap, payload, viewSubState)
      const data =
        selectDataPerView(viewDataMap.text1, expectedIntervals, payload, { index: {}, values: {} });
      data.index.ep4.should.equal(20);
      data.index.ep7.should.equal(13);
      data.values.ep4.value.should.equal(203);
      data.values.ep7.value.should.equal('val3');
    });
    it('state with value > current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 22;
      oldState.values.ep4 = 22;
      const data = selectDataPerView(viewDataMap.text1, expectedIntervals, payload, oldState);
      data.index.ep4.should.equal(20);
      data.index.ep7.should.equal(13);
      data.values.ep4.value.should.equal(203);
      data.values.ep7.value.should.equal('val3');
    });
    it('state with value < current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 18.5;
      oldState.values.ep4 = 22;
      const data = selectDataPerView(viewDataMap.text1, expectedIntervals, payload, oldState);
      data.index.ep4.should.equal(20);
      data.index.ep7.should.equal(13);
      data.values.ep4.value.should.equal(203);
      data.values.ep7.value.should.equal('val3');
    });
    it('state with value = current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 20;
      oldState.values.ep4 = 22;
      const data = selectDataPerView(viewDataMap.text1, expectedIntervals, payload, oldState);
      data.index.ep4.should.equal(20);
      data.index.ep7.should.equal(13);
      data.values.ep4.value.should.equal(203);
      data.values.ep7.value.should.equal('val3');
    });
  });
});
