import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { PUS_SERVICE_15 } from 'constants';
import PUS15View from './PUS15View';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { getPUSViewData } from '../../../common/pus/dataSelectors';
import parameters from '../../../../common/configurationManager';
import { injectTabularData } from '../../../commonData/reducer';
import { bindToBoolKey } from '../../../common/pus/utils';

const pusService = PUS_SERVICE_15;

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

    // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
    data = injectTabularData(
      data,
      'onBoardStorages',
      _.getOr([], ['dataForTables', 'pus015PacketStore'], data)
        .map(store => ({
          ..._.omit(['pus015Packet'], store),
          dumpEnabled: String(_.getOr('boolean', 'dumpEnabled', store)),
          downlinkStatus: statuses[String(_.getOr(200, 'downlinkStatus', store))],
          storeStatus: statuses[String(_.getOr(200, 'storeStatus', store))],
          lastUpdateModeStoreId: updateTypes[String(_.getOr(200, 'lastUpdateModeStoreId', store))],
          lastUpdateModeStoreType: updateTypes[String(_.getOr(200, 'lastUpdateModeStoreType', store))],
          lastUpdateModeStoreStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStoreStatus', store))],
          lastUpdateModeDownlinkStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeDownlinkStatus', store))],
        }))
    );

    data = injectTabularData(
      data,
      'storageDef',
      _.getOr([], ['dataForTables', 'pus015PacketStore'], data)
        .reduce((acc, store) => [...acc, ...store.pus015Packet], [])
        .map(packet => ({
          ...packet,
          ...bindToBoolKey(['isSubsamplingRatioSet', 'subsamplingRatio', 'lastUpdateModeSubSamplingRatio'], packet),
          lastUpdateModePacketId: updateTypes[String(_.getOr(200, 'lastUpdateModePacketId', packet))],
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

const PUS15ViewContainer = connect(mapStateToProps, null)(PUS15View);

PUS15ViewContainer.propTypes = { viewId: PropTypes.string.isRequired };

export default PUS15ViewContainer;
