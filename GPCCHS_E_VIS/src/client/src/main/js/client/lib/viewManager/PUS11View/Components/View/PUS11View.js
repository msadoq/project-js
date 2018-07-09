import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import './PUS11View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';

const popoverStyle = {
  height: '80px !important',
};

// @todo hbenjelloun implement
const bodyCellsCommands = [
  {
    label: 'commandSsId',
    onHover: () => console.log('tooltip commandSsid. Use lastUpdateModeCommandId & lastUpdateTimeCommandId'),
  },
  {
    label: 'commandGroundStatus',
    onHover: () => console.log('tooltip command commandGroundStatus. Use lastUpdateTimeBinProf & lastUpdateTimeGroundStatus'),
  },
  {
    label: 'status',
    onHover: () => console.log('tooltip command status. Use lastUpdateModeStatus & lastUpdateTimeStatus'),
  },
  {
    label: 'currentExecutionTime',
    onHover: () => console.log('tooltip command currentExecutionTime. Use lastUpdateModeCurrentExecTime & lastUpdateTimeCurrentExecTime'),
  },
  {
    label: 'initialExecutionTime',
    onHover: () => console.log('tooltip command initialExecutionTime. Use lastUpdateModeInitialExecTime & lastUpdateTimeInitialExecTime'),
  },
  {
    label: 'totalTimeShiftOffset',
    onHover: () => console.log('tooltip command totalTimeShiftOffset. Use lastUpdateModeTotalTimeShiftOffset & lastUpdateTimeTotalTimeShiftOffset'),
  },
  {
    label: 'Popin ==> PUS11Modal',
    onDbleClick: () => console.log('open popin with content depending on each line... use commandBinaryProfile, lastUpdateModeBinProf,lastUpdateTimeBinProf, pus011CommandParameters & pus011TimeShift'),
  },
];

// @todo hbenjelloun implement
const bodyCellsEnabledApids = [
  {
    label: 'apid',
    onHover: () => console.log('tooltip apid. Use lastUpdateModeApid & lastUpdateTimeApid'),
  },
];

// @todo hbenjelloun implement
const bodyCellsSubSchedules = [
  {
    label: 'ssId',
    onHover: () => console.log('tooltip ssId. Use lastUpdateModeSubScheduleId & lastUpdateTimeSubscheduleId'),
  },
  {
    label: 'status',
    onHover: () => console.log('tooltip status. Use lastUpdateModeStatus & lastUpdateTimeStatus'),
  },
];

const backgroundDisabled = { backgroundColor: '#e67e22' };
const backgroundEnabled = { backgroundColor: '#2ecc71' };
const emptyObject = {};

// apply background color to cells for which value is ENABLED or DISABLED
export const overrideStyle = ({ content }) => ({
  ...(
// eslint-disable-next-line no-nested-ternary
    content.value === 'DISABLED'
    ? backgroundDisabled
    : content.value === 'ENABLED'
      ? backgroundEnabled
      : emptyObject
  ),
});

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
      viewId,
    } = this.props;

    if (!isValid(serviceApidName, serviceApid)) {
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
                bodyCellActions={bodyCellsSubSchedules}
                overrideStyle={overrideStyle}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'enabledApids'}
                bodyCellActions={bodyCellsEnabledApids}
                overrideStyle={overrideStyle}
              />
            </div>
          </div>
          <div className="info col-sm-12">
            <div style={{ height: 400 }}>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'commands'}
                bodyCellActions={bodyCellsCommands}
                overrideStyle={overrideStyle}
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
    placement="top"
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
    <div className="info col-sm-4 pus11_ss">
      <OverlayTrigger
        trigger={popoverTrigger}
        placement="top"
        overlay={generatePopover({
          id: 'popover-service-apid',
          title: 'Schedule Status',
          time: lastUpdateTimeScheduleStatus,
          mode: lastUpdateModeScheduleStatus,
        })}
      >
        <span>
          Schedule Status&nbsp;
          <input type="text" className="mw100" disabled value={scheduleStatus} />
        </span>
      </OverlayTrigger>
      <span className="spacing" />
    </div>
    <div className="info col-sm-4 pus11_as">
      <OverlayTrigger
        trigger={popoverTrigger}
        placement="top"
        overlay={generatePopover({
          id: 'popover-commands',
          title: (spaceInNumberOfCommands ? 'Free Commands' : 'Free Bytes'),
          time: lastUpdateTimeNoFreeCommands,
          mode: lastUpdateModeNoFreeCommands,
        })}
      >
        <span>
          Application Space&nbsp;
          <input type="text" className="mw100" disabled value={spaceInNumberOfCommands ? noFreeCommands : freeSpace} />&nbsp;
          {spaceInNumberOfCommands ? 'commands' : 'bytes'}
        </span>
      </OverlayTrigger>
    </div>
  </ErrorBoundary>
);

export const isValid = (applicationProcessName, applicationProcessId) =>
  typeof applicationProcessName === 'string' &&
  applicationProcessName.length > 0 &&
  typeof applicationProcessId === 'number'
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
