import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUSMMEView.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { addTooltipWithContent } from '../../../common/pus/tooltip';

import styles from './PUSMMEView.css';

// eslint-disable-next-line arrow-body-style
const _formatDate = (date) => {
  return (new Date(date)) > 0
    ? (new Date(date)).toISOString()
    : date
    ;
};

const _packetsContentModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;

  switch (colKey) {
    case 'apid':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeSid',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeSid',
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
            key: 'lastUpdateModeStatus',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeStatus',
            format: _formatDate,
          },
        }
      );
    case 'validityParameterId':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeValidParamId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValidParamId',
            format: _formatDate,
          },
        }
      );
    case 'validityParameterMask':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeValidParamMask',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValidParamMask',
            format: _formatDate,
          },
        }
      );
    case 'validityParameterExpectedValue':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeValidParamExpValue',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValidParamExpValue',
            format: _formatDate,
          },
        }
      );
    case 'collectionInterval':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeCollectInterval',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeCollectInterval',
            format: _formatDate,
          },
        }
      );
    case 'generationMode':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeGenMode',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeGenMode',
            format: _formatDate,
          },
        }
      );
    case 'forwardingStatusTypeSubtype':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeFwdStatusTypeSubtype',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeFwdStatusTypeSubtype',
            format: _formatDate,
          },
        }
      );
    case 'forwardingStatusRidSid':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeFwdStatusTypeRidSid',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeFwdStatusTypeRidSid',
            format: _formatDate,
          },
        }
      );
    case 'subsamplingRatio':
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
    default:
      return cellContent;
  }
};

export default class PUSMMEView extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    serviceApid: PropTypes.number,
    serviceApidName: PropTypes.string,
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
    onCommandCellDoubleClick: PropTypes.func.isRequired,
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
      viewId,
      serviceApid,
      serviceApidName,
      apids,
      onCommandCellDoubleClick,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pusmme">
          <div className="header">
            {renderHeaders(
              serviceApid,
              serviceApidName
            )}
          </div>
          <div className={styles.container}>
            <VirtualizedTableViewContainer
              viewId={viewId}
              tableId={'packets'}
              contentModifier={_packetsContentModifier}
              onCellDoubleClick={onCommandCellDoubleClick}
            />
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
    <div className={styles.header}>
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
  <div className="pusmme h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
