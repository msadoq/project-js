/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './PUS05.scss';

const { string, number, arrayOf, shape, func } = PropTypes;

export default class PUS05View extends React.Component {
  static propTypes = {
    // own props
    viewId: string.isRequired,
    // From PUS05ViewContainer mapStateToProps
    applicationProcessName: string.isRequired,
    applicationProcessId: number.isRequired,
    onBoardEvents: arrayOf(shape({
      rid: number,
      ridLabel: string,
      name: string,
      status: string,
      eventShortDescription: string,
      eventDefaultStatus: string,
      alarmLevel: string,
      actionName: string,
      eventLongDescription: string,
      updateType: string,
      updateTime: number,
    })).isRequired,
    receivedOnBoardEvents: arrayOf(shape({
      onBoardTime: number,
      receptionTime: number,
      rid: number,
      ridLabel: string,
      name: string,
      reportType: string,
    })).isRequired,
    // from container's mapDispatchToProps
    openModal: func.isRequired,
  };
  static defaultProps = {};
  static contextTypes = {
    windowId: PropTypes.string,
  };

  /**
   * @param e
   */
  handleRowDoubleClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    const { openModal, viewId } = this.props;
    const { windowId } = this.context;
    openModal(windowId, { type: 'pus05Modal', viewId, title: 'Details for command ###', bsSize: 'sm' });
  }

  /**
   * @param onBoardEvents
   * @param viewId
   * @returns {*}
   */
  renderReceivedOnboardEventsTable(onBoardEvents, viewId) {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>onBoard Time</th>
            <th>reception Time</th>
            <th>rid</th>
            <th>rid Label</th>
            <th>name</th>
            <th>report Type</th>
          </tr>
        </thead>
        <tbody>
          {
            onBoardEvents.map((row, i) => (
              <tr key={`${viewId}-received-onboard-events-${i}`} onDoubleClick={e => this.handleRowDoubleClicked(e, row)}>
                <td>{row.onBoardTime}</td>
                <td>{row.receptionTime}</td>
                <td>{row.rid}</td>
                <td>{row.ridLabel}</td>
                <td>{row.name}</td>
                <td>{row.reportType}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  render() {
    const {
      applicationProcessName,
      applicationProcessId,
      onBoardEvents,
      receivedOnBoardEvents,
      viewId,
    } = this.props;

    return (
      <div className="pus05">
        <div className="header">
          {renderHeaders(applicationProcessName, applicationProcessId)}</div>
        <div className="header">
          <div className="col-sm-12">
            {renderOnboardEventsTable(onBoardEvents, viewId)}
          </div>
          <div className="clearfix" />
        </div>
        <div className="header">
          <div className="info col-sm-12">
            {this.renderReceivedOnboardEventsTable(receivedOnBoardEvents, viewId)}
          </div>
        </div>
      </div>
    );
  }
}

export const renderHeaders = (ApplicationProcessName, ApplicationProcessId) => (
  <React.Fragment>
    <div className="info col-sm-12">
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
    <div className="clearfix" />
  </React.Fragment>
);

export const renderOnboardEventsTable = (onBoardEvents, viewId) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>rid</th>
        <th>rid Label</th>
        <th>name</th>
        <th>status</th>
        <th>event Short Description</th>
        <th>event Default Status</th>
        <th>alarm Level</th>
        <th>action Name</th>
        <th>event Long Description</th>
        <th>update Type</th>
        <th>update Time</th>
      </tr>
    </thead>
    <tbody>
      {
        onBoardEvents.map((row, i) => (
          <tr key={`${viewId}-onboard-events-table-${i}`}>
            <td>{row.rid}</td>
            <td>{row.ridLabel}</td>
            <td>{row.name}</td>
            <td>{row.status}</td>
            <td>{row.eventShortDescription}</td>
            <td>{row.eventDefaultStatus}</td>
            <td>{row.alarmLevel}</td>
            <td>{row.actionName}</td>
            <td>{row.eventLongDescription}</td>
            <td>{row.updateType}</td>
            <td>{row.updateTime}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);
