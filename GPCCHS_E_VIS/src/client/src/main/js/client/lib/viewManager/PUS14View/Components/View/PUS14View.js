import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import _ from 'lodash/fp';
import VirtualizedTableViewContainer
from 'viewManager/common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from 'viewManager/common/pus/utils';
import ApidsList from 'viewManager/common/Components/View/PUS/ApidsList';

import './PUS14View.scss';

// PACKET FORWARDING
const _packetForwardingStatusKeyList = [
  'forwardingStatusTypeSubtype',
  'forwardingStatusRidSid',
];
const packetForwardingOverrideStyle = tableOverrideStyle(_packetForwardingStatusKeyList);

const packetForwardingTooltips = {
  serviceSubType: { mode: 'lastUpdateModeTypeSubType', time: 'lastUpdateTimeTypeSubType' },
  forwardingStatusTypeSubtype: { mode: 'lastUpdateModeFwdStatusTypeSubtype', time: 'lastUpdateTimeFwdStatusTypeSubtype' },
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

    return (
      <ErrorBoundary>
        <div className="pus14 h100">
          <div className="h15">
            {ApidsList(apids)}
          </div>
          <div className="info col-sm-12 h85">
            <div className="h100">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'packetForwarding'}
                data={_.getOr([], ['tables', 'packetForwarding', 'data'], data)}
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
