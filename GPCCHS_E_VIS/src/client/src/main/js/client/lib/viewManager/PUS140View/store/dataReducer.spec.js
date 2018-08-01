import pus140DataReducer from 'viewManager/PUS140View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS140View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS140ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS140View',
        data: {
          PUS140View: {
            foo: 'foo',
            bar: 'bar',
            pus0140PacketStore: [
              {
                baz: 'baz',
                status: 1,
                lastUpdateModeStoreId: 1,
                lastUpdateModeStoreType: 1,
                lastUpdateModeStoreStatus: 1,
                pus0140Packet: [
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
                pus0140Packet: [
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
                pus0140Packet: [
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
    expect(pus140DataReducer(state, action)).toEqual({
      PUS140ViewData: {
        foo: 'foo',
        bar: 'bar',
        tables: {
          onBoardStorages: {
            data: [
              {
                baz: 'baz',
                status: 'DISABLED',
                lastUpdateModeStoreId: 'TC',
                lastUpdateModeStoreType: 'TC',
                lastUpdateModeStoreStatus: 'TC',
              },
              {
                baz: 'baz',
                status: 'ENABLED',
                lastUpdateModeStoreId: 'TM',
                lastUpdateModeStoreType: 'TM',
                lastUpdateModeStoreStatus: 'TM',
              },
              {
                baz: 'baz',
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
                serviceType: 'TC',
                serviceSubType: 'TC',
                packetType: 'TC',
                lastUpdateModePacketId: 'TC',
                lastUpdateModeSubSamplingRatio: 'TC',
              },
              {
                baz: 'baz',
                serviceType: 'TM',
                serviceSubType: 'TM',
                packetType: 'TM',
                lastUpdateModePacketId: 'TM',
                lastUpdateModeSubSamplingRatio: 'TM',
              },
              {
                baz: 'baz',
                serviceType: 'Default',
                serviceSubType: 'Default',
                packetType: 'Default',
                lastUpdateModePacketId: 'Default',
                lastUpdateModeSubSamplingRatio: 'Default',
              },
              {
                baz: 'baz',
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
