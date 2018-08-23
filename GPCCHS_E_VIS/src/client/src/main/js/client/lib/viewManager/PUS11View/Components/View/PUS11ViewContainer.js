import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { PUS_SERVICE_11 } from 'constants';
import { open as openModal } from 'store/actions/modals';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import PUS11View from './PUS11View';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { injectTabularData } from '../../../commonData/reducer';
import parameters from '../../../../common/configurationManager';

const formatBinaryProfile = binaryProfile => (
  binaryProfile.length === 0
    ? []
    : binaryProfile.match(/.{1,16}/g).map(row => row.match(/.{1,2}/g))
);

const updatesConstantsAndTables = (pusData) => {
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const groundStatuses = parameters.get('PUS_CONSTANTS').COMMAND_GROUND_STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = pusData;
  for (let i = 0; i < data.headers.length; i += 1) {
    data.headers[i].serviceApidName = _.getOr(null, 'serviceApidName', data.headers[i]);
    data.headers[i].serviceApid = _.getOr(null, 'serviceApid', data.headers[i]);
    data.headers[i].scheduleStatus = statuses[String(_.getOr(200, 'scheduleStatus', data.headers[i]))];
    data.headers[i].spaceInNumberOfCommands = _.getOr(null, 'spaceInNumberOfCommands', data.headers[i]);
    data.headers[i].noFreeCommands = _.getOr(null, 'noFreeCommands', data.headers[i]);
    data.headers[i].freeSpace = _.getOr(null, 'freeSpace', data.headers[i]);
    data.headers[i].lastUpdateModeScheduleStatus = updateTypes[String(_.getOr(200, 'lastUpdateModeScheduleStatus', data.headers[i]))];
    data.headers[i].lastUpdateModeNoFreeCommands = updateTypes[String(_.getOr(200, 'lastUpdateModeNoFreeCommands', data.headers[i]))];
    data.headers[i].lastUpdateModeFreeSpace = updateTypes[String(_.getOr(200, 'lastUpdateModeFreeSpace', data.headers[i]))];
    data.headers[i].lastUpdateTimeScheduleStatus = _.getOr(null, 'lastUpdateTimeScheduleStatus', data.headers[i]);
    data.headers[i].lastUpdateTimeFreeSpace = _.getOr(null, 'lastUpdateTimeFreeSpace', data.headers[i]);
    data.headers[i].lastUpdateTimeNoFreeCommands = _.getOr(null, 'lastUpdateTimeNoFreeCommands', data.headers[i]);
  }


  data = injectTabularData(
    data,
    'subSchedules',
    _.getOr([], ['dataForTables', 'pus011SubSchedule'], data)
      .map(subSchedule => ({
        ...subSchedule,
        status: statuses[String(_.getOr(200, 'status', subSchedule))], // map schedule status constant
        lastUpdateModeSubScheduleId: updateTypes[String(_.getOr(200, 'lastUpdateModeSubScheduleId', subSchedule))], // map schedule lastUpdateModeSubScheduleId constant
        lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', subSchedule))], // map schedule lastUpdateModeStatus constant
        lastUpdateModeExecTimeFirstTc: updateTypes[String(_.getOr(200, 'lastUpdateModeExecTimeFirstTc', subSchedule))], // map schedule lastUpdateModeStatus constant
      }))
  );

  data = injectTabularData(
    data,
    'enabledApids',
    _.getOr([], ['dataForTables', 'pus011Apid'], data)
      .filter(enabledApid => enabledApid.status !== '1') // filter disabled apids
      .map(enabledApid => ({
        ...enabledApid,
        lastUpdateModeApid: updateTypes[String(_.getOr(200, 'lastUpdateModeApid', enabledApid))], // map schedule lastUpdateModeApid constant
      }))
  );

  data = injectTabularData(
    data,
    'commands',
    _.getOr([], ['dataForTables', 'pus011Command'], data).map(command => ({
      ...command,
      commandBinaryProfile: formatBinaryProfile(_.getOr('', 'commandBinaryProfile', command)),
      lastUpdateModeCommandId: updateTypes[String(_.getOr(200, 'lastUpdateModeCommandId', command))], // map schedule lastUpdateModeCommandId constant
      lastUpdateModeBinProf: updateTypes[String(_.getOr(200, 'lastUpdateModeBinProf', command))], // map schedule lastUpdateModeBinProf constant
      commandStatus: statuses[String(_.getOr(200, 'commandStatus', command))], // map schedule commandStatus constant
      lastUpdateModeGroundStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeGroundStatus', command))], // map schedule lastUpdateModeGroundStatus constant
      commandGroundStatus: groundStatuses[_.getOr('empty', 'commandGroundStatus', command)], // map schedule commandGroundStatus constant
      lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', command))], // map schedule lastUpdateModeStatus constant
      lastUpdateModeCurrentExecTime: updateTypes[String(_.getOr(200, 'lastUpdateModeCurrentExecTime', command))], // map schedule lastUpdateModeCurrentExecTime constant
      lastUpdateModeInitialExecTime: updateTypes[String(_.getOr(200, 'lastUpdateModeInitialExecTime', command))], // map schedule lastUpdateModeInitialExecTime constant
      lastUpdateModeTotalTimeShiftOffset: updateTypes[String(_.getOr(200, 'lastUpdateModeTotalTimeShiftOffset', command))], // map schedule lastUpdateModeTotalTimeShiftOffset constant
      pus011CommandParameters: _.getOr([], ['pus011CommandParameters'], command).map(commandParameter => ({
        ...commandParameter,
        lastUpdateMode: updateTypes[String(_.getOr(200, 'lastUpdateMode', commandParameter))], // map pus011CommandParameters lastUpdateMode constant
      })),
      pus011TimeShift: _.getOr([], ['pus011TimeShift'], command).map(timeShift => ({
        ...timeShift,
        lastUpdateMode: updateTypes[String(_.getOr(200, 'lastUpdateMode', timeShift))], // map pus011TimeShift lastUpdateMode constant
      })),
    }))
  );
  return _.omit(['dataForTables'], data);
};

const mapStateToProps = (state, { viewId }) => {
  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_11 });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    data = updatesConstantsAndTables(data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });

  const commandData = _.get(['tables', 'commands'], data); // data for modal

  return {
    data,
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
