import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS05View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';


// ON-BOARD EVENTS
const onBoardEventsTooltips = {
  rid: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  ridLabel: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  reportName: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  onBoardStatus: { mode: 'lastUpdateModeOnBoardStatus', time: 'lastUpdateTimeOnBoardStatus' },
  reportShortDescription: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  defaultOnBoardStatus: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  alarmLevel: { mode: 'lastUpdateModeAlarmLevel', time: 'lastUpdateTimeAlarmLevel' },
  actionName: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
  reportLongDescription: { mode: 'lastUpdateModeRid', time: 'lastUpdateTimeRid' },
};
const _onBoardEventsContentModifier = tableModifier(onBoardEventsTooltips);

const _onBoardEventsOverrideStyle = tableOverrideStyle(['onBoardStatus', 'defaultOnBoardStatus']);

// RECEIVED ON-BOARD EVENT

export default class PUS05View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS05ViewContainer mapStateToProps
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
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
    } = this.props;

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus05">
          <div className="col-sm-6">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'onBoardEvents'}
                data={data.tables.onBoardEvents.data}
                overrideStyle={_onBoardEventsOverrideStyle}
                contentModifier={_onBoardEventsContentModifier}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'received'}
                data={data.tables.received.data}
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
  <div className="pus05 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
