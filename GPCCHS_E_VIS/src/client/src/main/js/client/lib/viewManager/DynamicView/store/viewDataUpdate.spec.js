import { viewDataUpdate, selectDataPerView } from './viewDataUpdate';

describe('viewManager/DynamicView/store/viewDataUpdate', () => {
  describe('Update', () => {
    it('should ignore payloads', () => {
      const frozen = Object.freeze({});
      expect(viewDataUpdate(frozen, {})).toBe(frozen);
    });
    it('should add', () => {
      const frozen = Object.freeze({});
      expect(viewDataUpdate(frozen, { index: 15, value: { va1: 300, val2: 400 } }))
        .toEqual({ index: 15, value: { va1: 300, val2: 400 } });
    });
    it('should update', () => {
      const state = Object.freeze({ index: '15', value: { va1: 300, val2: 400 } });
      expect(viewDataUpdate(state, { index: 20, value: { va1: 500, val2: 600 } }))
        .toEqual({ index: 20, value: { va1: 500, val2: 600 } });
    });
  });
  describe('selectDataPerView', () => {
    const payload = { rId1: {}, rId2: {} };
    for (let j = 10; j < 21; j += 1) {
      payload.rId1[j] = {
        val1: { type: 'uinteger', value: (j * 10) + 1 },
        val4: { type: 'enum', value: j - 10, symbol: 'val'.concat(j - 10) },
        referenceTimestamp: { type: 'time', value: j },
        time: { type: 'time', value: j },
        monitoringState: { type: 'uinteger', value: 'ok' },
      };

      payload.rId2[j] = payload.rId1[j];
    }

    const viewDataMap = {
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
      const data =
        selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, {});
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
    it('state with value > current', () => {
      const oldState = {
        index: 22,
        value: {
          val1: { type: 'uinteger', value: 221 },
          val4: { type: 'enum', value: 'val12', symbol: 'val12' },
          referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          time: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          monitoringState: { type: 'uinteger', value: 'ok' },
        } };
      const data = selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, oldState);
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
    it('state with value < current', () => {
      const oldState = { index: 19,
        value: {
          val1: { type: 'uinteger', value: 221 },
          val4: { type: 'enum', value: 'val12', symbol: 'val10' },
          referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          time: { type: 'time', value: '1970-01-01T00:00:00.019Z' },
          monitoringState: { type: 'uinteger', value: 'ok' },
        } };
      const data = selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, oldState);
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
    it('state with value = current', () => {
      const oldState = { index: 20,
        value: {
          val1: { type: 'uinteger', value: 221 },
          val4: { type: 'enum', value: 'val12', symbol: 'val10' },
          referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.022Z' },
          time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
          monitoringState: { type: 'uinteger', value: 'ok' },
        } };
      const data = selectDataPerView(viewDataMap.dynamic, expectedIntervals, payload, oldState);
      expect(data.index).toEqual(20);
      expect(data.value).toEqual({
        val1: { type: 'uinteger', value: 201 },
        val4: { type: 'enum', value: 'val10', symbol: 'val10' },
        referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        time: { type: 'time', value: '1970-01-01T00:00:00.020Z' },
        monitoringState: { type: 'uinteger', value: 'ok' },
      });
    });
  });
});
