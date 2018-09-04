import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import _ from 'lodash/fp';
import VirtualizedTableViewContainer
  from 'viewManager/common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from 'viewManager/common/pus/utils';
import ApidStatusHeader from 'viewManager/common/Components/View/PUS/ApidStatusHeader';
import ApidsList from 'viewManager/common/Components/View/PUS/ApidsList';

import './PUS19View.scss';

// EVENT ACTIONS
const eventActionsTooltips = {
  rid: { mode: 'lastUpdateModeEventActionRid', time: 'lastUpdateTimeEventActionRid' },
  ridLabel: { mode: 'lastUpdateModeEventActionRid', time: 'lastUpdateTimeEventActionRid' },
  actionStatus: { mode: 'lastUpdateModeActionStatus', time: 'lastUpdateTimeActionStatus' },
  actionTcPacket: { mode: 'lastUpdateModeActionTc', time: 'lastUpdateTimeActionTc' },
};
const _eventActionsModifier = tableModifier(eventActionsTooltips);

// apply background color to cells for which value is ENABLED or DISABLED
const _eventActionsOverrideStyle = tableOverrideStyle(['actionStatus']);

export default class PUS19View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS19ViewContainer mapStateToProps
    apids: PropTypes.arrayOf(PropTypes.shape()),
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
    onEventCellDoubleClick: PropTypes.func.isRequired,
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
      onEventCellDoubleClick,
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
        <div className="pus19">
          {headers}
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'eventActions'}
                data={_.getOr([], ['tables', 'eventActions', 'data'], data)}
                contentModifier={_eventActionsModifier}
                overrideStyle={_eventActionsOverrideStyle}
                onCellDoubleClick={onEventCellDoubleClick}
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

