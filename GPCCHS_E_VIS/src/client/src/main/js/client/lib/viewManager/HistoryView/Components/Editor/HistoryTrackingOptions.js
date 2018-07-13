import React from 'react';
import PropTypes from 'prop-types';

import styles from './HistoryTrackingOptions.css';


const HistoryTrackingOptions =
  ({
     currentTimestampTracking,
     onToggleCurrentTimestampTracking,
   }) =>
    (
      <div>
        <h4>Tracking</h4>
        <div className={styles.Input}>
          <input
            id="history-track-current"
            name="history-track-current"
            type="checkbox"
            onClick={onToggleCurrentTimestampTracking}
            checked={currentTimestampTracking}
          />
          <label htmlFor="history-track-current">
            Track current timestamp
          </label>
        </div>
      </div>
    );

HistoryTrackingOptions.propTypes = {
  currentTimestampTracking: PropTypes.bool.isRequired,
  onToggleCurrentTimestampTracking: PropTypes.func.isRequired,
};

export default HistoryTrackingOptions;
