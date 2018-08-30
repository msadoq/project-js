import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import parameters from 'common/configurationManager';
import { open as openModal } from 'store/actions/modals';
import { getWindowIdByViewId } from 'store/selectors/windows';
import { getConfigurationByViewId } from 'viewManager/selectors';
import { injectTabularData } from 'viewManager/commonData/reducer';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';

import { PUS_SERVICE_MME } from 'constants';
import PUSMMEView from './PUSMMEView';


const mapStateToProps = (state, { viewId }) => {
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_MME });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    data = injectTabularData(
      data,
      'packets',
      _.getOr([], ['dataForTables', 'pusMmePacket'], data)
        .map(packet => ({
          ...packet,
          status: statuses[String(_.getOr(200, 'status', packet))],
          forwardingStatusTypeSubtype: statuses[String(_.getOr(200, 'forwardingStatusTypeSubtype', packet))],
          forwardingStatusRidSid: statuses[String(_.getOr(200, 'forwardingStatusRidSid', packet))],
          lastUpdateModeSid: updateTypes[String(_.getOr(200, 'lastUpdateModeSid', packet))],
          lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', packet))],
          lastUpdateModeValidParamId: updateTypes[String(_.getOr(200, 'lastUpdateModeValidParamId', packet))],
          lastUpdateModeValidParamMask: updateTypes[String(_.getOr(200, 'lastUpdateModeValidParamMask', packet))],
          lastUpdateModeValidParamExpValue: updateTypes[String(_.getOr(200, 'lastUpdateModeValidParamExpValue', packet))],
          lastUpdateModeCollectInterval: updateTypes[String(_.getOr(200, 'lastUpdateModeCollectInterval', packet))],
          lastUpdateModeFwdStatusTypeSubtype: updateTypes[String(_.getOr(200, 'lastUpdateModeFwdStatusTypeSubtype', packet))],
          lastUpdateModeTypeSubType: updateTypes[String(_.getOr(200, 'lastUpdateModeTypeSubType', packet))],
          lastUpdateModeFwdStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeFwdStatus', packet))],
          lastUpdateTimeFwdStatusTypeRidSid: updateTypes[String(_.getOr(200, 'lastUpdateTimeFwdStatusTypeRidSid', packet))],
          lastUpdateModeSubSamplingRatio: updateTypes[String(_.getOr(200, 'lastUpdateModeSubSamplingRatio', packet))],
          lastUpdateModeGenMode: updateTypes[String(_.getOr(200, 'lastUpdateModeGenMode', packet))],
        }))
    );

    data = _.omit(['dataForTables'], data);
  }

  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  const packetsData = _.get(
    ['tables', 'packets'],
    data
  );

  return {
    data,
    domain: _.getOr(null, ['entryPoints', 0, 'connectedData', 'domain'], config),
    timeline: _.getOr(null, ['entryPoints', 0, 'connectedData', 'timeline'], config),
    packetsData,
    windowId,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onCommandCellDoubleClick: (windowId, packetStore, packetParameter) => {
    dispatch(
      openModal(
        windowId,
        {
          type: 'pusMmeModal',
          title: 'Details for Packet',
          viewId,
          packetStore,
          packetParameter,
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
    const { packetsData } = stateProps;

    const data = packetsData.data[rowIndex];

    // extract modal data
    const {
      pusMmePacketStore,
      pusMmePacketParameter,
    } = data;

    dispatchProps.onCommandCellDoubleClick(
      stateProps.windowId,
      pusMmePacketStore,
      pusMmePacketParameter
    );
  },
});

const PUSMMEViewContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PUSMMEView);

PUSMMEViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PUSMMEViewContainer;
