/* eslint-disable no-unused-vars,react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './PUS11.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';

const { string, number, arrayOf, shape } = PropTypes;

export default class PUS11View extends React.Component {
  static propTypes = {
    // own props
    viewId: string.isRequired,
    // From PUS11ViewContainer mapStateToProps
    applicationProcessName: string.isRequired,
    applicationProcessId: number.isRequired,
    scheduleStatus: string.isRequired,
    availableSpace: string.isRequired,
    spaceType: string.isRequired,
    lastUpdateTime: number.isRequired,
    lastUpdateType: string.isRequired,
    subScheduleRows: arrayOf(arrayOf(PropTypes.any)).isRequired,
    enabledApidList: arrayOf(shape({
      apid: number.isRequired,
      name: string.isRequired,
    })).isRequired,
    tcList: arrayOf(shape({
      apid: number.isRequired,
      ssid: number.isRequired,
      cmdName: string.isRequired,
      cmdDescription: string.isRequired,
      cmdApName: string.isRequired,
      seqCount: number.isRequired,
      sourceId: string.isRequired,
      cmdStatus: string.isRequired,
      groundStatus: string.isRequired,
      initExecTime: number.isRequired,
      curExecTime: number.isRequired,
      totShiftTime: number.isRequired,
    })).isRequired,
  };
  static defaultProps = {};

  render() {
    const {
      applicationProcessName,
      applicationProcessId,
      scheduleStatus,
      availableSpace,
      spaceType,
      lastUpdateTime,
      lastUpdateType,
      subScheduleRows,
      enabledApidList,
      tcList,
      viewId,
    } = this.props;

    const tableCellActions = [
      {
        label: 'Log info',
        onClick: (dispatch, content, i, j) => {
          console.log(`Clicked on log info at cell (${i}, ${j})}`);
        },
      },
    ];

    return (
      <div className="pus11">
        <div className="header">
          {renderHeaders(
            applicationProcessName,
            applicationProcessId,
            scheduleStatus,
            availableSpace,
            spaceType,
            lastUpdateTime,
            lastUpdateType)}
        </div>
        <div className="header">
          <div className="col-sm-6">
            <div>
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'subSchedules'}
                columnWidth={140}
                width={140 * 5}
                height={100}
                rows={subScheduleRows}
                bodyCellActions={tableCellActions}
              />
            </div>
          </div>
          <div className="col-sm-6">
            {renderEnabledApidsTable(enabledApidList, viewId)}
          </div>
          <div className="clearfix" />
        </div>
        <div className="header">
          <div className="info col-sm-12">
            {renderTCTable(tcList, viewId)}
          </div>
        </div>
      </div>
    );
  }
}

export const renderHeaders = (ApplicationProcessName,
                              ApplicationProcessId,
                              ScheduleStatus,
                              AvailableSpace,
                              SpaceType,
                              LastUpdateTime,
                              LastUpdateType
) => (
  <React.Fragment>
    <div className="info col-sm-3">
      <span className="spacing" />
      <span>
        Application Process
        <input type="text" disabled value={ApplicationProcessName} />
        <input
          className="mw50"
          type="text" disabled
          value={ApplicationProcessId}
        />
      </span>
      <span className="spacing" />
    </div>
    <div className="info col-sm-3">
      <span className="spacing" />
      <span>Schedule Status <input type="text" className="mw100" disabled value={ScheduleStatus} /></span>
      <span className="spacing" />
    </div>
    <div className="info col-sm-3">
      <span className="spacing" />
      <span>Application Space <input type="text" className="mw100" disabled value={AvailableSpace} /> {SpaceType}</span>
      <span className="spacing" />
    </div>
    <div className="info col-sm-3">
      <span className="spacing" />
      <span>Last Uptate <input type="text" className="mw100" disabled value={LastUpdateTime} /> <input
        className="mw50"
        type="text"
        disabled
        value={LastUpdateType}
      /></span>
      <span className="spacing" />
    </div>
    <div className="clearfix" />
  </React.Fragment>
);

export const renderEnabledApidsTable = (EnabledApidList, viewId) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>APID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {
      EnabledApidList.map((row, i) => (
        <tr key={`${viewId}-enabled-apids-table-${i}`}>
          <td>{row.apid}</td>
          <td>{row.name}</td>
        </tr>
      ))
    }
    </tbody>
  </table>
);

export const renderTCTable = (tcList, viewId) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Apid</th>
        <th>Ssid</th>
        <th>Cmd. Name</th>
        <th>Cmd. Description</th>
        <th>Cmd. AP. Name</th>
        <th>Seq. Count</th>
        <th>Source Id</th>
        <th>Cmd. Status</th>
        <th>Ground Status</th>
        <th>Init. Exec. Time</th>
        <th>Cur. Exec. Time</th>
        <th>Tot. Shift Time</th>
      </tr>
    </thead>
    <tbody>
      {
      tcList.map((row, i) => (
        <tr key={`${viewId}-tc-table-${i}`}>
          <td>{row.apid}</td>
          <td>{row.ssid}</td>
          <td>{row.cmdName}</td>
          <td>{row.cmdDescription}</td>
          <td>{row.cmdApName}</td>
          <td>{row.seqCount}</td>
          <td>{row.sourceId}</td>
          <td>{row.cmdStatus}</td>
          <td>{row.groundStatus}</td>
          <td>{row.initExecTime}</td>
          <td>{row.curExecTime}</td>
          <td>{row.totShiftTime}</td>
        </tr>
      ))
    }
    </tbody>
  </table>
);
