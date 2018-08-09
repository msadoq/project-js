/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUSMMEView.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { addTooltipWithContent } from '../../../common/pus/tooltip';

import styles from './PUSMMEView.css';
import { formatDate } from '../../../common/pus/utils';

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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
            format: formatDate,
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
    noHkPackets: PropTypes.number,
    noDiagPackets: PropTypes.number,
    domain: PropTypes.string,
    timeline: PropTypes.string,
    onCommandCellDoubleClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    noHkPackets: 0,
    noDiagPackets: 0,
    domain: null,
    timeline: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      viewId,
      noHkPackets,
      noDiagPackets,
      domain,
      timeline,
      onCommandCellDoubleClick,
    } = this.props;

    if (!isValid(timeline, domain)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pusmme">
          {renderHeaders(
            noHkPackets,
            noDiagPackets
          )}
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
  noHkPackets,
  noDiagPackets
) => (
  <ErrorBoundary>
    <div className="header m10 jcsb">
      <div>
        Hk Packets&nbsp;<input type="text" disabled value={noHkPackets} />
      </div>
      <div>
        Diag Packets&nbsp;<input type="text" disabled value={noDiagPackets} />
      </div>
    </div>
  </ErrorBoundary>
);

export const isValid = (domain, timeline) =>
  domain && domain.length > 0 && timeline && timeline.length > 0
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
