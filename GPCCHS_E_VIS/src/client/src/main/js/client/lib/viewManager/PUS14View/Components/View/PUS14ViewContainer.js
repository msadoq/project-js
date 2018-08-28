import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import parameters from 'common/configurationManager';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { PUS_SERVICE_14 } from 'constants';
import PUS14View from './PUS14View';
import { injectTabularData } from '../../../commonData/reducer';
import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';


const mapStateToProps = (state, { viewId }) => {
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;
  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_14 });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    data = injectTabularData(
      data,
      'packetForwarding',
      _.getOr([], ['dataForTables', 'pus014TmPacket'], data)
        .map(packet => ({
          ...packet,
          status: statuses[String(_.getOr(200, 'status', packet))],
          forwardingStatusTypeSubtype: statuses[String(_.getOr(200, 'forwardingStatusTypeSubtype', packet))],
          forwardingStatusRidSid: statuses[String(_.getOr(200, 'forwardingStatusRidSid', packet))],
          lastUpdateModeTypeSubType: updateTypes[String(_.getOr(200, 'lastUpdateModeTypeSubType', packet))],
          lastUpdateModeFwdStatusTypeSubtype: updateTypes[String(_.getOr(200, 'lastUpdateModeFwdStatusTypeSubtype', packet))],
          lastUpdateModeRid: updateTypes[String(_.getOr(200, 'lastUpdateModeRid', packet))],
          lastUpdateModeSid: updateTypes[String(_.getOr(200, 'lastUpdateModeSid', packet))],
          lastUpdateModeSubSamplingRatio: updateTypes[String(_.getOr(200, 'lastUpdateModeSubSamplingRatio', packet))],
          lastUpdateModeFwdStatusTypeRidSid: updateTypes[String(_.getOr(200, 'lastUpdateModeFwdStatusTypeRidSid', packet))],
        }))
    );

    data = _.omit(['dataForTables'], data);
  }
  const apids = _.get(
    ['connectedData', 'apids'],
    _.head(getConfigurationByViewId(state, { viewId }).entryPoints)
  );
  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    data,
    apids,
    windowId,
  };
};

const PUS14ViewContainer = connect(mapStateToProps, null)(PUS14View);

PUS14ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS14ViewContainer;
