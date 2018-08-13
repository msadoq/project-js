/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUSMMEView.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';

const _packetsStatusKeyList = [
  'status',
  'forwardingStatus',
  'forwardingStatusRidSid',
];
const packetsOverrideStyle = tableOverrideStyle(_packetsStatusKeyList);

const packetForwardingTooltips = {
  sid: { mode: 'lastUpdateModeSid', time: 'lastUpdateTimeSid' },
  sidLabel: { mode: 'lastUpdateModeSid', time: 'lastUpdateTimeSid' },
  status: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  validityParameterId: { mode: 'lastUpdateModeValidParamId', time: 'lastUpdateTimeValidParamId' },
  validityParameterMask: { mode: 'lastUpdateModeValidParamMask', time: 'lastUpdateTimeValidParamMask' },
  validityParameterExpectedValue: { mode: 'lastUpdateModeValidParamExpValue', time: 'lastUpdateTimeValidParamExpValue' },
  collectionInterval: { mode: 'lastUpdateModeCollectInterval', time: 'lastUpdateTimeCollectInterval' },
  forwardingStatusTypeSubtype: { mode: 'lastUpdateModeFwdStatusTypeSubtype', time: 'lastUpdateTimeFwdStatusTypeSubtype' },
  serviceSubType: { mode: 'lastUpdateModeTypeSubType', time: 'lastUpdateTimeSubscheduleId' },
  forwardingStatus: { mode: 'lastUpdateModeFwdStatus', time: 'lastUpdateTimeFwdStatus' },
  forwardingStatusRidSid: { mode: 'lastUpdateTimeFwdStatusTypeRidSid', time: 'lastUpdateTimeFwdStatusTypeRidSid' },
  subsamplingRatio: { mode: 'lastUpdateModeSubSamplingRatio', time: 'lastUpdateTimeSubSamplingRatio' },
  generationMode: { mode: 'lastUpdateModeGenMode', time: 'lastUpdateTimeGenMode' },
};
const packetsContentModifier = tableModifier(packetForwardingTooltips);

export default class PUSMMEView extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    noHkPackets: PropTypes.number,
    noDiagPackets: PropTypes.number,
    onCommandCellDoubleClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    noHkPackets: 0,
    noDiagPackets: 0,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      viewId,
      noHkPackets,
      noDiagPackets,
      onCommandCellDoubleClick,
    } = this.props;

    return (
      <ErrorBoundary>
        <div className="pusmme">
          {renderHeaders(noHkPackets, noDiagPackets)}
          <div className="container">
            <VirtualizedTableViewContainer
              viewId={viewId}
              tableId={'packets'}
              overrideStyle={packetsOverrideStyle}
              contentModifier={packetsContentModifier}
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
