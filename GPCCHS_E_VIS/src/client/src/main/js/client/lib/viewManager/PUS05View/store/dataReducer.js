// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import _ from 'lodash/fp';
import parameters from 'common/configurationManager';

import { VM_VIEW_PUS05 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus05DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS05View: {
       *      pus005Apid: [],
       *      pus005SubSchedule: [],
       *      pus005Command: [],
       *      ...rest
       *    },
       *  },
       * },
       */
      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS05], action);
      if (!data) {
        return state;
      }
      let updatedState = state;

      const groundStatuses = parameters.get('PUS_CONSTANTS').COMMAND_GROUND_STATUS;
      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus005SubSchedule', 'pus005Apid', 'pus005Command'],
          data
        ),
        scheduleStatus: statuses[_.getOr(200, 'scheduleStatus', data)],
        lastUpdateModeScheduleStatus: updateTypes[_.getOr(200, 'lastUpdateModeScheduleStatus', data)],
        lastUpdateModeNoFreeCommands: updateTypes[_.getOr(200, 'lastUpdateModeNoFreeCommands', data)],
        lastUpdateModeFreeSpace: updateTypes[_.getOr(200, 'lastUpdateModeFreeSpace', data)],
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'subSchedules',
        _.getOr([], ['pus005SubSchedule'], data)
          .map(subSchedule => ({
            ...subSchedule,
            status: statuses[_.getOr(200, 'status', subSchedule)], // map schedule status constant
            lastUpdateModeSubScheduleId: updateTypes[_.getOr(200, 'lastUpdateModeSubScheduleId', subSchedule)], // map schedule lastUpdateModeSubScheduleId constant
            lastUpdateModeStatus: updateTypes[_.getOr(200, 'lastUpdateModeStatus', subSchedule)], // map schedule lastUpdateModeStatus constant
            lastUpdateModeExecTimeFirstTc: updateTypes[_.getOr(200, 'lastUpdateModeExecTimeFirstTc', subSchedule)], // map schedule lastUpdateModeStatus constant
          }))
      );
      updatedState = injectTabularData(updatedState, 'enabledApids',
        _.getOr([], ['pus005Apid'], data)
          .filter(enabledApid => enabledApid.status !== '1') // filter disabled apids
          .map(enabledApid => ({
            ...enabledApid,
            lastUpdateModeApid: updateTypes[_.getOr(200, 'lastUpdateModeApid', enabledApid)], // map schedule lastUpdateModeApid constant
          }))
      );
      updatedState = injectTabularData(updatedState, 'commands',
        _.getOr([], ['pus005Command'], data)
        .map(command => ({
          ...command,
          lastUpdateModeCommandId: updateTypes[_.getOr(200, 'lastUpdateModeCommandId', command)], // map schedule lastUpdateModeCommandId constant
          lastUpdateModeBinProf: updateTypes[_.getOr(200, 'lastUpdateModeBinProf', command)], // map schedule lastUpdateModeBinProf constant
          commandStatus: statuses[_.getOr(200, 'commandStatus', command)], // map schedule commandStatus constant
          lastUpdateModeGroundStatus: updateTypes[_.getOr(200, 'lastUpdateModeGroundStatus', command)], // map schedule lastUpdateModeGroundStatus constant
          commandGroundStatus: groundStatuses[_.getOr(200, 'commandGroundStatus', command)], // map schedule commandGroundStatus constant
          lastUpdateModeStatus: updateTypes[_.getOr(200, 'lastUpdateModeStatus', command)], // map schedule lastUpdateModeStatus constant
          lastUpdateModeCurrentExecTime: updateTypes[_.getOr(200, 'lastUpdateModeCurrentExecTime', command)], // map schedule lastUpdateModeCurrentExecTime constant
          lastUpdateModeInitialExecTime: updateTypes[_.getOr(200, 'lastUpdateModeInitialExecTime', command)], // map schedule lastUpdateModeInitialExecTime constant
          lastUpdateModeTotalTimeShiftOffset: updateTypes[_.getOr(200, 'lastUpdateModeTotalTimeShiftOffset', command)], // map schedule lastUpdateModeTotalTimeShiftOffset constant
          pus005CommandParameters: command.pus005CommandParameters.map(commandParameter => ({
            ...commandParameter,
            lastUpdateMode: updateTypes[_.getOr(200, 'lastUpdateMode', commandParameter)], // map pus005CommandParameters lastUpdateMode constant
          })),
          pus005TimeShift: command.pus005TimeShift.map(timeShift => ({
            ...timeShift,
            lastUpdateMode: updateTypes[_.getOr(200, 'lastUpdateMode', timeShift)], // map pus005TimeShift lastUpdateMode constant
          })),
        }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus05DataReducer, {}, VM_VIEW_PUS05);

export const getPUS05ViewData = state => state[`${VM_VIEW_PUS05}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS05}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS05}Configuration`][viewId];
