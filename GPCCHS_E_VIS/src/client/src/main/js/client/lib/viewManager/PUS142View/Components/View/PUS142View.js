import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS142View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import ApidStatusHeader from '../../../common/Components/View/PUS/ApidStatusHeader';

// FUNCTIONAL MONITORING
const functionalMonitoringTooltips = {
  fmonId: { mode: 'lastUpdateModeFMonId', time: 'lastUpdateTimeFMonId' },
  fmonIdLabel: { mode: 'lastUpdateModeFMonId', time: 'lastUpdateTimeFMonId' },
  fmonName: { mode: 'lastUpdateModeFMonId', time: 'lastUpdateTimeFMonId' },
  status: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  checkingStatus: { mode: 'lastUpdateModeCheckingStatus', time: 'lastUpdateTimeCheckingStatus' },
  protectionStatus: { mode: 'lastUpdateModeProtectionStatus', time: 'lastUpdateTimeProtectionStatus' },
  rid: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  ridStatus: { mode: 'lastUpdateModeRidStatus', time: 'lastUpdateTimeRidStatus' },
  validityParameterId: { mode: 'lastUpdateModeValidParamId', time: 'lastUpdateTimeValidParamId' },
  validityParameterMask: { mode: 'lastUpdateModeValidParamMask', time: 'lastUpdateTimeValidParamMask' },
  validityParameterExpectedValue: { mode: 'lastUpdateModeValidParamExpectedValue', time: 'lastUpdateTimeValidParamExpectedValue' },
  actionStatus: { mode: 'lastUpdateModeActionStatus', time: 'lastUpdateTimeActionStatus' },
};
const _functionalMonitoringModifier = tableModifier(functionalMonitoringTooltips);

const _functionalMonitoringStatusKeyList = ['status', 'ridStatus', 'actionStatus'];
// apply background color to cells for which value is ENABLED or DISABLED
const _functionalMonitoringOverrideStyle = tableOverrideStyle(_functionalMonitoringStatusKeyList);

export default class PUS142View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS142ViewContainer mapStateToProps
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
  };

  static defaultProps = {
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
    } = this.props;

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return renderInvald('Please fill-in configuration');
    }

    const headers = data.headers.map(header =>
      (
        <div className="header">
          {renderHeader(header)}
        </div>
      ));

    return (
      <ErrorBoundary>
        <div className="pus142">
          <div className="headers">
            {headers}
          </div>
          <div className="col-sm-12">
            <div className="row tablesHeight">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'functionalMonitoring'}
                data={data.tables.functionalMonitoring.data}
                contentModifier={_functionalMonitoringModifier}
                overrideStyle={_functionalMonitoringOverrideStyle}
              />
            </div>
            <div className="row tablesHeight">
              <VirtualizedTableViewContainer
                viewId={viewId}
                data={data.tables.parameterMonitorings.data}
                tableId={'parameterMonitorings'}
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
  } = header;
  return (
    <ErrorBoundary>
      <ApidStatusHeader
        serviceApidName={serviceApidName}
        serviceApid={serviceApid}
        status={serviceStatus}
        lastUpdateMode={lastUpdateModeServiceStatus}
        lastUpdateTime={lastUpdateTimeServiceStatus}
        label="Service Status"
      />
    </ErrorBoundary>
  );
};


export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus142 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
