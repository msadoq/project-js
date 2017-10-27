import React, { PropTypes } from 'react';
import Select from 'react-select';

import * as constants from '../../../../../constants';

const MODES = [
  { value: constants.GMA_ALARM_MODE_ALL, label: 'All' },
  { value: constants.GMA_ALARM_MODE_NONNOMINAL, label: 'Non nominal' },
  { value: constants.GMA_ALARM_MODE_TOACKNOWLEDGE, label: 'To Acknowledge' },
];

const ModeFilter = ({ mode, updateMode }) => (
  <span>
    Mode
    <Select
      clearable={false}
      options={MODES}
      value={mode}
      onChange={({ value }) => updateMode(value)}
    />
  </span>
);
ModeFilter.propTypes = {
  mode: PropTypes.string.isRequired,
  updateMode: PropTypes.func.isRequired,
};

export default ModeFilter;
