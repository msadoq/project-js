import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { PUS_SERVICE_14 } from 'constants';
import parameters from 'common/configurationManager';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import PUS14View from './PUS14View';
import { injectTabularData } from '../../../commonData/reducer';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const pusService = PUS_SERVICE_14;

const mapStateToProps = (state, { viewId }) => {
  let data = getPUSViewData(state, { viewId, pusService });
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    for (let i = 0; i < data.headers.length; i += 1) {
      data.headers[i].status = statuses[_.getOr(200, 'status', data.headers[i])];
      data.headers[i].serviceApid = _.getOr(null, 'serviceApid', data.headers[i]);
      data.headers[i].serviceApidName = _.getOr(null, 'serviceApidName', data.headers[i]);
      data.headers[i].uniqueId = _.getOr(null, 'uniqueId', data.headers[i]);
    }

    data = injectTabularData(
      data,
      'pus014TmPacket',
      _.getOr([], ['dataForTables', 'pus014TmPacket'], data)
        .map(packet => ({
          ...packet,
          status: statuses[String(_.getOr(200, 'status', packet))],
          forwardingStatusTypeSubtype: statuses[String(_.getOr(200, 'forwardingStatusTypeSubtype', packet))],
          forwardingStatusRidSid: statuses[String(_.getOr(200, 'forwardingStatusRidSid', packet))],
          lastUpdateModeTypeSubType: updateTypes[String(_.getOr(200, 'lastUpdateModeTypeSubType', packet))],
          lastUpdateModeFwdStatusTypeSubType: updateTypes[String(_.getOr(200, 'lastUpdateModeFwdStatusTypeSubType', packet))],
          lastUpdateModeRid: updateTypes[String(_.getOr(200, 'lastUpdateModeRid', packet))],
          lastUpdateModeSid: updateTypes[String(_.getOr(200, 'lastUpdateModeSid', packet))],
          lastUpdateModeSubSamplingRatio: updateTypes[String(_.getOr(200, 'lastUpdateModeSubSamplingRatio', packet))],
          lastUpdateModeFwdStatusTypeRidSid: updateTypes[String(_.getOr(200, 'lastUpdateModeFwdStatusTypeRidSid', packet))],
        }))
    );

    data = _.omit(['dataForTables'], data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    data,
    windowId,
  };
};

const PUS14ViewContainer = connect(mapStateToProps, null)(PUS14View);

PUS14ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS14ViewContainer;
