/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';

import styles from './PUSSaveInFileModal.css';


class PUSSaveInFileModal extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    sendPUSSaveInFileRequest: PropTypes.func.isRequired,
    apids: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      apid: null,
    };
  }

  _updateAPID = (ev) => {
    this.setState({
      ...this.state,
      apid: ev.target.value,
    });
  };

  _onSubmit = () => {
    const { apid } = this.state;
    this.props.sendPUSSaveInFileRequest(apid);

    this.props.closeModal();
  };

  _onCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { apids } = this.props;

    return (
      <div className={styles.modalContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.selectInput}>
            <label htmlFor="serviceType">Service type</label>
            <select
              name="serviceType"
              onChange={this._updateServiceType}
            >
              <option value={null}>-</option>
              <option value="st1">Service type 1</option>
              <option value="st2">Service type 2</option>
              <option value="st3">Service type 3</option>
            </select>
          </div>
          <div className={styles.selectInput}>
            <label htmlFor="apid">APID</label>
            <select
              ref={this.selectAPID}
              name="apid"
              onChange={this._updateAPID}
            >
              <option value={null}>-</option>

              {
                apids.map(apid => <option value={apid.apidRawValue}>{apid.apidName}</option>)
              }
            </select>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.actionsContainer}>
          <div className={styles.actionsButtons}>
            <button onClick={this._onSubmit}>OK</button>
            <button onClick={this._onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PUSSaveInFileModal;
