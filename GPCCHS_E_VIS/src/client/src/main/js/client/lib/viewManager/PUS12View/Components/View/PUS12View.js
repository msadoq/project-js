import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import _ from 'lodash/fp';
import VirtualizedTableViewContainer
  from 'viewManager/common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from 'viewManager/common/pus/utils';
import ApidStatusHeader from 'viewManager/common/Components/View/PUS/ApidStatusHeader';
import ApidsList from 'viewManager/common/Components/View/PUS/ApidsList';

import './PUS12View.scss';

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

const _parameterMonitoringDefinitionsModifier = tableModifier(tooltips);

// PARAMETER MONITORING MODIFIER
const statusKeyList = [
  'monitoringStatus', 'ridStatusEL', 'ridStatusH', 'actionStatusEL', 'actionStatusH',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _parameterMonitoringDefinitionsOverrideStyle =
  tableOverrideStyle(statusKeyList);


export default class PUS12View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS12ViewContainer mapStateToProps
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

    const headersData = _.getOr([], ['headers'], data);
    const headers = headersData.length > 0 ?
    headersData.map(header => (
      <div key={header.serviceApid} className="header row">
        {renderHeader(header)}
      </div>
    )) : ApidsList(apids);

    return (
      <ErrorBoundary>
        <div className="pus12">
          {headers}
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'parameterMonitoringDefinitions'}
                data={_.getOr([], ['tables', 'parameterMonitoringDefinitions', 'data'], data)}
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


export const renderHeader = (header) => {
  const {
    serviceApid,
    serviceApidName,
    serviceStatus,
    lastUpdateModeServiceStatus,
    lastUpdateTimeServiceStatus,
    noOfParameterMonitoringDefinition,
  } = header;

  return (
    <ErrorBoundary>
      <ApidStatusHeader
        serviceApidName={serviceApidName}
        serviceApid={serviceApid}
        status={serviceStatus}
        lastUpdateMode={lastUpdateModeServiceStatus}
        lastUpdateTime={lastUpdateTimeServiceStatus}
        label="Service Satus"
      />
      <div className="info col-sm-4 pus12_as">
        Number Monitoring&nbsp;
        <input type="text" disabled value={noOfParameterMonitoringDefinition} />&nbsp;
      </div>
    </ErrorBoundary>
  );
};


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
