import pus142DataReducer from 'viewManager/PUS142View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS142View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS142ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS142View',
        data: {
          PUS142View: {
            foo: 'foo',
            bar: 'bar',
            pus0142PacketStore: [
              {
                baz: 'baz',
                status: 1,
                lastUpdateModeStoreId: 1,
                lastUpdateModeStoreType: 1,
                lastUpdateModeStoreStatus: 1,
                pus0142Packet: [
                  {
                    baz: 'baz',
                    serviceType: 1,
                    serviceSubType: 1,
                    packetType: 1,
                    lastUpdateModePacketId: 1,
                    lastUpdateModeSubSamplingRatio: 1,
                  },
                  {
                    baz: 'baz',
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
                status: 2,
                lastUpdateModeStoreId: 2,
                lastUpdateModeStoreType: 2,
                lastUpdateModeStoreStatus: 2,
                pus0142Packet: [
                  {
                    baz: 'baz',
                    serviceType: 3,
                    serviceSubType: 3,
                    packetType: 3,
                    lastUpdateModePacketId: 3,
                    lastUpdateModeSubSamplingRatio: 3,
                  },
                ],
              },
              {
                baz: 'baz',
                status: 3,
                lastUpdateModeStoreId: 3,
                lastUpdateModeStoreType: 3,
                lastUpdateModeStoreStatus: 3,
                pus0142Packet: [
                  {
                    baz: 'baz',
                    serviceType: 4,
                    serviceSubType: 4,
                    packetType: 4,
                    lastUpdateModePacketId: 4,
                    lastUpdateModeSubSamplingRatio: 4,
                  },
                ],
              },
            ],
          },
        },
      },
    };
    expect(pus142DataReducer(state, action)).toEqual({
      PUS142ViewData: {
        foo: 'foo',
        bar: 'bar',
        tables: {
          onBoardStorages: {
            data: [
              {
                baz: 'baz',
                dumpEnabled: '200',
                status: 'DISABLED',
                lastUpdateModeStoreId: 'TC',
                lastUpdateModeStoreType: 'TC',
                lastUpdateModeStoreStatus: 'TC',
              },
              {
                baz: 'baz',
                dumpEnabled: '200',
                status: 'ENABLED',
                lastUpdateModeStoreId: 'TM',
                lastUpdateModeStoreType: 'TM',
                lastUpdateModeStoreStatus: 'TM',
              },
              {
                baz: 'baz',
                dumpEnabled: '200',
                status: 'DELETED',
                lastUpdateModeStoreId: 'Default',
                lastUpdateModeStoreType: 'Default',
                lastUpdateModeStoreStatus: 'Default',
              },
            ],
            keep: [0, 1, 2],
          },
          storageDef: {
            data: [
              {
                baz: 'baz',
                isSubsamplingRatioSet: '',
                serviceType: 'TC',
                serviceSubType: 'TC',
                packetType: 'TC',
                lastUpdateModePacketId: 'TC',
                lastUpdateModeSubSamplingRatio: 'TC',
              },
              {
                baz: 'baz',
                isSubsamplingRatioSet: '',
                serviceType: 'TM',
                serviceSubType: 'TM',
                packetType: 'TM',
                lastUpdateModePacketId: 'TM',
                lastUpdateModeSubSamplingRatio: 'TM',
              },
              {
                baz: 'baz',
                isSubsamplingRatioSet: '',
                serviceType: 'Default',
                serviceSubType: 'Default',
                packetType: 'Default',
                lastUpdateModePacketId: 'Default',
                lastUpdateModeSubSamplingRatio: 'Default',
              },
              {
                baz: 'baz',
                isSubsamplingRatioSet: '',
                serviceType: 'Timer',
                serviceSubType: 'Timer',
                packetType: 'Timer',
                lastUpdateModePacketId: 'Timer',
                lastUpdateModeSubSamplingRatio: 'Timer',
              },
            ],
            keep: [0, 1, 2, 3],
          },
        },
      },
    });
  });
});
