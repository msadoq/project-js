import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS142View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';

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
        <div className="pus142">
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
                tableId={'functionalMonitoring'}
                contentModifier={_functionalMonitoringModifier}
                overrideStyle={_functionalMonitoringOverrideStyle}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'parameterMonitorings'}
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
    <div className="info col-sm-4 pus142_ap">
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
  <div className="pus142 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
