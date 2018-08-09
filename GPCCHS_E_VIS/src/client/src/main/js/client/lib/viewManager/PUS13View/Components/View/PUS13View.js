import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS13View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableModifier } from '../../../common/pus/utils';
import HeaderStatus from '../../../common/Components/View/PUS/HeaderStatus';


// UP&DOWN LINK MODIFIER
const tooltips = {
  duId: { mode: 'lastUpdateModeLduId', time: 'lastUpdateTimeLduId' },
  status: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  transferType: { mode: 'lastUpdateModeLduId', time: 'lastUpdateTimeLduId' },
  startTime: { mode: 'lastUpdateModeStartTime', time: 'lastUpdateTimeStartTime' },
  endTime: { mode: 'lastUpdateModeEndTime', time: 'lastUpdateTimeEndTime' },
  size: { mode: 'lastUpdateModeSize', time: 'lastUpdateTimeSize' },
  remainingSize: { mode: 'lastUpdateModeRemainSize', time: 'lastUpdateTimeRemainSize' },
  percent: { mode: 'lastUpdateModePercent', time: 'lastUpdateTimePercent' },
  failureCode: { mode: 'lastUpdateModeFailureCode', time: 'lastUpdateTimeFailureCode' },
  fileChecksum: { mode: 'lastUpdateModeFileChecksum', time: 'lastUpdateTimeFileChecksum' },
};

const _linkModifier = tableModifier(tooltips);


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
          <div className="col-sm-12">
            <div className="row">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'uplink'}
                contentModifier={_linkModifier}
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="row">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'downlink'}
                contentModifier={_linkModifier}
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
