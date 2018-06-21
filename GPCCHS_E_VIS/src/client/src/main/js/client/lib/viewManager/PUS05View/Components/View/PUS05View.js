/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS05.scss';

export default class PUS05View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS05ViewContainer mapStateToProps
    applicationProcessName: PropTypes.string.isRequired,
    applicationProcessId: PropTypes.number.isRequired,
    onBoardEvents: PropTypes.arrayOf(PropTypes.shape({
      rid: PropTypes.number,
      ridLabel: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      eventShortDescription: PropTypes.string,
      eventDefaultStatus: PropTypes.string,
      alarmLevel: PropTypes.string,
      actionName: PropTypes.string,
      eventLongDescription: PropTypes.string,
      updateType: PropTypes.string,
      updateTime: PropTypes.number,
    })).isRequired,
    receivedOnBoardEvents: PropTypes.arrayOf(PropTypes.shape({
      onBoardTime: PropTypes.number,
      receptionTime: PropTypes.number,
      rid: PropTypes.number,
      ridLabel: PropTypes.string,
      name: PropTypes.string,
      reportType: PropTypes.string,
    })).isRequired,
    // from container's mapDispatchToProps
    openModal: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  static contextTypes = {
    windowId: PropTypes.PropTypes.string,
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
      <ErrorBoundary>
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
      </ErrorBoundary>
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
