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

import { VM_VIEW_PUS11 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus11DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS11View: {
       *      pus011Apid: [],
       *      pus011SubSchedule: [],
       *      pus011Command: [],
       *      ...rest
       *    },
       *  },
       * },
       */
      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS11], action);
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
          ['pus011SubSchedule', 'pus011Apid', 'pus011Command'],
          data
        ),
        scheduleStatus: statuses[String(_.getOr(200, 'scheduleStatus', data))],
        lastUpdateModeScheduleStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeScheduleStatus', data))],
        lastUpdateModeNoFreeCommands: updateTypes[String(_.getOr(200, 'lastUpdateModeNoFreeCommands', data))],
        lastUpdateModeFreeSpace: updateTypes[String(_.getOr(200, 'lastUpdateModeFreeSpace', data))],
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'subSchedules',
        _.getOr([], ['pus011SubSchedule'], data)
          .map(subSchedule => ({
            ...subSchedule,
            status: statuses[String(_.getOr(200, 'status', subSchedule))], // map schedule status constant
            lastUpdateModeSubScheduleId: updateTypes[String(_.getOr(200, 'lastUpdateModeSubScheduleId', subSchedule))], // map schedule lastUpdateModeSubScheduleId constant
            lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', subSchedule))], // map schedule lastUpdateModeStatus constant
            lastUpdateModeExecTimeFirstTc: updateTypes[String(_.getOr(200, 'lastUpdateModeExecTimeFirstTc', subSchedule))], // map schedule lastUpdateModeStatus constant
          }))
      );
      updatedState = injectTabularData(updatedState, 'enabledApids',
        _.getOr([], ['pus011Apid'], data)
          .filter(enabledApid => enabledApid.status !== '1') // filter disabled apids
          .map(enabledApid => ({
            ...enabledApid,
            lastUpdateModeApid: updateTypes[String(_.getOr(200, 'lastUpdateModeApid', enabledApid))], // map schedule lastUpdateModeApid constant
          }))
      );
      updatedState = injectTabularData(updatedState, 'commands',
        _.getOr([], ['pus011Command'], data)
        .map(command => ({
          ...command,
          commandBinaryProfile: _.chunk(2, _.getOr('', 'commandBinaryProfile', command).split('')).map(c => c.join('')),
          lastUpdateModeCommandId: updateTypes[String(_.getOr(200, 'lastUpdateModeCommandId', command))], // map schedule lastUpdateModeCommandId constant
          lastUpdateModeBinProf: updateTypes[String(_.getOr(200, 'lastUpdateModeBinProf', command))], // map schedule lastUpdateModeBinProf constant
          commandStatus: statuses[String(_.getOr(200, 'commandStatus', command))], // map schedule commandStatus constant
          lastUpdateModeGroundStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeGroundStatus', command))], // map schedule lastUpdateModeGroundStatus constant
          commandGroundStatus: groundStatuses[_.getOr(200, 'commandGroundStatus', command)], // map schedule commandGroundStatus constant
          lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', command))], // map schedule lastUpdateModeStatus constant
          lastUpdateModeCurrentExecTime: updateTypes[String(_.getOr(200, 'lastUpdateModeCurrentExecTime', command))], // map schedule lastUpdateModeCurrentExecTime constant
          lastUpdateModeInitialExecTime: updateTypes[String(_.getOr(200, 'lastUpdateModeInitialExecTime', command))], // map schedule lastUpdateModeInitialExecTime constant
          lastUpdateModeTotalTimeShiftOffset: updateTypes[String(_.getOr(200, 'lastUpdateModeTotalTimeShiftOffset', command))], // map schedule lastUpdateModeTotalTimeShiftOffset constant
          pus011CommandParameters: command.pus011CommandParameters.map(commandParameter => ({
            ...commandParameter,
            lastUpdateMode: updateTypes[String(_.getOr(200, 'lastUpdateMode', commandParameter))], // map pus011CommandParameters lastUpdateMode constant
          })),
          pus011TimeShift: command.pus011TimeShift.map(timeShift => ({
            ...timeShift,
            lastUpdateMode: updateTypes[String(_.getOr(200, 'lastUpdateMode', timeShift))], // map pus011TimeShift lastUpdateMode constant
          })),
        }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus11DataReducer, {}, VM_VIEW_PUS11);

export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS11}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS11}Configuration`][viewId];
