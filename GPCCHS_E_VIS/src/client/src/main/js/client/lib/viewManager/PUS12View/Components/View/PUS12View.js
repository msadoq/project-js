import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import './PUS12View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { addTooltipWithContent } from '../../../common/pus/tooltip';


// eslint-disable-next-line arrow-body-style
const _formatDate = (date) => {
  return (new Date(date)) > 0
    ? (new Date(date)).toISOString()
    : date
    ;
};
const _parameterMonitoringDefinitionsModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;
  switch (colKey) {
    case 'monitoringId':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeMonId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeMonId',
            format: _formatDate,
          },
        }
      );
    case 'monitoringIdLabel':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeMonId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeMonId',
            format: _formatDate,
          },
        }
      );
    case 'parameterId':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeParamId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeParamId',
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
            key: 'lastUpdateModeValParamId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValParamId',
            format: _formatDate,
          },
        }
      );
    case 'parameterCurrentValue':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeParamCurrentValue',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeParamCurrentValue',
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
            key: 'lastUpdateModeValParamExpectValue',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValParamExpectValue',
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
            key: 'lastUpdateModeValParamMask',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValParamMask',
            format: _formatDate,
          },
        }
      );
    case 'monitoringInterval':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeMonInterval',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeMonInterval',
            format: _formatDate,
          },
        }
      );
    case 'repetitionNumber':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRepetition',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRepetition',
            format: _formatDate,
          },
        }
      );
    case 'checkType':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeCheckType',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeCheckType',
            format: _formatDate,
          },
        }
      );
    case 'monitoringStatus':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeMonStatus',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeMonStatus',
            format: _formatDate,
          },
        }
      );
    case 'protectionStatus':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeProtectionStatus',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeProtectionStatus',
            format: _formatDate,
          },
        }
      );
    case 'ridEL':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRidEL',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRidEL',
            format: _formatDate,
          },
        }
      );
    case 'ridLabelEL':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRidEL',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRidEL',
            format: _formatDate,
          },
        }
      );
    case 'actionStatusEL':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeActionStatusEL',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeActionStatusEL',
            format: _formatDate,
          },
        }
      );
    case 'ridStatusEL':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRidStatusEL',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRidStatusEL',
            format: _formatDate,
          },
        }
      );
    case 'maskEL':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeMaskEL',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeMaskEL',
            format: _formatDate,
          },
        }
      );
    case 'valueEL':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeValueEL',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValueEL',
            format: _formatDate,
          },
        }
      );
    case 'ridH':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRidH',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRidH',
            format: _formatDate,
          },
        }
      );
    case 'ridLabelH':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRidH',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRidH',
            format: _formatDate,
          },
        }
      );
    case 'actionStatusH':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeActionStatusH',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeActionStatusH',
            format: _formatDate,
          },
        }
      );
    case 'ridStatusH':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeRidStatusH',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeRidStatusH',
            format: _formatDate,
          },
        }
      );
    case 'valueH':
      return addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeValueH',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeValueH',
            format: _formatDate,
          },
        }
      );
    default:
      return cellContent;
  }
};

const backgroundDisabled = { backgroundColor: '#e67e22' };
const backgroundEnabled = { backgroundColor: '#2ecc71' };

// PARAMETER MONITORING MODIFIER
const _parameterMonitoringDefinitionsStatusKeyList = [
  'monitoringStatus',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _parameterMonitoringDefinitionsOverrideStyle = ({ content }) => {
  const { value, colKey } = content;
  if (_parameterMonitoringDefinitionsStatusKeyList.indexOf(colKey) > -1) {
    if (value === 'DISABLED') {
      return backgroundDisabled;
    }
    if (value === 'ENABLED') {
      return backgroundEnabled;
    }
  }
  return {};
};

export default class PUS12View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS12ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
    noOfParameterMonitoringDefinition: PropTypes.number,
    serviceStatus: PropTypes.number,
    lastUpdateModeServiceStatus: PropTypes.string,
    lastUpdateTimeServiceStatus: PropTypes.string,
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
  };

  static defaultProps = {
    serviceApid: null,
    noOfParameterMonitoringDefinition: null,
    serviceStatus: null,
    lastUpdateModeServiceStatus: null,
    lastUpdateTimeServiceStatus: null,
    apids: [],
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      serviceApid,
      noOfParameterMonitoringDefinition,
      serviceStatus,
      lastUpdateModeServiceStatus,
      lastUpdateTimeServiceStatus,
      apids,
      viewId,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus12">
          <div className="header">
            {renderHeaders(
              noOfParameterMonitoringDefinition,
              serviceStatus,
              lastUpdateModeServiceStatus,
              lastUpdateTimeServiceStatus,
              apids
            )}
          </div>
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'parameterMonitoringDefinitions'}
                contentModifier={_parameterMonitoringDefinitionsModifier}
                overrideStyle={_parameterMonitoringDefinitionsOverrideStyle}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

const popoverStyle = {
  height: 80,
};

/**
 * @param id
 * @param title
 * @param time
 * @param mode
 * @returns {*}
 */

export const generatePopover = ({ id, title, time, mode }) => (
  <Popover
    id={id}
    placement="bottom"
    title={title}
    style={popoverStyle}
  >
    <div>Last update Time: {time}</div>
    <div>Last update mode: {mode}</div>
  </Popover>
);

generatePopover.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

const popoverTrigger = ['hover', 'focus']; // avoid creating a new object in render


export const renderHeaders = (
  noOfParameterMonitoringDefinition,
  serviceStatus,
  lastUpdateModeServiceStatus,
  lastUpdateTimeServiceStatus,
  apids
) => (
  <ErrorBoundary>
    <div className="info col-sm-4 pus12_ap">
      Application Process&nbsp;
      <input type="text" disabled value={apids[0].apidName} />&nbsp;
    </div>
    <div className="info col-sm-4 pus11_ss">
      <OverlayTrigger
        trigger={popoverTrigger}
        placement="bottom"
        overlay={generatePopover({
          id: 'popover-service-apid',
          title: 'Service Status',
          time: lastUpdateTimeServiceStatus,
          mode: lastUpdateModeServiceStatus,
        })}
      >
        <span>
          Service Status&nbsp;
          <input type="text" className="mw100" disabled value={serviceStatus} />
        </span>
      </OverlayTrigger>
      <span className="spacing" />
    </div>
    <div className="info col-sm-4 pus12_ap">
      Number Monitoring&nbsp;
      <input type="text" disabled value={noOfParameterMonitoringDefinition} />&nbsp;
    </div>
  </ErrorBoundary>
);

export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus12 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
