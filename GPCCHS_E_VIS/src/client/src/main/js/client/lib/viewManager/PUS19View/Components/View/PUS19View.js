import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS19View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import HeaderStatus from '../../../common/Components/View/PUS/HeaderStatus';


// EVENT ACTIONS
const eventActionsTooltips = {
  rid: { mode: 'lastUpdateModeEventActionRid', time: 'lastUpdateTimeEventActionRid' },
  ridLabel: { mode: 'lastUpdateModeEventActionRid', time: 'lastUpdateTimeEventActionRid' },
  actionStatus: { mode: 'lastUpdateModeActionStatus', time: 'lastUpdateTimeActionStatus' },
  actionTcPacket: { mode: 'lastUpdateModeActionTc', time: 'lastUpdateTimeActionTc' },
};
const _eventActionsModifier = tableModifier(eventActionsTooltips);

const _eventActionsStatusKeyList = [
  'actionStatus',
];
// apply background color to cells for which value is ENABLED or DISABLED
const _eventActionsOverrideStyle = tableOverrideStyle(_eventActionsStatusKeyList);

export default class PUS19View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS19ViewContainer mapStateToProps
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
      onCommandCellDoubleClick,
      data,
    } = this.props;

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return renderInvald('Please fill-in configuration');
    }

    const headers = data.headers.map(header =>
      (
        <div className="header">
          {renderHeaders(
            header.serviceApidName,
            header.serviceApid,
            header.serviceStatus,
            header.lastUpdateModeServiceStatus,
            header.lastUpdateTimeServiceStatus
          )}
        </div>
      ));

    return (
      <ErrorBoundary>
        <div className="pus19">
          {headers}
          <div className="col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'eventActions'}
                data={data.tables.eventActions.data}
                contentModifier={_eventActionsModifier}
                overrideStyle={_eventActionsOverrideStyle}
                onCellDoubleClick={onCommandCellDoubleClick}
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
  serviceApidName,
  serviceStatus,
  lastUpdateModeServiceStatus,
  lastUpdateTimeServiceStatus
) => (
  <ErrorBoundary>
    <div className="info col-sm-4 pus19_ap">
      Application Process&nbsp;
      <input type="text" disabled value={serviceApidName} />&nbsp;
      <input className="mw50" type="text" disabled value={serviceApid} />
    </div>
    <HeaderStatus
      status={serviceStatus}
      lastUpdateMode={lastUpdateModeServiceStatus}
      lastUpdateTime={lastUpdateTimeServiceStatus}
      label="Service Status"
    />
  </ErrorBoundary>
);

export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus19 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
