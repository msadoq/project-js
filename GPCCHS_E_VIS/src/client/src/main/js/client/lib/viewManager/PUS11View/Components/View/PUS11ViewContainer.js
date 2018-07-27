import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { open as openModal } from 'store/actions/modals';
import { getData } from 'viewManager/PUS11View/store/dataReducer';
import PUS11View from './PUS11View';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  const commandData = _.get(['tables', 'commands'], data); // data for modal

  return {
    serviceApid: _.getOr(null, 'serviceApid', data),
    spaceInNumberOfCommands: _.getOr(null, 'spaceInNumberOfCommands', data),
    scheduleStatus: _.getOr(200, 'scheduleStatus', data),
    lastUpdateTimeScheduleStatus: _.getOr(null, 'lastUpdateTimeScheduleStatus', data),
    lastUpdateModeScheduleStatus: _.getOr(200, 'lastUpdateModeScheduleStatus', data),
    noFreeCommands: _.getOr(null, 'noFreeCommands', data),
    lastUpdateTimeNoFreeCommands: _.getOr(null, 'lastUpdateTimeNoFreeCommands', data),
    lastUpdateModeNoFreeCommands: _.getOr(200, 'lastUpdateModeNoFreeCommands', data),
    freeSpace: _.getOr(null, 'freeSpace', data),
    lastUpdateTimeFreeSpace: _.getOr(null, 'lastUpdateTimeFreeSpace', data),
    lastUpdateModeFreeSpace: _.getOr(200, 'lastUpdateModeFreeSpace', data),
    serviceApidName: _.getOr(null, 'serviceApidName', data),
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
