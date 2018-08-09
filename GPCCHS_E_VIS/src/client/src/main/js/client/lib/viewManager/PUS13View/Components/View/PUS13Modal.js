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

import styles from './PUS13Modal.css';
import './PUS13Modal.scss';

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


const renderLtdDetails = ltdPart => (
  <div>
    <h4>
      Data Part Details
    </h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Part ID</th>
          <th>Status</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {
        ltdPart.map((row, i) => (
          // _createInfoOverlay(
          //   row,
            (
              <tr key={`pus11modal-ltd-table-${i}`}>
                <td>{row.partID}</td>
                <td>{row.status}</td>
                <td>{row.partSize}</td>
              </tr>
            )
          // )

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
    ltdPart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  render() {
    const { closeModal, commandParameters, ltdPart } = this.props;
    return (
      <ErrorBoundary>
        <div className="row pus11Modal">
          {renderCommandParameters(commandParameters)}
          {renderLtdDetails(ltdPart)}
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
