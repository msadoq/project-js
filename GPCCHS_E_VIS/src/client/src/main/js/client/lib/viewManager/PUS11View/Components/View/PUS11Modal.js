/* eslint-disable react/no-array-index-key,react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Glyphicon,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { createTableData } from '../../../common/pus/tooltip';

import styles from './PUS11Modal.css';
import './PUS11Modal.scss';

const popoverTrigger = ['hover', 'focus'];
const popoverStyle = {
  height: 50,
};

const _createInfoPopover = obj => (
  <Popover
    id={'commands-timeshifts-info'}
    placement="bottom"
    style={popoverStyle}
  >
    {createTableData(obj)}
  </Popover>
);

const InfoIcon = (<Glyphicon
  className={styles.InfoIcon}
  glyph="info-sign"
/>);

const _createInfoOverlay = (obj, children = InfoIcon) =>
  (
    <OverlayTrigger
      trigger={popoverTrigger}
      placement="right"
      overlay={_createInfoPopover({
        'Last update time': obj.lastUpdateTime,
        'Last update mode': obj.lastUpdateMode,
      })}
    >
      {children}
    </OverlayTrigger>
  );

const renderBinaryProfile = binaryProfile => (
  <div>
    <h4>
      Binary profile
      {_createInfoOverlay(binaryProfile)}
    </h4>
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
        binaryProfile.commandBinaryProfile.map((row, i) => (
          <tr key={`pus11modal-binary-profile-table-tr${i}`}>
            <th>{i}</th>
            {
              row.map((cell, k) => (
                <td key={`pus11modal-binary-profile-table-tr${i}-td${k}`}>
                  {cell.toUpperCase() /* .toString(16) */ }
                </td>
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
  <div>
    <h4>
      Time shifts
    </h4>
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
          _createInfoOverlay(
            row,
            (
              <tr key={`pus11modal-sub-schedule-table-${i}`}>
                <td>{row.applicationTime}</td>
                <td>{row.timeShiftOffset}</td>
              </tr>
            )
          )

        ))
      }
      </tbody>
    </table>
  </div>
);

const renderCommandParameters = commandParameters => (
  <div>
    <h4>
      Command parameters
    </h4>
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
        commandParameters.map((row, i) => (
          _createInfoOverlay(row, (
            <tr key={`pus11modal-sub-schedule-table-${i}`}>
              <td>{row.parameterName}</td>
              <td>{row.parameterValue}</td>
              <td>{row.parameterDescription}</td>
            </tr>
          ))
        ))
      }
      </tbody>
    </table>
  </div>
);

export default class PUS11Modal extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    commandParameters: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    timeShifts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    binaryProfile: PropTypes.shape({
      commandBinaryProfile: PropTypes.arrayOf(PropTypes.any),
      lastUpdateModeBinProf: PropTypes.string,
      lastUpdateTimeBinProf: PropTypes.number,
    }),
  };

  render() {
    const { closeModal, commandParameters, timeShifts, binaryProfile } = this.props;
    return (
      <ErrorBoundary>
        <div className="row pus11Modal">
          {renderCommandParameters(commandParameters)}
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
