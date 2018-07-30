import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import './PUS11View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';
import HeaderStatus from '../../../common/Components/View/PUS/HeaderStatus';

const popoverStyle = { height: 80 };

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
    spaceInNumberOfCommands: PropTypes.bool,
    scheduleStatus: PropTypes.string,
    lastUpdateTimeScheduleStatus: PropTypes.string,
    lastUpdateModeScheduleStatus: PropTypes.string,
    noFreeCommands: PropTypes.number,
    lastUpdateTimeNoFreeCommands: PropTypes.string,
    lastUpdateModeNoFreeCommands: PropTypes.string,
    freeSpace: PropTypes.number,
    lastUpdateTimeFreeSpace: PropTypes.string,
    lastUpdateModeFreeSpace: PropTypes.string,
    serviceApid: PropTypes.number,
    serviceApidName: PropTypes.string,
    apids: PropTypes.arrayOf(PropTypes.shape({
      apidName: PropTypes.string,
      apidRawValue: PropTypes.string,
    })),
    onCommandCellDoubleClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    spaceInNumberOfCommands: null,
    scheduleStatus: null,
    lastUpdateTimeScheduleStatus: null,
    lastUpdateModeScheduleStatus: null,
    noFreeCommands: null,
    lastUpdateTimeNoFreeCommands: null,
    lastUpdateModeNoFreeCommands: null,
    freeSpace: null,
    lastUpdateTimeFreeSpace: null,
    lastUpdateModeFreeSpace: null,
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
      serviceApidName,
      apids,
      viewId,
      onCommandCellDoubleClick,
    } = this.props;

    if (!isValid(apids, serviceApid)) {
      return renderInvald('Please fill-in configuration');
    }

    return (
      <ErrorBoundary>
        <div className="pus11">
          <div className="header">
            {renderHeaders(
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
            )}
          </div>
          <div className="col-sm-6">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'subSchedules'}
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
              />
            </div>
          </div>
          <div className="info col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'commands'}
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
 * @param title
 * @param time
 * @param mode
 * @returns {*}
 */
export const generatePopover = ({ id, title, time, mode }) => (
  <Popover
    id={id}
    placement="bottom"
    title={title}
    style={popoverStyle}
  >
    <div>Last update Time: {time}</div>
    <div>Last update mode: {mode}</div>
  </Popover>
);

generatePopover.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

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
        overlay={generatePopover({
          id: 'popover-commands',
          title: (spaceInNumberOfCommands ? 'Free Commands' : 'Free Bytes'),
          time: lastUpdateTimeNoFreeCommands,
          mode: lastUpdateModeNoFreeCommands,
        })}
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
