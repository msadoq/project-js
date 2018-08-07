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
                    isSubsamplingRatio: true,
                    subsamplingRatio: 100,
                    serviceType: 1,
                    serviceSubType: 1,
                    packetType: 1,
                    lastUpdateModePacketId: 1,
                    lastUpdateModeSubSamplingRatio: 1,
                  },
                  {
                    baz: 'baz',
                    isSubsamplingRatio: false,
                    subsamplingRatio: 100,
                    serviceType: 2,
                    serviceSubType: 2,
                    packetType: 2,
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
                    isSubsamplingRatio: true,
                    subsamplingRatio: 100,
                    lastUpdateModeSubSamplingRatio: 3,
                    serviceType: 3,
                    serviceSubType: 3,
                    packetType: 3,
                    lastUpdateModePacketId: 3,
                  },
                  {
                    baz: 'baz',
                    isSubsamplingRatio: false,
                    subsamplingRatio: 100,
                    lastUpdateModeSubSamplingRatio: 4,
                    serviceType: 4,
                    serviceSubType: 4,
                    packetType: 4,
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
                isSubsamplingRatio: true,
                subsamplingRatio: 100,
                serviceType: 'TC',
                serviceSubType: 'TC',
                packetType: 'TC',
                lastUpdateModePacketId: 'TC',
                lastUpdateModeSubSamplingRatio: 'TC',
              },
              {
                baz: 'baz',
                isSubsamplingRatio: false,
                subsamplingRatio: '',
                lastUpdateModeSubSamplingRatio: 2,
                serviceType: 'TM',
                serviceSubType: 'TM',
                packetType: 'TM',
                lastUpdateModePacketId: 'TM',
              },
              {
                baz: 'baz',
                isSubsamplingRatio: true,
                subsamplingRatio: 100,
                lastUpdateModeSubSamplingRatio: 'Default',
                serviceType: 'Default',
                serviceSubType: 'Default',
                packetType: 'Default',
                lastUpdateModePacketId: 'Default',
              },
              {
                baz: 'baz',
                isSubsamplingRatio: false,
                subsamplingRatio: '',
                lastUpdateModeSubSamplingRatio: 4,
                serviceType: 'Timer',
                serviceSubType: 'Timer',
                packetType: 'Timer',
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
