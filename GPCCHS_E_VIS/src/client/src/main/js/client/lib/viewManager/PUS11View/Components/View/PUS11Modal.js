/* eslint-disable react/no-array-index-key,react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS11Modal.scss';

const renderBinaryProfile = binaryProfile => (
  <div className="col-xs-4">
    <h4>Binary profile</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th />
          <th>01</th>
          <th>02</th>
          <th>03</th>
          <th>04</th>
          <th>05</th>
          <th>06</th>
          <th>07</th>
          <th>08</th>
        </tr>
      </thead>
      <tbody>
        {
          binaryProfile.map((subTab, i) => (
            <tr key={`pus11modal-binary-profile-table-tr${i}`}>
              <th>{i}</th>
              {
                subTab.map((row, k) => (
                  <td key={`pus11modal-binary-profile-table-tr${i}-td${k}`}>{row.toString(16).toUpperCase()}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

const renderTimeShifts = timeShifts => (
  <div className="col-xs-4">
    <h4>Time shifts</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>App. Time</th>
          <th>Shift</th>
        </tr>
      </thead>
      <tbody>
        {
          timeShifts.map((row, i) => (
            <tr key={`pus11modal-sub-schedule-table-${i}`}>
              <td>{row.appTime}</td>
              <td>{row.shift}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

const renderCommandParameters = commandsParameters => (
  <div className="col-xs-4">
    <h4>Command parameters</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {
          commandsParameters.map((row, i) => (
            <tr key={`pus11modal-sub-schedule-table-${i}`}>
              <td>{row.name}</td>
              <td>{row.value}</td>
              <td>{row.description}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default class PUS11Modal extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    commandsParameters: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    timeShifts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    binaryProfile: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  };

  render() {
    const { closeModal, commandsParameters, timeShifts, binaryProfile } = this.props;
    return (
      <ErrorBoundary>
        <div className="row pus11Modal">
          {renderCommandParameters(commandsParameters)}
          {renderTimeShifts(timeShifts)}
          {renderBinaryProfile(binaryProfile)}
        </div>
        <div className="text-right">
          <Button
            className="btn btn-default"
            onClick={() => closeModal()}
          >
            Close
          </Button>
        </div>
      </ErrorBoundary>
    );
  }
}
