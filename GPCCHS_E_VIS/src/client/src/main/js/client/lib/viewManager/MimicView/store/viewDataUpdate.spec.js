import { viewDataUpdate, selectDataPerView } from './viewDataUpdate';

describe('viewManager/TextView/store/viewDataUpdate', () => {
  describe('Update', () => {
    test('should ignore payloads', () => {
      const frozen = Object.freeze({ index: {}, values: {} });
      expect(viewDataUpdate(frozen, {})).toEqual(frozen);
    });
    test('should add', () => {
      const frozen = Object.freeze({ index: {}, values: {} });
      expect(
        viewDataUpdate(frozen, { index: { myEntryPoint: 15 }, values: { myEntryPoint: 300 } })
      ).toEqual({
        index: { myEntryPoint: 15 },
        values: { myEntryPoint: 300 },
      });
    });
    test('should update', () => {
      const state = Object.freeze({
        index: { myEntryPoint: '10' },
        values: { myEntryPoint: 150 },
      });
      expect(
        viewDataUpdate(state, { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } })
      ).toEqual({
        index: { myEntryPoint: 20 },
        values: { myEntryPoint: 300 },
      });
    });
    test('should preserve other values', () => {
      const state = Object.freeze({
        index: { myEntryPoint: 10, myOther: 20 },
        values: { myEntryPoint: 150, myOther: 200 },
      });
      expect(
        viewDataUpdate(state, { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } })
      ).toEqual({
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
        time: { type: 'time', value: j },
        monitoringState: { type: 'uinteger', value: 'ok' },
      };

      payload.rId2[j] = payload.rId1[j];
    }

    const viewDataMap = {
      mimic1: {
        type: 'MimicView',
        entryPoints: {
          ep4: {
            tbdId: 'rId1',
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
            tbdId: 'rId2',
            field: 'val4',
            offset: 0,
            localId: 'localrId2',
          },
        },
      },
      mimic2: {
        type: 'MimicView',
        entryPoints: {
          ep5: {
            tbdId: 'rId1',
            field: 'val3',
            offset: 0,
            localId: 'localEp5',
          },
          ep6: {
            tbdId: 'rId2',
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
            tbdId: 'rId1',
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
    test('state undefined', () => {
      const data =
      selectDataPerView(viewDataMap.mimic1, expectedIntervals, payload, { index: {}, values: {} });
      expect(data.index.ep4).toEqual(20);
      expect(data.index.ep7).toEqual(13);
      expect(data.values.ep4.value).toEqual(203);
      expect(data.values.ep7.value).toEqual('val3');
    });
    test('state with value > current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 22;
      oldState.values.ep4 = 22;
      const data = selectDataPerView(viewDataMap.mimic1, expectedIntervals, payload, oldState);
      expect(data.index.ep4).toEqual(20);
      expect(data.index.ep7).toEqual(13);
      expect(data.values.ep4.value).toEqual(203);
      expect(data.values.ep7.value).toEqual('val3');
    });
    test('state with value < current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 18.5;
      oldState.values.ep4 = 22;
      const data = selectDataPerView(viewDataMap.mimic1, expectedIntervals, payload, oldState);
      expect(data.index.ep4).toEqual(20);
      expect(data.index.ep7).toEqual(13);
      expect(data.values.ep4.value).toEqual(203);
      expect(data.values.ep7.value).toEqual('val3');
    });
    test('state with value = current', () => {
      const oldState = { index: {}, values: {} };
      oldState.index.ep4 = 20;
      oldState.values.ep4 = 22;
      const data = selectDataPerView(viewDataMap.mimic1, expectedIntervals, payload, oldState);
      expect(data.index.ep4).toEqual(20);
      expect(data.index.ep7).toEqual(13);
      expect(data.values.ep4.value).toEqual(203);
      expect(data.values.ep7.value).toEqual('val3');
    });
    test('visuWindow duration too long', () => {
      const oldState = { index: { ep4: 18 }, values: { ep4: { value: 201, color: '#0000FF' } } };
      const intervals = {
        rId1: {
          localrId1: { error: 'invalid visuWindow' },
          localEp5: { error: 'invalid visuWindow' },
          localEpDyn: { error: 'invalid visuWindow' },
        },
        rId2: {
          localrId2: { error: 'invalid visuWindow' },
          localEp6: { error: 'invalid visuWindow' },
        },
      };
      const data = selectDataPerView(viewDataMap.mimic2, intervals, payload, oldState);
      expect(data).toEqual({ });
    });
  });
});
