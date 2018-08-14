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
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
  };

  static defaultProps = {
    data: {
      headers: [],
      data: {},
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

    return (
      <ErrorBoundary>
        <div className="pus14">
          <div className="info col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'packetForwarding'}
                data={data.tables.pus014TmPacket.data}
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
