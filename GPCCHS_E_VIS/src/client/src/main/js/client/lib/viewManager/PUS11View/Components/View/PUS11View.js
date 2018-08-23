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

// SUB SCHEDULES
const subSchedulesTooltips = {
  ssId: { mode: 'lastUpdateModeSubScheduleId', time: 'lastUpdateTimeSubscheduleId' },
  ssIdLabel: { mode: 'lastUpdateModeSubScheduleId', time: 'lastUpdateTimeSubscheduleId' },
  status: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  executionTimeFirstTc: { mode: 'lastUpdateModeExecTimeFirstTc', time: 'lastUpdateTimeExecTimeFirstTc' },
};
const _subSchedulesContentModifier = tableModifier(subSchedulesTooltips);

// apply background color to cells for which value is ENABLED or DISABLED
const _subSchedulesOverrideStyle = tableOverrideStyle(['status']);


// COMMANDS
const commandTooltips = {
  commandSsId: { mode: 'lastUpdateModeCommandId', time: 'lastUpdateTimeCommandId' },
  commandName: { mode: 'lastUpdateModeCommandId', time: 'lastUpdateTimeCommandId' },
  commandDescription: { mode: 'lastUpdateModeCommandId', time: 'lastUpdateTimeCommandId' },
  commandSequenceCount: { mode: 'lastUpdateModeCommandId', time: 'lastUpdateTimeCommandId' },
  commandSourceId: { mode: 'lastUpdateModeCommandId', time: 'lastUpdateTimeCommandId' },
  commandStatus: { mode: 'lastUpdateModeStatus', time: 'lastUpdateTimeStatus' },
  commandGroundStatus: { mode: 'lastUpdateModeGroundStatus', time: 'lastUpdateTimeGroundStatus' },
  initialExecutionTime: { mode: 'lastUpdateModeInitialExecTime', time: 'lastUpdateTimeInitialExecTime' },
  currentExecutionTime: { mode: 'lastUpdateModeCurrentExecTime', time: 'lastUpdateTimeCurrentExecTime' },
  totalTimeShiftOffset: { mode: 'lastUpdateModeTotalTimeShiftOffset', time: 'lastUpdateTimeTotalTimeShiftOffset' },
};
const _commandContentModifier = tableModifier(commandTooltips);

// apply background color to cells for which value is ENABLED or DISABLED
const _commandsOverrideStyle = tableOverrideStyle(['commandStatus']);

export default class PUS11View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS11ViewContainer mapStateToProps
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
      // apids,
      onCommandCellDoubleClick,
      data,
    } = this.props;

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return renderInvald('Please fill-in configuration');
    }

    const headers = data.headers.map(header =>
      (
        <div className="header">
          {renderHeader(header)}
        </div>
      ));

    return (
      <ErrorBoundary>
        <div className="pus11">
          {headers}
          <div className="info col-sm-12 h100">
            <div className="row small">
              <div className="col-sm-6 h100">
                <VirtualizedTableViewContainer
                  viewId={viewId}
                  tableId={'subSchedules'}
                  data={data.tables.subSchedules.data}
                  overrideStyle={_subSchedulesOverrideStyle}
                  contentModifier={_subSchedulesContentModifier}
                />
              </div>
              <div className="col-sm-6 h100">
                <VirtualizedTableViewContainer
                  viewId={viewId}
                  tableId={'enabledApids'}
                  data={data.tables.enabledApids.data}
                />
              </div>
            </div>
            <div className="row main">
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

export const renderHeader = (header) => {
  const {
    serviceApid,
    serviceApidName,
    scheduleStatus,
    lastUpdateTimeScheduleStatus,
    lastUpdateModeScheduleStatus,
    spaceInNumberOfCommands,
    noFreeCommands,
    lastUpdateTimeNoFreeCommands,
    lastUpdateModeNoFreeCommands,
    freeSpace,
    lastUpdateTimeFreeSpace,
    lastUpdateModeFreeSpace,
  } = header;
  // Available Space display
  const { label, mode, time, value } = spaceInNumberOfCommands ?
  {
    label: 'Commands',
    mode: lastUpdateModeFreeSpace,
    time: lastUpdateTimeFreeSpace,
    value: freeSpace,
  } : {
    label: 'Bytes',
    mode: lastUpdateModeNoFreeCommands,
    time: lastUpdateTimeNoFreeCommands,
    value: noFreeCommands,
  };

  return (
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
          overlay={generatePopover('popover-available-space', time, mode)}
        >
          <span>
            Available Space
            &nbsp;
            <input type="text" className="mw100" disabled value={value} />
            &nbsp;
            {label}
          </span>
        </OverlayTrigger>
      </div>
    </ErrorBoundary>
  );
};

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
