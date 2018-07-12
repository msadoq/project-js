import _ from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import './PUS11View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';

import styles from './PUS11View.css';

const popoverStyle = {
  height: 80,
};

const _addTooltipWithContent = (cellContent, content, displayObj) => {
  const keys = Object.keys(displayObj);

  return ({
    ...cellContent,
    tooltip: {
      body: createTableData(keys.reduce((acc, cur) => {
        const currentContent = displayObj[cur];

        const value = content[currentContent.key];

        const format = currentContent.format || _.identity;

        return ({
          ...acc,
          [cur]: format(value),
        });
      }, {})),
    },
  });
};

const _formatDate = date => (new Date(date)).toISOString();

export const createTableData =
  obj => (
    <table className={styles.popoverTable}>
      <tbody>
        {
        Object.keys(obj).map(
          key => (
            <tr>
              <td>{key}</td>
              <td>{obj[key]}</td>
            </tr>
          )
        )
      }
      </tbody>
    </table>
  );

const _commandContentModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;

  switch (colKey) {
    case 'commandSsId':
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeCommandId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeCommandId',
            format: _formatDate,
          },
        }
      );
    case 'commandGroundStatus':
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateTimeBinProf: {
            key: 'lastUpdateTimeBinProf',
            format: _formatDate,
          },
          lastUpdateTimeGroundStatus: {
            key: 'lastUpdateTimeGroundStatus',
            format: _formatDate,
          },
        }
      );
    case 'status':
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateModeStatus: {
            key: 'lastUpdateModeStatus',
          },
          lastUpdateTimeStatus: {
            key: 'lastUpdateTimeStatus',
            format: _formatDate,
          },
        }
      );
    case 'currentExecutionTime':
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateModeCurrentExecTime: {
            key: 'lastUpdateModeCurrentExecTime',
          },
          lastUpdateTimeCurrentExecTime: {
            key: 'lastUpdateTimeCurrentExecTime',
            format: _formatDate,
          },
        }
      );
    case 'initialExecutionTime':
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateModeCurrentExecTime: {
            key: 'lastUpdateModeCurrentExecTime',
            format: _formatDate,
          },
          lastUpdateTimeInitialExecTime: {
            key: 'lastUpdateTimeInitialExecTime',
            format: _formatDate,
          },
        }
      );
    case 'totalTimeShiftOffset':
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateModeTotalTimeShiftOffset: {
            key: 'lastUpdateModeTotalTimeShiftOffset',
            format: _formatDate,
          },
          lastUpdateTimeInitialExecTime: {
            key: 'lastUpdateTimeTotalTimeShiftOffset',
            format: _formatDate,
          },
        }
      );
    default:
      return cellContent;
  }
};

const _enabledApidsContentModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;

  switch (colKey) {
    case 'apid':
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeApid',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeApid',
            format: _formatDate,
          },
        }
      );
    default:
      return cellContent;
  }
};

const _subSchedulesContentModifier = (cellContent = {}, content = {}) => {
  const { colKey } = cellContent;

  switch (colKey) {
    case 'ssId': {
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateMode: {
            key: 'lastUpdateModeSubScheduleId',
          },
          lastUpdateTime: {
            key: 'lastUpdateTimeSubscheduleId',
            format: _formatDate,
          },
        }
      );
    }
    case 'status': {
      return _addTooltipWithContent(
        cellContent,
        content,
        {
          lastUpdateModeStatus: {
            key: 'lastUpdateModeStatus',
          },
          lastUpdateTimeStatus: {
            key: 'lastUpdateTimeStatus',
            format: _formatDate,
          },
        }
      );
    }
    default: {
      return cellContent;
    }
  }
};

const backgroundDisabled = { backgroundColor: '#e67e22' };
const backgroundEnabled = { backgroundColor: '#2ecc71' };

// ENABLED APIDS

const _enabledApidsStatusKeyList = [
  'status',
  'lastUpdateTimeStatus',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _enabledApidsOverrideStyle = ({ content }) => {
  const { value, colKey } = content;

  if (_enabledApidsStatusKeyList.indexOf(colKey) > -1) {
    if (value === 'DISABLED') {
      return backgroundDisabled;
    }

    if (value === 'ENABLED') {
      return backgroundEnabled;
    }
  }

  return {};
};

// SUB SCHEDULES
const _subSchedulesStatusKeyList = [
  'status',
  'lastUpdateTimeStatus',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _subSchedulesOverrideStyle = ({ content }) => {
  const { value, colKey } = content;

  if (_subSchedulesStatusKeyList.indexOf(colKey) > -1) {
    if (value === 'DISABLED') {
      return backgroundDisabled;
    }

    if (value === 'ENABLED') {
      return backgroundEnabled;
    }
  }

  return {};
};


// COMMANDS

const _commandsStatusKeyList = [
  'commandGroundStatus',
  'lastUpdateTimeGroundStatus',
  'commandStatus',
  'lastUpdateTimeStatus',
];

// apply background color to cells for which value is ENABLED or DISABLED
const _commandsOverrideStyle = ({ content }) => {
  const { value, colKey } = content;

  if (_commandsStatusKeyList.indexOf(colKey) > -1) {
    if (value === 'DISABLED') {
      return backgroundDisabled;
    }

    if (value === 'ENABLED') {
      return backgroundEnabled;
    }
  }

  return {};
};

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
                overrideStyle={_enabledApidsOverrideStyle}
                contentModifier={_enabledApidsContentModifier}
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
    <div className="info col-sm-4 pus11_ss">
      <OverlayTrigger
        trigger={popoverTrigger}
        placement="bottom"
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
        placement="bottom"
        overlay={generatePopover({
          id: 'popover-commands',
          title: (spaceInNumberOfCommands ? 'Free Commands' : 'Free Bytes'),
          time: lastUpdateTimeNoFreeCommands,
          mode: lastUpdateModeNoFreeCommands,
        })}
      >
        <span>
          Application Space&nbsp;
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
