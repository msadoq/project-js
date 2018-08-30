import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import parameters from 'common/configurationManager';
import { getWindowIdByViewId } from 'store/selectors/windows';
import { getConfigurationByViewId } from 'viewManager/selectors';
import { injectTabularData } from 'viewManager/commonData/reducer';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { bindToBoolKey } from 'viewManager/common/pus/utils';

import { PUS_SERVICE_15 } from 'constants';
import PUS15View from './PUS15View';

const mapStateToProps = (state, { viewId }) => {
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_15 });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
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
      _.uniqBy(
        'uniqueId',
        _.getOr([], ['dataForTables', 'pus015PacketStore'], data)
          .reduce((acc, store) => [
            ...acc,
            ...store.pus015Packet.map(
              packet => _.assign(packet, { storeId: store.storeId })
            )], [])
      ).map(packet => ({
        ...packet,
        ...bindToBoolKey(['isSubsamplingRatioSet', 'subsamplingRatio', 'lastUpdateModeSubSamplingRatio'], packet),
        lastUpdateModePacketId: updateTypes[String(_.getOr(200, 'lastUpdateModePacketId', packet))],
      }))
    );

    data = _.omit(['dataForTables'], data);
  }

  const apids = _.getOr(
    [],
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

const PUS15ViewContainer = connect(mapStateToProps, null)(PUS15View);

PUS15ViewContainer.propTypes = { viewId: PropTypes.string.isRequired };

export default PUS15ViewContainer;
