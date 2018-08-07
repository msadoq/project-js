import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import './PUS11View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import HeaderStatus from '../../../common/Components/View/PUS/HeaderStatus';
import { createTableData } from '../../../common/pus/tooltip';

const popoverStyle = { height: 70 };

const subSchedulesTooltips = {
  ssId: { mode: 'lastUpdateModeSubScheduleId', time: 'lastUpdateTimeSubscheduleId' },
  ssIdLabel: { mode: 'lastUpdateModeSubScheduleId', time: 'lastUpdateTimeSubscheduleId' },
  status: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  executionTimeFirstTc: { mode: 'lastUpdateModeExecTimeFirstTc', time: 'lastUpdateTimeExecTimeFirstTc' },
};
const _subSchedulesContentModifier = tableModifier(subSchedulesTooltips);

const commandTooltips = {
  commandSsId: { mode: 'lastUpdateModeCommandId', time: 'lastUpdateTimeCommandId' },
  commandStatus: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  commandGroundStatus: { mode: 'lastUpdateModeGroundStatus', time: 'lastUpdateTimeGroundStatus' },
  currentExecutionTime: { mode: 'lastUpdateModeCurrentExecTime', time: 'lastUpdateTimeCurrentExecTime' },
  initialExecutionTime: { mode: 'lastUpdateModeInitialExecTime', time: 'lastUpdateTimeInitialExecTime' },
  totalTimeShiftOffset: { mode: 'lastUpdateModeTotalTimeShiftOffset', time: 'lastUpdateTimeTotalTimeShiftOffset' },
};
const _commandContentModifier = tableModifier(commandTooltips);

// SUB SCHEDULES
// apply background color to cells for which value is ENABLED or DISABLED
const _subSchedulesOverrideStyle = tableOverrideStyle(['status']);

// COMMANDS
const _commandsStatusKeyList = [
  'commandStatus',
];
// apply background color to cells for which value is ENABLED or DISABLED
const _commandsOverrideStyle = tableOverrideStyle(_commandsStatusKeyList);

export default class PUS11View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS11ViewContainer mapStateToProps
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
    onCommandCellDoubleClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    apids: [],
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
      apids,
      onCommandCellDoubleClick,
      data,
    } = this.props;

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return renderInvald('Please fill-in configuration');
    }

    const headers = data.headers.map((header) => {
      if (!isValid(apids, header.serviceApid)) {
        return renderInvald('Please fill-in configuration');
      }
      return (
        <div className="header">
          {renderHeaders(
            header.serviceApid,
            header.spaceInNumberOfCommands,
            header.scheduleStatus,
            header.lastUpdateTimeScheduleStatus,
            header.lastUpdateModeScheduleStatus,
            header.noFreeCommands,
            header.lastUpdateTimeNoFreeCommands,
            header.lastUpdateModeNoFreeCommands,
            header.freeSpace,
            header.lastUpdateTimeFreeSpace,
            header.lastUpdateModeFreeSpace,
            header.serviceApidName
          )}
        </div>
      );
    });

    return (
      <ErrorBoundary>
        <div className="pus11">
          {headers}
          <div className="col-sm-6">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'subSchedules'}
                data={data.tables.subSchedules.data}
                overrideStyle={_subSchedulesOverrideStyle}
                contentModifier={_subSchedulesContentModifier}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'enabledApids'}
                data={data.tables.enabledApids.data}
              />
            </div>
          </div>
          <div className="info col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'commands'}
                data={data.tables.commands.data}
                overrideStyle={_commandsOverrideStyle}
                contentModifier={_commandContentModifier}
                onCellDoubleClick={onCommandCellDoubleClick}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

/**
 * @param id
 * @param time
 * @param mode
 * @returns {*}
 */
export const generatePopover = (id, time, mode) => (
  <Popover
    id={id}
    placement="bottom"
    style={popoverStyle}
  >
    {createTableData({
      lastUpdateMode: mode,
      lastUpdateTime: time,
    })}
  </Popover>
);

const popoverTrigger = ['hover', 'focus']; // avoid creating a new object in render

export const renderHeaders = (
  serviceApid,
  spaceInNumberOfCommands,
  scheduleStatus,
  lastUpdateTimeScheduleStatus,
  lastUpdateModeScheduleStatus,
  noFreeCommands,
  lastUpdateTimeNoFreeCommands,
  lastUpdateModeNoFreeCommands,
  freeSpace,
  lastUpdateTimeFreeSpace,
  lastUpdateModeFreeSpace,
  serviceApidName
) => (
  <ErrorBoundary>
    <div className="info col-sm-4 pus11_ap">
      Application Process&nbsp;
      <input type="text" disabled value={serviceApidName} />&nbsp;
      <input className="mw50" type="text" disabled value={serviceApid} />
    </div>
    <HeaderStatus
      status={scheduleStatus}
      lastUpdateMode={lastUpdateModeScheduleStatus}
      lastUpdateTime={lastUpdateTimeScheduleStatus}
      label="Schedule Status"
    />
    <div className="info col-sm-4 pus11_as">
      <OverlayTrigger
        trigger={popoverTrigger}
        placement="bottom"
        overlay={generatePopover(
          'popover-commands',
          lastUpdateTimeNoFreeCommands,
          lastUpdateModeNoFreeCommands
        )}
      >
        <span>
          Available Space&nbsp;
          <input
            type="text"
            className="mw100"
            disabled
            value={spaceInNumberOfCommands ? noFreeCommands : freeSpace}
          />
          &nbsp;
          {spaceInNumberOfCommands ? 'commands' : 'bytes'}
        </span>
      </OverlayTrigger>
    </div>
  </ErrorBoundary>
);

export const isValid = (apids, applicationProcessId) =>
  Array.isArray(apids) && apids.length > 0 && typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus11 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
