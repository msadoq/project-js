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
            scheduleStatus: 1,
            lastUpdateModeScheduleStatus: 1,
            lastUpdateModeNoFreeCommands: 2,
            lastUpdateModeFreeSpace: 3,
            pus011SubSchedule: [
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
            pus011Apid: [
              {
                baz: 'baz',
                lastUpdateModeApid: 1,
              },
              {
                baz: 'baz',
                lastUpdateModeApid: 2,
              },
            ],
            pus011Command: [
              {
                baz: 'baz',
                commandBinaryProfile: '0215448994313434',
                lastUpdateModeCommandId: 1,
                lastUpdateModeBinProf: 1,
                commandStatus: 1,
                lastUpdateModeGroundStatus: 1,
                commandGroundStatus: '1',
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
                commandBinaryProfile: [
                  '02',
                  '15',
                  '44',
                  '89',
                  '94',
                  '31',
                  '34',
                  '34',
                ],
                lastUpdateModeCommandId: 'TC',
                lastUpdateModeBinProf: 'TC',
                commandStatus: 'DISABLED',
                lastUpdateModeGroundStatus: 'TC',
                commandGroundStatus: 'ACCEPTANCE SUCCESS',
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
