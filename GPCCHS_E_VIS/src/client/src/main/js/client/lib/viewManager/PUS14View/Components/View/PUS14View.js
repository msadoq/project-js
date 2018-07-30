import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS14View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { addTooltipWithContent } from '../../../common/pus/tooltip';
import { formatDate } from '../../../common/pus/utils';

const pus014TmPacketContentModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;

  switch (colKey) {
    case 'forwardingStatus':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeFwdStatus',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeFwdStatus',
            format: formatDate,
          },
        }
      );
    case 'rid':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRid',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRid',
            format: formatDate,
          },
        }
      );
    case 'sid':
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
    case 'sidLabel':
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
    case 'totalTimeShiftOffset':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeTotalModeShiftOffset',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeTotalTimeShiftOffset',
            format: formatDate,
          },
        }
      );
    default:
      return cellContent;
  }
};

const backgroundDisabled = { backgroundColor: '#e67e22' };
const backgroundEnabled = { backgroundColor: '#2ecc71' };
const emptyObject = {};

// ENABLED APIDS
const _enabledApidsStatusKeyList = [
  'status',
  'forwardingStatus',
];

// apply background color to cells for which value is ENABLED or DISABLED
export const pus014TmPacketOverrideStyle = ({ content }) => {
  const { value, colKey } = content;

  if (_enabledApidsStatusKeyList.indexOf(colKey) > -1) {
    if (value === 'DISABLED') {
      return backgroundDisabled;
    }

    if (value === 'ENABLED') {
      return backgroundEnabled;
    }
  }

  return emptyObject;
};

export default class PUS14View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS14ViewContainer mapStateToProps
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
      viewId,
      apids,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus14">
          <div className="header">
            {renderHeaders(
              serviceApid,
              serviceApidName
            )}
          </div>
          <div className="info col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'pus014TmPacket'}
                overrideStyle={pus014TmPacketOverrideStyle}
                contentModifier={pus014TmPacketContentModifier}
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
    <div className="info pus14_ap">
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
  <div className="pus14 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
