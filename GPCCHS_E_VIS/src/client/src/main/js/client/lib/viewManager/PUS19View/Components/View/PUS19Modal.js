/* eslint-disable react/no-array-index-key,react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from 'react-bootstrap';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS19Modal.scss';


const renderBinaryProfile = binaryProfile => (
  <div>
    <h4>
      Binary profile
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
        binaryProfile.actionTcPacket.map((row, i) => (
          <tr key={`pus19modal-binary-profile-table-tr${i}`}>
            <th>{i}</th>
            {
              row.map((cell, k) => (
                <td key={`pus19modal-binary-profile-table-tr${i}-td${k}`}>
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


export default class PUS19Modal extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    binaryProfile: PropTypes.shape({
      actionTcPacket: PropTypes.arrayOf(PropTypes.any),
    }),
  };

  render() {
    const { closeModal, binaryProfile } = this.props;
    return (
      <ErrorBoundary>
        <div className="row pus19Modal">
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
