import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BUTTON_DISABLED_WHILE_SAMPLING_ON,
  BUTTON_ENABLED_WHILE_SAMPLING_ON,
  BUTTON_ENABLED_WHILE_SAMPLING_OFF,
  BUTTON_STATE_ERROR,
} from 'store/types';
import styles from './Links.css';

export default class SamplingButton extends PureComponent {
  static propTypes = {
    toggleSamplingStatus: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    sampling: PropTypes.shape(),
  }
  static defaultProps = {
    sampling: {},
  }

  toggleButton = () => {
    this.props.toggleSamplingStatus(this.props.viewId);
  };

  computeButtonState = () => {
    switch (this.props.sampling.samplingLock) {
      case 'on':
        return BUTTON_DISABLED_WHILE_SAMPLING_ON;
      case 'off':
        switch (this.props.sampling.samplingStatus) {
          case 'on':
            return BUTTON_ENABLED_WHILE_SAMPLING_ON;
          case 'off':
            return BUTTON_ENABLED_WHILE_SAMPLING_OFF;
          default:
            return BUTTON_STATE_ERROR;
        }
      default:
        return BUTTON_STATE_ERROR;
    }
  };

  render() {
    const buttonClass = (enumState) => {
      switch (enumState) {
        case BUTTON_DISABLED_WHILE_SAMPLING_ON:
          return `btn-info disabled ${styles.notAllowed}`;
        case BUTTON_ENABLED_WHILE_SAMPLING_ON:
          return 'btn-primary enabled';
        case BUTTON_ENABLED_WHILE_SAMPLING_OFF:
          return 'btn-warning enabled';
        case BUTTON_STATE_ERROR:
          return `btn-danger disabled ${styles.notAllowed}`;
        default:
          return `btn-default disabled ${styles.notAllowed}`;
      }
    };

    return (
      <div>
        <div className={styles.links}>
          <button
            className={buttonClass(this.computeButtonState())}
            enabled={this.props.sampling.samplingLock ? 'enabled' : 'disabled'}
            onClick={this.toggleButton}
          >
            Sampling {this.props.sampling.samplingStatus}
          </button>
        </div>
      </div>
    );
  }
}
