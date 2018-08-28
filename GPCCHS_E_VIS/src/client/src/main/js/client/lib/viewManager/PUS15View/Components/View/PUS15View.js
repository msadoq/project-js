import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import _ from 'lodash/fp';

import './PUS15View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import ApidsList from '../../../common/Components/View/PUS/ApidsList';


// ON BOARD STORAGES
const _onBoardStoragesStatusKeyList = ['storeStatus', 'downlinkStatus'];
// apply background color to cells for which value is ENABLED or DISABLED
const _onBoardStoragesOverrideStyle = tableOverrideStyle(_onBoardStoragesStatusKeyList);

const onBoardStoragesTooltips = {
  storeId: { mode: 'lastUpdateModeStoreId', time: 'lastUpdateTimeStoreId' },
  dumpEnabled: { mode: 'lastUpdateModeStoreId', time: 'lastUpdateTimeStoreId' },
  storageType: { mode: 'lastUpdateModeStoreType', time: 'lastUpdateTimeStoreType' },
  storeName: { mode: 'lastUpdateModeStoreType', time: 'lastUpdateTimeStoreId' },
  storeStatus: { mode: 'lastUpdateModeStoreStatus', time: 'lastUpdateTimeStoreStatus' },
  downlinkStatus: { mode: 'lastUpdateModeDownlinkStatus', time: 'lastUpdateTimeDownlinkStatus' },
};
const _onBoardStoragesModifier = tableModifier(onBoardStoragesTooltips);


// STORAGE DEFINITIONS
const storageDefTooltips = {
  serviceType: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  serviceSubType: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  sid: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  sidLabel: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  sidName: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  subsamplingRatio: { mode: 'lastUpdateModeSubSamplingRatio', time: 'lastUpdateTimeSubSamplingRatio' },
};
const _storageDefContentModifier = tableModifier(storageDefTooltips);

export default class PUS15View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS15ViewContainer mapStateToProps
    apids: PropTypes.arrayOf(PropTypes.shape()),
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
  };

  static defaultProps = {
    apids: [],
    data: {
      headers: [],
      tables: {},
    },
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      viewId,
      data,
      apids,
    } = this.props;


    return (
      <ErrorBoundary>
        <div className="pus15">
          {ApidsList(apids)}
          <div className="col-sm-12 h100">
            <div className="row tablesHeight">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'onBoardStorages'}
                data={_.getOr([], ['tables', 'onBoardStorages', 'data'], data)}
                contentModifier={_onBoardStoragesModifier}
                overrideStyle={_onBoardStoragesOverrideStyle}
              />
            </div>
            <div className="row tablesHeight">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'storageDef'}
                data={_.getOr([], ['tables', 'storageDef', 'data'], data)}
                contentModifier={_storageDefContentModifier}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export const renderInvald = error => (
  <div className="pus15 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
