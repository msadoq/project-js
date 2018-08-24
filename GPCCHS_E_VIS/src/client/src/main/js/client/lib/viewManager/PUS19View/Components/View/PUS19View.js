import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS19View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import ApidStatusHeader from '../../../common/Components/View/PUS/ApidStatusHeader';


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
          {renderHeaders(header)}
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

export const renderHeaders = (header) => {
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
  <div className="pus19 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
