/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import './PUS11View.scss';

import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';

export default class PUS11View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS11ViewContainer mapStateToProps
    applicationProcessName: PropTypes.string,
    applicationProcessId: PropTypes.number,
    scheduleStatus: PropTypes.string.isRequired,
    availableSpace: PropTypes.string.isRequired,
    spaceType: PropTypes.string.isRequired,
    lastUpdateTime: PropTypes.number.isRequired,
    lastUpdateType: PropTypes.string.isRequired,
    // from container's mapDispatchToProps
    // openModal: func.isRequired,
    askFakeData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    applicationProcessName: null,
    applicationProcessId: null,
  };
  static contextTypes = {
    windowId: PropTypes.string,
  };

  // handleRowDoubleClicked(e, row) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { openModal, viewId } = this.props;
  //   const { windowId } = this.context;
  //   openModal(windowId, { type: 'pus11Modal', viewId, title: 'Details for command ###', bsSize: 'lg' });
  // }

  // renderTCTable(commands, viewId) {
  //   return (
  //     <table className="table table-bordered">
  //       <thead>
  //         <tr>
  //           <th>Apid</th>
  //           <th>Ssid</th>
  //           <th>Cmd. Name</th>
  //           <th>Cmd. Description</th>
  //           <th>Cmd. AP. Name</th>
  //           <th>Seq. Count</th>
  //           <th>Source Id</th>
  //           <th>Cmd. Status</th>
  //           <th>Ground Status</th>
  //           <th>Init. Exec. Time</th>
  //           <th>Cur. Exec. Time</th>
  //           <th>Tot. Shift Time</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           commands.data.map((row, i) => (
  //             <tr key={`${viewId}-tc-table-${i}`} onDoubleClick={e => this.handleRowDoubleClicked(e, row)}>
  //               <td>{row.apid}</td>
  //               <td>{row.ssid}</td>
  //               <td>{row.cmdName}</td>
  //               <td>{row.cmdDescription}</td>
  //               <td>{row.cmdApName}</td>
  //               <td>{row.seqCount}</td>
  //               <td>{row.sourceId}</td>
  //               <td>{row.cmdStatus}</td>
  //               <td>{row.groundStatus}</td>
  //               <td>{row.initExecTime}</td>
  //               <td>{row.curExecTime}</td>
  //               <td>{row.totShiftTime}</td>
  //             </tr>
  //           ))
  //         }
  //       </tbody>
  //     </table>
  //   );
  // }
  componentDidMount() {
    const { viewId, askFakeData } = this.props;

    askFakeData(
      viewId,
      'subSchedules',
      [
        {
          ssid: 87,
          ssidLabel: 'xxx',
          name: 'xxx',
          status: 'disabled',
          firstTCTime: 1527520025823,
          updateType: 'TM',
          updateTime: 1527520025823,
          nbTc: 1,
        },
        {
          ssid: 90,
          ssidLabel: 'xxx',
          name: 'xxx',
          status: 'disabled',
          firstTCTime: 1527520025823,
          updateType: 'TM',
          updateTime: 1527520025823,
          nbTc: 1,
        },
        {
          ssid: 247,
          ssidLabel: 'xxx',
          name: 'xxx',
          status: 'disabled',
          firstTCTime: 1527520025823,
          updateType: 'TM',
          updateTime: 1527520025823,
          nbTc: 1,
        },
        {
          ssid: 642,
          ssidLabel: 'xxx',
          name: 'xxx',
          status: 'disabled',
          firstTCTime: 1527520025823,
          updateType: 'TM',
          updateTime: 1527520025823,
          nbTc: 1,
        },
      ],
      20
    );
  }

  render() {
    const {
      applicationProcessName,
      applicationProcessId,
      scheduleStatus,
      availableSpace,
      spaceType,
      lastUpdateTime,
      lastUpdateType,
      viewId,
    } = this.props;

    if (!isValid(applicationProcessName, applicationProcessId)) {
      return renderInvald('Please fill-in configuration');
    }

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
        <div
          style={{
            height: 400,
          }}
        >
          <VirtualizedTableViewContainer
            viewId={viewId}
            tableId={'subSchedules'}
          />
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
    <div className="info col-sm-6">
      <span>
        Application Process&nbsp;
        <input type="text" disabled value={ApplicationProcessName} />&nbsp;
        <input className="mw50" type="text" disabled value={ApplicationProcessId} />
      </span>
      <span className="spacing" />
    </div>
    <div className="info col-sm-6">
      <span>
        Schedule Status&nbsp;
        <input type="text" className="mw100" disabled value={ScheduleStatus} />
      </span>
      <span className="spacing" />
    </div>
    <div className="info col-sm-6">
      <span>
        Application Space&nbsp;
        <input type="text" className="mw100" disabled value={AvailableSpace} />
        &nbsp;{SpaceType}
      </span>
      <span className="spacing" />
    </div>
    <div className="info col-sm-6">
      <span>
        Last Uptate&nbsp;
        <input type="text" className="mw100" disabled value={LastUpdateTime} />&nbsp;
        <input className="mw50" type="text" disabled value={LastUpdateType} />
      </span>
      <span className="spacing" />
    </div>
    <div className="clearfix" />
  </React.Fragment>
);

// export const renderSubSchedulesTable = (subSchedules, viewId) => (
//   <table className="table table-bordered">
//     <thead>
//       <tr>
//         <th>SSID</th>
//         <th>APID</th>
//         <th>Name</th>
//         <th>Status</th>
//         <th>First TC Time</th>
//       </tr>
//     </thead>
//     <tbody>
//       {
//         subSchedules.data.map((row, i) => (
//           <tr key={`${viewId}-sub-schedule-table-${i}`}>
//             <td>{row.ssid}</td>
//             <td>{row.apid}</td>
//             <td>{row.name}</td>
//             <td>{row.status}</td>
//             <td>{row.firstTCTime}</td>
//           </tr>
//         ))
//       }
//     </tbody>
//   </table>
// );

// export const renderEnabledApidsTable = viewId => (
//   <table className="table table-bordered">
//     <thead>
//       <tr>
//         <th>APID</th>
//         <th>Name</th>
//       </tr>
//     </thead>
//     <tbody>
//       {
//       enabledApids.map((row, i) => (
//         <tr key={`${viewId}-enabled-apids-table-${i}`}>
//           <td>{row.apid}</td>
//           <td>{row.name}</td>
//         </tr>
//       ))
//     }
//     </tbody>
//   </table>
// );

export const isValid = (applicationProcessName, applicationProcessId) =>
  typeof applicationProcessName === 'string' &&
  applicationProcessName.length > 0 &&
  typeof applicationProcessId === 'number'
;

export const renderInvald = error => (
  <div className="pus11 h100 posRelative">
    <div className="flex">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
