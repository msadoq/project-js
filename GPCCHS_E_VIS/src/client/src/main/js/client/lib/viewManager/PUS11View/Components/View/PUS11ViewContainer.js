import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { getData } from 'viewManager/PUS11View/store/dataReducer';
import PUS11View from './PUS11View';

const constants = require('constants');

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });

  return {
    serviceApid: _.getOr(null, 'serviceApid', data),
    spaceInNumberOfCommands: _.getOr(null, 'spaceInNumberOfCommands', data),
    scheduleStatus: constants.PUS_CONSTANTS.STATUS[_.getOr(200, 'scheduleStatus', data)],
    lastUpdateTimeScheduleStatus: String(_.getOr(null, 'lastUpdateTimeScheduleStatus', data)),
    lastUpdateModeScheduleStatus: constants.PUS_CONSTANTS.UPDATE_TYPE[_.getOr(200, 'lastUpdateModeScheduleStatus', data)],
    noFreeCommands: _.getOr(null, 'noFreeCommands', data),
    lastUpdateTimeNoFreeCommands: String(_.getOr(null, 'lastUpdateTimeNoFreeCommands', data)),
    lastUpdateModeNoFreeCommands: constants.PUS_CONSTANTS.UPDATE_TYPE[_.getOr(200, 'lastUpdateModeNoFreeCommands', data)],
    freeSpace: _.getOr(null, 'freeSpace', data),
    lastUpdateTimeFreeSpace: String(_.getOr(null, 'lastUpdateTimeFreeSpace', data)),
    lastUpdateModeFreeSpace: constants.PUS_CONSTANTS.UPDATE_TYPE[_.getOr(200, 'lastUpdateModeFreeSpace', data)],
    serviceApidName: _.getOr(null, 'serviceApidName', data),
  };
};

const PUS11ViewContainer = connect(mapStateToProps, null)(PUS11View);

PUS11ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS11ViewContainer;
