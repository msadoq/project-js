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
  const { colKey, value } = cellContent;
  if (typeof value === 'string' && value.length === 0) {
    return cellContent;
  }
  const tooltips = {
    monitoringId: { mode: 'lastUpdateModeMonId', time: 'lastUpdateTimeMonId' },
    parameterId: { mode: 'lastUpdateModeParamId', time: 'lastUpdateTimeParamId' },
    monitoringStatus: { mode: 'lastUpdateModeMonStatus', time: 'lastUpdateTimeMonStatus' },
    protectionStatus: { mode: 'lastUpdateModeProtectionStatus', time: 'lastUpdateTimeProtectionStatus' },
    monitoringInterval: { mode: 'lastUpdateModeMonInterval', time: 'lastUpdateTimeMonInterval' },
    repetitionNumber: { mode: 'lastUpdateModeRepetition', time: 'lastUpdateTimeRepetition' },
    checkType: { mode: 'lastUpdateModeCheckType', time: 'lastUpdateTimeCheckType' },
    validityParameterId: { mode: 'lastUpdateModeValParamId', time: 'lastUpdateTimeValParamId' },
    validityParameterMask: { mode: 'lastUpdateModeValParamMask', time: 'lastUpdateTimeValParamMask' },
    parameterCurrentValue: { mode: 'lastUpdateModeParamCurrentValue', time: 'lastUpdateTimeParamCurrentValue' },
    validityParameterExpectedValue: { mode: 'lastUpdateModeValParamExpectValue', time: 'lastUpdateTimeValParamExpectValue' },
    ridEL: { mode: 'lastUpdateModeRidEL', time: 'lastUpdateTimeRidEL' },
    ridLabelEL: { mode: 'lastUpdateModeRidEL', time: 'lastUpdateTimeRidEL' },
    ridStatusEL: { mode: 'lastUpdateModeRidStatusEL', time: 'lastUpdateTimeRidStatusEL' },
    actionStatusEL: { mode: 'lastUpdateModeActionStatusEL', time: 'lastUpdateTimeActionStatusEL' },
    maskEL: { mode: 'lastUpdateModeMaskEL', time: 'lastUpdateTimeMaskEL' },
    valueEL: { mode: 'lastUpdateModeValueEL', time: 'lastUpdateTimeValueEL' },
    ridH: { mode: 'lastUpdateModeRidH', time: 'lastUpdateTimeRidH' },
    ridLabelH: { mode: 'lastUpdateModeRidH', time: 'lastUpdateTimeRidH' },
    ridStatusH: { mode: 'lastUpdateModeRidStatusH', time: 'lastUpdateTimeRidStatusH' },
    actionStatusH: { mode: 'lastUpdateModeActionStatusH', time: 'lastUpdateTimeActionStatusH' },
    maskH: { mode: 'lastUpdateModeMaskH', time: 'lastUpdateTimeMaskH' },
    valueH: { mode: 'lastUpdateModeValueH', time: 'lastUpdateTimeValueH' },
  };
  const toolT = tooltips[colKey];
  if (toolT === undefined) {
    return cellContent;
  }
  return addTooltipWithContent(
    cellContent,
    content,
    {
      lastUpdateMode: {
        key: toolT.mode,
      },
      lastUpdateTime: {
        key: toolT.time,
        format: _formatDate,
      },
    }
  );
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
