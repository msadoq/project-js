import pus14DataReducer from 'viewManager/PUS14View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS14View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS14ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS14View',
        data: {
          PUS14View: {
            foo: 'foo',
            bar: 'bar',
            status: 1,
            pus014TmPacket: [
              {
                baz: 'baz',
                status: 1,
                forwardingStatus: 1,
                lastUpdateModeFwdStatus: 1,
                lastUpdateModeSid: 1,
                lastUpdateModeSubSamplingRatio: 1,
                lastUpdateModeTypeSubType: 1,
              },
              {
                baz: 'baz',
                status: 2,
                forwardingStatus: 2,
                lastUpdateModeFwdStatus: 2,
                lastUpdateModeSid: 2,
                lastUpdateModeSubSamplingRatio: 2,
                lastUpdateModeTypeSubType: 2,
              },
            ],
          },
        },
      },
    };
    expect(pus14DataReducer(state, action)).toEqual({
      PUS14ViewData: {
        foo: 'foo',
        bar: 'bar',
        status: 'DISABLED',
        tables: {
          pus014TmPacket: {
            data: [
              {
                baz: 'baz',
                status: 'DISABLED',
                forwardingStatus: 'DISABLED',
                lastUpdateModeFwdStatus: 'TC',
                lastUpdateModeSid: 'TC',
                lastUpdateModeSubSamplingRatio: 'TC',
                lastUpdateModeTypeSubType: 'TC',
              },
              {
                baz: 'baz',
                status: 'ENABLED',
                forwardingStatus: 'ENABLED',
                lastUpdateModeFwdStatus: 'TM',
                lastUpdateModeSid: 'TM',
                lastUpdateModeSubSamplingRatio: 'TM',
                lastUpdateModeTypeSubType: 'TM',
              },
            ],
            keep: [0, 1],
          },
        },
      },
    });
  });
});
