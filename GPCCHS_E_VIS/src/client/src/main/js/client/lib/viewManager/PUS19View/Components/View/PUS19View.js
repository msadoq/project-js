import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS19View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';


const onBoardStoragesTooltips = {
  storeId: { mode: 'lastUpdateModeStoreId', time: 'lastUpdateTimeStoreId' },
  storageType: { mode: 'lastUpdateModeStoreType', time: 'lastUpdateTimeStoreType' },
  status: { mode: 'lastUpdateModeStoreStatus', time: 'lastUpdateTimeStoreStatus' },
};
const _onBoardStoragesModifier = tableModifier(onBoardStoragesTooltips);

const storageDefTooltips = {
  packetType: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  subsamplingRatio: { mode: 'lastUpdateModeSubSamplingRatio', time: 'lastUpdateTimeSubSamplingRatio' },
};
const _storageDefContentModifier = tableModifier(storageDefTooltips);

// ON BOARD STORAGES
const _onBoardStoragesStatusKeyList = [
  'status',
];
// apply background color to cells for which value is ENABLED or DISABLED
const _onBoardStoragesOverrideStyle = tableOverrideStyle(_onBoardStoragesStatusKeyList);

// STORAGE DEFINITION
const _storageDefStatusKeyList = [
  'serviceType',
  'serviceSubType',
  'packetType',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _storageDefOverrideStyle = tableOverrideStyle(_storageDefStatusKeyList);

export default class PUS19View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS19ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
    serviceApidName: PropTypes.string,
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
  };

  static defaultProps = {
    serviceApid: null,
    serviceApidName: null,
    apids: [],
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      serviceApid,
      serviceApidName,
      apids,
      viewId,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus19">
          <div className="header">
            {renderHeaders(
              serviceApid,
              serviceApidName
            )}
          </div>
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'onBoardStorages'}
                contentModifier={_onBoardStoragesModifier}
                overrideStyle={_onBoardStoragesOverrideStyle}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'storageDef'}
                contentModifier={_storageDefContentModifier}
                overrideStyle={_storageDefOverrideStyle}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export const renderHeaders = (
  serviceApid,
  serviceApidName
) => (
  <ErrorBoundary>
    <div className="info col-sm-4 pus19_ap">
      Application Process&nbsp;
      <input type="text" disabled value={serviceApidName} />&nbsp;
      <input className="mw50" type="text" disabled value={serviceApid} />
    </div>
  </ErrorBoundary>
);

export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus19 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
