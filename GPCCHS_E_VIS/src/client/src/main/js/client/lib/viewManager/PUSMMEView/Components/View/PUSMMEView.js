/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import _ from 'lodash/fp';
import './PUSMMEView.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';

const _packetsStatusKeyList = [
  'status',
  'forwardingStatusTypeSubtype',
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
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
    onCommandCellDoubleClick: PropTypes.func.isRequired,
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
      onCommandCellDoubleClick,
    } = this.props;
    const headersData = _.getOr([], ['headers'], data);
    const defaultHeader = {
      noHkPackets: 0,
      noDiagPackets: 0,
    };
    const header = renderHeader(headersData.length > 0 ?
    _.head(headersData) : defaultHeader);
    return (
      <ErrorBoundary>
        <div className="pusmme">
          {header}
          <div className="container">
            <VirtualizedTableViewContainer
              viewId={viewId}
              tableId={'packets'}
              data={_.getOr([], ['tables', 'packets', 'data'], data)}
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

export const renderHeader = (header) => {
  const { noHkPackets, noDiagPackets } = header;
  return (
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
};
