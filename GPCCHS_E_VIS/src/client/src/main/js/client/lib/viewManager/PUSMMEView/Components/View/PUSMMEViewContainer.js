import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { PUS_SERVICE_MME } from 'constants';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { open as openModal } from 'store/actions/modals';
import PUSMMEView from './PUSMMEView';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { injectTabularData } from '../../../commonData/reducer';
import parameters from '../../../../common/configurationManager';


const mapStateToProps = (state, { viewId }) => {
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_MME });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    for (let i = 0; i < data.headers.length; i += 1) {
      data.headers[i].noHkPackets = _.getOr(null, 'noHkPackets', data.headers[i]);
      data.headers[i].noDiagPackets = _.getOr(null, 'noDiagPackets', data.headers[i]);
    }

    data = injectTabularData(
      data,
      'packets',
      _.getOr([], ['dataForTables', 'pusMmePacket'], data)
        .map(packet => ({
          ...packet,
          status: statuses[String(_.getOr(200, 'status', packet))],
          forwardingStatus: statuses[String(_.getOr(200, 'forwardingStatus', packet))],
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
    noHkPackets: _.getOr(null, 'noHkPackets', data),
    noDiagPackets: _.getOr(null, 'noDiagPackets', data),
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

export default PUSMMEViewContainer;
