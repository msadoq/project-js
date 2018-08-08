import pus15DataReducer from 'viewManager/PUS15View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS15View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS15ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS15View',
        data: {
          PUS15View: {
            foo: 'foo',
            bar: 'bar',
            pus015PacketStore: [
              {
                baz: 'baz',
                dumpEnabled: true,
                storeStatus: 1,
                downlinkStatus: 1,
                lastUpdateModeStoreId: 1,
                lastUpdateModeStoreType: 1,
                lastUpdateModeStoreStatus: 1,
                lastUpdateModeDownlinkStatus: 1,
                pus015Packet: [
                  {
                    baz: 'baz',
                    isSubsamplingRatioSet: true,
                    subsamplingRatio: 100,
                    lastUpdateModePacketId: 1,
                    lastUpdateModeSubSamplingRatio: 1,
                  },
                  {
                    baz: 'baz',
                    isSubsamplingRatioSet: false,
                    subsamplingRatio: 100,
                    lastUpdateModePacketId: 2,
                    lastUpdateModeSubSamplingRatio: 2,
                  },
                ],
              },
              {
                baz: 'baz',
                dumpEnabled: false,
                storeStatus: 2,
                downlinkStatus: 2,
                lastUpdateModeStoreId: 2,
                lastUpdateModeStoreType: 2,
                lastUpdateModeStoreStatus: 2,
                lastUpdateModeDownlinkStatus: 2,
                pus015Packet: [
                  {
                    baz: 'baz',
                    isSubsamplingRatioSet: true,
                    subsamplingRatio: 100,
                    lastUpdateModeSubSamplingRatio: 3,
                    lastUpdateModePacketId: 3,
                  },
                  {
                    baz: 'baz',
                    isSubsamplingRatioSet: false,
                    subsamplingRatio: 100,
                    lastUpdateModeSubSamplingRatio: 4,
                    lastUpdateModePacketId: 4,
                  },
                ],
              },
            ],
          },
        },
      },
    };
    expect(pus15DataReducer(state, action)).toEqual({
      PUS15ViewData: {
        foo: 'foo',
        bar: 'bar',
        tables: {
          onBoardStorages: {
            data: [
              {
                baz: 'baz',
                dumpEnabled: 'true',
                storeStatus: 'DISABLED',
                downlinkStatus: 'DISABLED',
                lastUpdateModeStoreId: 'TC',
                lastUpdateModeStoreType: 'TC',
                lastUpdateModeStoreStatus: 'TC',
                lastUpdateModeDownlinkStatus: 'TC',
              },
              {
                baz: 'baz',
                dumpEnabled: 'false',
                storeStatus: 'ENABLED',
                downlinkStatus: 'ENABLED',
                lastUpdateModeStoreId: 'TM',
                lastUpdateModeStoreType: 'TM',
                lastUpdateModeStoreStatus: 'TM',
                lastUpdateModeDownlinkStatus: 'TM',
              },
            ],
            keep: [0, 1],
          },
          storageDef: {
            data: [
              {
                baz: 'baz',
                isSubsamplingRatioSet: true,
                subsamplingRatio: 100,
                lastUpdateModePacketId: 'TC',
                lastUpdateModeSubSamplingRatio: 'TC',
              },
              {
                baz: 'baz',
                isSubsamplingRatioSet: false,
                subsamplingRatio: '',
                lastUpdateModeSubSamplingRatio: 2,
                lastUpdateModePacketId: 'TM',
              },
              {
                baz: 'baz',
                isSubsamplingRatioSet: true,
                subsamplingRatio: 100,
                lastUpdateModeSubSamplingRatio: 'Default',
                lastUpdateModePacketId: 'Default',
              },
              {
                baz: 'baz',
                isSubsamplingRatioSet: false,
                subsamplingRatio: '',
                lastUpdateModeSubSamplingRatio: 4,
                lastUpdateModePacketId: 'Timer',
              },
            ],
            keep: [0, 1, 2, 3],
          },
        },
      },
    });
  });
});
