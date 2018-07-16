import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS15View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { addTooltipWithContent } from '../../../common/pus/tooltip';


const _formatDate = date => (new Date(date)).toISOString();

const _onBoardStoragesModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;

  switch (colKey) {
    case 'storeId':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeStoreId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeStoreId',
            format: _formatDate,
          },
        }
      );
    case 'storageType':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeStoreType',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeStoreType',
            format: _formatDate,
          },
        }
      );
    case 'status':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeStoreStatus',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeStoreStatus',
            format: _formatDate,
          },
        }
      );
    default:
      return cellContent;
  }
};
const _storageDefContentModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;

  switch (colKey) {
    case 'packetType': {
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModePacketId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimePacketId',
            format: _formatDate,
          },
        }
      );
    }
    case 'subsamplingRatio': {
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeSubSamplingRatio',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeSubSamplingRatio',
            format: _formatDate,
          },
        }
      );
    }
    default: {
      return cellContent;
    }
  }
};

const backgroundDisabled = { backgroundColor: '#e67e22' };
const backgroundEnabled = { backgroundColor: '#2ecc71' };

// ON BOARD STORAGES
const _onBoardStoragesStatusKeyList = [
  'status',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _onBoardStoragesOverrideStyle = ({ content }) => {
  const { value, colKey } = content;
  if (_onBoardStoragesStatusKeyList.indexOf(colKey) > -1) {
    if (value === 'DISABLED') {
      return backgroundDisabled;
    }
    if (value === 'ENABLED') {
      return backgroundEnabled;
    }
  }
  return {};
};

// STORAGE DEFINITION
const _storageDefStatusKeyList = [
  'serviceType',
  'serviceSubType',
  'packetType',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _storageDefOverrideStyle = ({ content }) => {
  const { value, colKey } = content;
  if (_storageDefStatusKeyList.indexOf(colKey) > -1) {
    if (value === 'DISABLED') {
      return backgroundDisabled;
    }
    if (value === 'ENABLED') {
      return backgroundEnabled;
    }
  }
  return {};
};

export default class PUS15View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS15ViewContainer mapStateToProps
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
        <div className="pus15">
          <div className="header">
            {renderHeaders(
              serviceApid,
              serviceApidName
            )}
          </div>
          <div className="col-sm-6">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'onBoardStorages'}
                contentModifier={_onBoardStoragesModifier}
                overrideStyle={_onBoardStoragesOverrideStyle}
              />
            </div>
          </div>
          <div className="col-sm-6">
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
    <div className="info col-sm-4 pus15_ap">
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
  <div className="pus15 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
