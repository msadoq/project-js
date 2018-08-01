import pus05DataReducer from 'viewManager/PUS05View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS05View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS05ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS05View',
        data: {
          PUS05View: {
            foo: 'foo',
            scheduleStatus: '1',
            lastUpdateModeScheduleStatus: '1',
            lastUpdateModeNoFreeCommands: '2',
            lastUpdateModeFreeSpace: '3',
            pus005SubSchedule: [
              {
                baz: 'baz',
                status: 1,
                lastUpdateModeExecTimeFirstTc: 1,
                lastUpdateModeSubScheduleId: 1,
                lastUpdateModeStatus: 1,
              },
              {
                baz: 'baz',
                status: 2,
                lastUpdateModeExecTimeFirstTc: 2,
                lastUpdateModeSubScheduleId: 2,
                lastUpdateModeStatus: 2,
              },
            ],
            pus005Apid: [
              {
                baz: 'baz',
                lastUpdateModeApid: 1,
              },
              {
                baz: 'baz',
                lastUpdateModeApid: 2,
              },
            ],
            pus005Command: [
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
                pus005CommandParameters: [
                  {
                    baz: 'baz',
                    lastUpdateMode: 1,
                  },
                ],
                pus005TimeShift: [
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
    expect(pus05DataReducer(state, action)).toEqual({
      PUS05ViewData: {
        foo: 'foo',
        scheduleStatus: 'DISABLED',
        lastUpdateModeScheduleStatus: 'TC',
        lastUpdateModeNoFreeCommands: 'TM',
        lastUpdateModeFreeSpace: 'Default',
        tables: {
          subSchedules: {
            data: [
              {
                baz: 'baz',
                status: 'DISABLED',
                lastUpdateModeExecTimeFirstTc: 'TC',
                lastUpdateModeSubScheduleId: 'TC',
                lastUpdateModeStatus: 'TC',
              },
              {
                baz: 'baz',
                status: 'ENABLED',
                lastUpdateModeExecTimeFirstTc: 'TM',
                lastUpdateModeSubScheduleId: 'TM',
                lastUpdateModeStatus: 'TM',
              },
            ],
            keep: [0, 1],
          },
          enabledApids: {
            data: [
              {
                baz: 'baz',
                lastUpdateModeApid: 'TC',
              },
              {
                baz: 'baz',
                lastUpdateModeApid: 'TM',
              },
            ],
            keep: [0, 1],
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
                pus005CommandParameters: [
                  {
                    baz: 'baz',
                    lastUpdateMode: 'TC',
                  },
                ],
                pus005TimeShift: [
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
