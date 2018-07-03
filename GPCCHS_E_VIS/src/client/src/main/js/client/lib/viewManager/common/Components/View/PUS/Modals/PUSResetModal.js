/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';

import Flatpickr from 'react-flatpickr';
import moment from 'moment/moment';

import styles from './PUSResetModal.css';


class PUSSaveInFileModal extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    sendPUSResetRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialisationMode: null,
      initializationTime: new Date(),
    };
  }

  _updateInitializationMode = (mode) => {
    this.setState({
      ...this.state,
      initializationMode: mode,
    });
  };

  _updateInitializationDate = (arr, date) => {
    this.setState({
      ...this.state,
      initializationTime: date,
    });
  };

  _onSubmit = () => {
    const { initialisationMode, initializationTime } = this.state;
    this.props.sendPUSResetRequest(initialisationMode, initializationTime);
    this.props.closeModal();
  };

  _onCancel = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.choiceContainer}>
          <span className={styles.sectionTitle}>Initialization mode</span>
          <fieldset>
            <div>
              <input
                type="radio"
                name="default"
                checked={this.state.initializationMode === 'default'}
                onClick={
                  () => {
                    this._updateInitializationMode('default');
                  }
                }
              />
              <label htmlFor="default">From default</label>
            </div>

            <div>
              <input
                type="radio"
                name="lastState"
                checked={this.state.initializationMode === 'lastState'}
                onClick={
                  () => {
                    this._updateInitializationMode('lastState');
                  }
                }
              />
              <label htmlFor="lastState">From last state</label>
            </div>
            <div>
              <input
                type="radio"
                name="previousState"
                checked={this.state.initializationMode === 'previousState'}
                onClick={
                  () => {
                    this._updateInitializationMode('previousState');
                  }
                }
              />
              <label htmlFor="previousState">From previous state</label>
            </div>
          </fieldset>
        </div>
        <div className={styles.divider} />
        <div className={styles.initializationTimeContainer}>
          <span className={styles.sectionTitle}>Initialization time</span>
          <Flatpickr
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES Flatpickr"
            options={{
              minDate: '1990-01-01',
              maxDate: moment().add(100, 'year').format('YYYY-MM-DD'),
              value: this.state.comparisonDate,
              format: 'Y-m-d',
            }}
            defaultValue={moment(new Date()).format('YYYY-MM-DD')}
            onChange={this._updateInitializationDate}
            className={styles.formControl}
          />
        </div>
        <div className={styles.actionsContainer}>
          <div className={styles.actionsButtons}>
            <button
              onClick={this._onSubmit}
              disabled={!this.state.initializationMode || !this.state.initializationTime}
            >
              OK
            </button>
            <button onClick={this._onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PUSSaveInFileModal;
