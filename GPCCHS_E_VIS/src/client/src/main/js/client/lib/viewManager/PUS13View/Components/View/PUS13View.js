import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS13View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import HeaderStatus from '../../../common/Components/View/PUS/HeaderStatus';


const tooltips = {
  monitoringId: { mode: 'lastUpdateModeMonId', time: 'lastUpdateTimeMonId' },
  parameterId: { mode: 'lastUpdateModeParamId', time: 'lastUpdateTimeParamId' },
  monitoringStatus: { mode: 'lastUpdateModeMonStatus', time: 'lastUpdateTimeMonStatus' },
  protectionStatus: { mode: 'lastUpdateModeProtectionStatus', time: 'lastUpdateTimeProtectionStatus' },
  monitoringInterval: { mode: 'lastUpdateModeMonInterval', time: 'lastUpdateTimeMonInterval' },
  repetitionNumber: { mode: 'lastUpdateModeRepetition', time: 'lastUpdateTimeRepetition' },
  checkType: { mode: 'lastUpdateModeCheckType', time: 'lastUpdateTimeCheckTime' },
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

const _parameterMonitoringDefinitionsModifier =
  tableModifier(tooltips);

// const backgroundDisabled = { backgroundColor: '#e67e22' };
// const backgroundEnabled = { backgroundColor: '#2ecc71' };

// PARAMETER MONITORING MODIFIER
const statusKeyList = [
  'monitoringStatus', 'ridStatusEL', 'ridStatusH', 'actionStatusEL', 'actionStatusH',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _parameterMonitoringDefinitionsOverrideStyle =
  tableOverrideStyle(statusKeyList);


export default class PUS13View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS13ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
    noOfParameterMonitoringDefinition: PropTypes.number,
    serviceStatus: PropTypes.string,
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
        <div className="pus13">
          <div className="header">
            {renderHeaders(
              noOfParameterMonitoringDefinition,
              serviceStatus,
              lastUpdateModeServiceStatus,
              lastUpdateTimeServiceStatus,
              apids
            )}
          </div>
          <div className="col-sm-13">
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


export const renderHeaders = (
  noOfParameterMonitoringDefinition,
  serviceStatus,
  lastUpdateModeServiceStatus,
  lastUpdateTimeServiceStatus,
  apids
) => (
  <ErrorBoundary>
    <div className="info col-sm-4 pus13_ap">
      Application Process&nbsp;
      <input type="text" disabled value={apids[0].apidName} />&nbsp;
    </div>
    <HeaderStatus
      status={serviceStatus}
      lastUpdateMode={lastUpdateModeServiceStatus}
      lastUpdateTime={lastUpdateTimeServiceStatus}
      label="Service Satus"
      pusTag="13"
    />
    <div className="info col-sm-4 pus13_ap">
      Number Monitoring&nbsp;
      <input type="text" disabled value={noOfParameterMonitoringDefinition} />&nbsp;
    </div>
  </ErrorBoundary>
);


export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus13 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);