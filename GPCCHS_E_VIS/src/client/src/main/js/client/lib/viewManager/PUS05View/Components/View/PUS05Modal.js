/* eslint-disable react/no-array-index-key,react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './PUS05Modal.scss';

const { func, arrayOf, shape } = PropTypes;

const renderParameters = parameters => (
  <div className="col-xs-4">
    <h4>Command parameters</h4>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {
          parameters.map((row, i) => (
            <tr key={`pus05modal-parameters-table-${i}`}>
              <td>{row.label}</td>
              <td>{row.value}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default class PUS05Modal extends PureComponent {
  static propTypes = {
    closeModal: func.isRequired,
    parameters: arrayOf(shape()).isRequired,
  };

  render() {
    const { closeModal, parameters } = this.props;
    return (
      <div>
        <div className="row pus05Modal">
          {renderParameters(parameters)}
        </div>
        <div className="text-right">
          <Button
            className="btn btn-default"
            onClick={() => closeModal()}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }
}
