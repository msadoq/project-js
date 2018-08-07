import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { PUS_SERVICE_11 } from 'constants';
import { open as openModal } from 'store/actions/modals';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import PUS11View from './PUS11View';
import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { injectTabularData } from '../../../commonData/reducer';
import parameters from '../../../../common/configurationManager';

const pusService = PUS_SERVICE_11;
const groundStatuses = parameters.get('PUS_CONSTANTS').COMMAND_GROUND_STATUS;
const statuses = parameters.get('PUS_CONSTANTS').STATUS;
const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

const mapStateToProps = (state, { viewId }) => {
  let data = getPUSViewData(state, { viewId, pusService });

  for (let i = 0; i < data.headers.length; i += 1) {
    data.headers[i].scheduleStatus = statuses[_.getOr(200, 'scheduleStatus', data.headers[i])];
    data.headers[i].lastUpdateModeScheduleStatus = updateTypes[_.getOr(200, 'lastUpdateModeScheduleStatus', data.headers[i])];
    data.headers[i].lastUpdateModeNoFreeCommands = updateTypes[_.getOr(200, 'lastUpdateModeNoFreeCommands', data.headers[i])];
    data.headers[i].lastUpdateModeFreeSpace = updateTypes[_.getOr(200, 'lastUpdateModeFreeSpace', data.headers[i])];
    data.headers[i].serviceApid = _.getOr(null, 'serviceApid', data.headers[i]);
    data.headers[i].spaceInNumberOfCommands = _.getOr(null, 'spaceInNumberOfCommands', data.headers[i]);
    data.headers[i].scheduleStatus = _.getOr(200, 'scheduleStatus', data.headers[i]);
    data.headers[i].lastUpdateTimeScheduleStatus = _.getOr(null, 'lastUpdateTimeScheduleStatus', data.headers[i]);
    data.headers[i].lastUpdateModeScheduleStatus = _.getOr(200, 'lastUpdateModeScheduleStatus', data.headers[i]);
    data.headers[i].noFreeCommands = _.getOr(null, 'noFreeCommands', data.headers[i]);
    data.headers[i].lastUpdateTimeNoFreeCommands = _.getOr(null, 'lastUpdateTimeNoFreeCommands', data.headers[i]);
    data.headers[i].lastUpdateModeNoFreeCommands = _.getOr(200, 'lastUpdateModeNoFreeCommands', data.headers[i]);
    data.headers[i].freeSpace = _.getOr(null, 'freeSpace', data.headers[i]);
    data.headers[i].lastUpdateTimeFreeSpace = _.getOr(null, 'lastUpdateTimeFreeSpace', data.headers[i]);
    data.headers[i].lastUpdateModeFreeSpace = _.getOr(200, 'lastUpdateModeFreeSpace', data.headers[i]);
    data.headers[i].serviceApidName = _.getOr(null, 'serviceApidName', data.headers[i]);
  }

  data = injectTabularData(
    data,
    'subSchedules',
    _.getOr([], ['dataForTables', 'pus011SubSchedule'], data)
      .map(subSchedule => ({
        ...subSchedule,
        status: statuses[_.getOr(200, 'status', subSchedule)], // map schedule status constant
        lastUpdateModeSubScheduleId: updateTypes[_.getOr(200, 'lastUpdateModeSubScheduleId', subSchedule)], // map schedule lastUpdateModeSubScheduleId constant
        lastUpdateModeStatus: updateTypes[_.getOr(200, 'lastUpdateModeStatus', subSchedule)], // map schedule lastUpdateModeStatus constant
        lastUpdateModeExecTimeFirstTc: updateTypes[_.getOr(200, 'lastUpdateModeExecTimeFirstTc', subSchedule)], // map schedule lastUpdateModeStatus constant
      }))
    );

  data = injectTabularData(
    data,
    'enabledApids',
    _.getOr([], ['dataForTables', 'pus011Apid'], data)
      .filter(enabledApid => enabledApid.status !== '1') // filter disabled apids
      .map(enabledApid => ({
        ...enabledApid,
        lastUpdateModeApid: updateTypes[_.getOr(200, 'lastUpdateModeApid', enabledApid)], // map schedule lastUpdateModeApid constant
      }))
  );

  data = injectTabularData(
    data,
    'commands',
    _.getOr([], ['dataForTables', 'pus011Command'], data).map(command => ({
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
      pus011CommandParameters: _.getOr([], ['pus011CommandParameters'], command).map(commandParameter => ({
        ...commandParameter,
        lastUpdateMode: updateTypes[_.getOr(200, 'lastUpdateMode', commandParameter)], // map pus011CommandParameters lastUpdateMode constant
      })),
      pus011TimeShift: _.getOr([], ['pus011TimeShift'], command).map(timeShift => ({
        ...timeShift,
        lastUpdateMode: updateTypes[_.getOr(200, 'lastUpdateMode', timeShift)], // map pus011TimeShift lastUpdateMode constant
      })),
    }))
  );

  data = _.omit(['dataForTables'], data);

  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  const commandData = _.get(['tables', 'commands'], data); // data for modal

  return {
    data,
    apids: _.getOr(null, ['entryPoints', 0, 'connectedData', 'apids'], config),
    commandData,
    windowId,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onCommandCellDoubleClick: (windowId, commandParameters, timeShifts, binaryProfile) => {
    dispatch(
      openModal(
        windowId,
        {
          type: 'pus11Modal',
          title: 'View Details',
          viewId,
          commandParameters,
          timeShifts,
          binaryProfile,
        }
      )
    );
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onCommandCellDoubleClick: (rowIndex) => {
    const { commandData } = stateProps;

    const data = commandData.data[rowIndex];

    // extract modal data
    const {
      commandBinaryProfile,
      lastUpdateModeBinProf,
      lastUpdateTimeBinProf,
    } = data;

    const commandParameters = data.pus011CommandParameters;
    const timeShifts = data.pus011TimeShift;
    const binaryProfile = {
      commandBinaryProfile,
      lastUpdateMode: lastUpdateModeBinProf,
      lastUpdateTime: lastUpdateTimeBinProf,
    };

    dispatchProps.onCommandCellDoubleClick(
      stateProps.windowId,
      commandParameters,
      timeShifts,
      binaryProfile
    );
  },
});

const PUS11ViewContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PUS11View);

PUS11ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS11ViewContainer;
