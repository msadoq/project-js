/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { PropTypes } from 'prop-types';

import Flatpickr from 'react-flatpickr';
import moment from 'moment/moment';

import styles from './PUSCompareModal.css';


class PUSCompareModal extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    sendPUSCompareRequest: PropTypes.func.isRequired,
    apids: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      comparisonDate: new Date(),
      serviceType: null,
      apid: null,
      shouldStartComparisonTool: false,
    };

    this.selectAPID = React.createRef();
  }

  _updateComparisonDate = (arr, date) => {
    this.setState({
      ...this.state,
      comparisonDate: date,
    });
  };

  _updateServiceType = (ev) => {
    this.setState({
      ...this.state,
      serviceType: ev.target.value,
    });
  };

  _updateAPID = (ev) => {
    this.setState({
      ...this.state,
      apid: ev.target.value,
    });
  };

  _onToggleCheckbox = () => {
    this.setState({
      ...this.state,
      shouldStartComparisonTool: !this.state.shouldStartComparisonTool,
    });
  };

  _onSubmit = () => {
    const { apid, comparisonDate, shouldStartComparisonTool } = this.state;
    this.props.sendPUSCompareRequest(
      apid,
      comparisonDate,
      shouldStartComparisonTool
    );

    this.props.closeModal();
  };

  _onCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { apids } = this.props;

    return (
      <div className={styles.modalContainer}>
        <div className={styles.comparisonDateContainer}>
          <span>Comparison date</span>
          <Flatpickr
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES Flatpickr"
            options={{
              minDate: '1990-01-01',
              maxDate: moment().add(100, 'year').format('YYYY-MM-DD'),
              value: this.state.comparisonDate,
              format: 'Y-m-d',
            }}
            defaultValue={moment(new Date()).format('YYYY-MM-DD')}
            onChange={this._updateComparisonDate}
            className={styles.formControl}
          />
        </div>
        <div className={styles.divider} />
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
          <div className={styles.checkboxInput}>
            <input
              type="checkbox"
              value={this.state.shouldStartComparisonTool}
              onClick={this._onToggleCheckbox}
            />
            <label htmlFor={'start'}>
              Start comparison tool
            </label>
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

export default PUSCompareModal;
