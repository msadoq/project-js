import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS14View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';


// PACKET FORWARDING
const _packetForwardingStatusKeyList = [
  'forwardingStatus',
  'forwardingStatusRidSid',
];
const packetForwardingOverrideStyle = tableOverrideStyle(_packetForwardingStatusKeyList);

const packetForwardingTooltips = {
  serviceSubType: { mode: 'lastUpdateModeTypeSubType', time: 'lastUpdateTimeSubscheduleId' },
  forwardingStatus: { mode: 'lastUpdateModeFwdStatus', time: 'lastUpdateTimeFwdStatus' },
  rid: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  ridLabel: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  sid: { mode: 'lastUpdateModeSid', time: 'lastUpdateTimeSid' },
  sidLabel: { mode: 'lastUpdateModeSid', time: 'lastUpdateTimeSid' },
  subsamplingRatio: { mode: 'lastUpdateModeSubSamplingRatio', time: 'lastUpdateTimeSubSamplingRatio' },
  forwardingStatusRidSid: { mode: 'lastUpdateModeFwdStatusTypeRidSid', time: 'lastUpdateTimeFwdStatusTypeRidSid' },
};
const packetForwardingContentModifier = tableModifier(packetForwardingTooltips);

export default class PUS14View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS14ViewContainer mapStateToProps
    serviceApid: PropTypes.number,
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
      viewId,
      apids,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus14">
          <div className="info col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'packetForwarding'}
                overrideStyle={packetForwardingOverrideStyle}
                contentModifier={packetForwardingContentModifier}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}


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
