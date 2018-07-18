import pus11DataReducer from 'viewManager/PUS11View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS11View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS11ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS11View',
        data: {
          PUS11View: {
            foo: 'foo',
            bar: 'bar',
            pus011SubSchedule: [
              {
                baz: 'baz',
                status: 1,
                lastUpdateModeSubScheduleId: 1,
                lastUpdateModeStatus: 1,
              },
              {
                baz: 'baz',
                status: 2,
                lastUpdateModeSubScheduleId: 2,
                lastUpdateModeStatus: 2,
              },
            ],
            pus011Apid: [
              {
                baz: 'baz',
                status: 1,
                lastUpdateModeApid: 1,
              },
              {
                baz: 'baz',
                status: 2,
                lastUpdateModeApid: 2,
              },
            ],
            pus011Command: [
              {
                baz: 'baz',
                lastUpdateModeCommandId: 1,
                lastUpdateModeBinProf: 1,
                commandStatus: 1,
                lastUpdateModeGroundStatus: 1,
                commandGroundStatus: 1,
                lastUpdateModeStatus: 1,
                lastUpdateModeCurrentExecTime: 1,
                lastUpdateModeInitialExecTime: 1,
                lastUpdateModeTotalTimeShiftOffset: 1,
                pus011CommandParameters: [
                  {
                    baz: 'baz',
                    lastUpdateMode: 1,
                  },
                ],
                pus011TimeShift: [
                  {
                    baz: 'baz',
                    lastUpdateMode: 1,
                  },
                ],
              },
            ],
          },
        },
      },
    };
    expect(pus11DataReducer(state, action)).toEqual({
      PUS11ViewData: {
        foo: 'foo',
        bar: 'bar',
        tables: {
          subSchedules: {
            data: [
              {
                baz: 'baz',
                status: 'ENABLED',
                lastUpdateModeSubScheduleId: 'TM',
                lastUpdateModeStatus: 'TM',
              },
              {
                baz: 'baz',
                status: 'DISABLED',
                lastUpdateModeSubScheduleId: 'TC',
                lastUpdateModeStatus: 'TC',
              },
            ],
            keep: [0, 1],
          },
          enabledApids: {
            data: [
              {
                baz: 'baz',
                status: 'ENABLED',
                lastUpdateModeApid: 'TM',
              },
            ],
            keep: [0],
          },
          commands: {
            data: [
              {
                baz: 'baz',
                lastUpdateModeCommandId: 'TC',
                lastUpdateModeBinProf: 'TC',
                commandStatus: 'DISABLED',
                lastUpdateModeGroundStatus: 'TC',
                commandGroundStatus: 'DISABLED',
                lastUpdateModeStatus: 'TC',
                lastUpdateModeCurrentExecTime: 'TC',
                lastUpdateModeInitialExecTime: 'TC',
                lastUpdateModeTotalTimeShiftOffset: 'TC',
                pus011CommandParameters: [
                  {
                    baz: 'baz',
                    lastUpdateMode: 'TC',
                  },
                ],
                pus011TimeShift: [
                  {
                    baz: 'baz',
                    lastUpdateMode: 'TC',
                  },
                ],
              },
            ],
            keep: [0],
          },
        },
      },
    });
  });
});
