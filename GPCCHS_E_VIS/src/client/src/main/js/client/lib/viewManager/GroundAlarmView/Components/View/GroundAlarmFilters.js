import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';

import * as constants from '../../../../constants';
import DomainFilter from './filters/DomainFilterContainer';

const MODES = [
  { value: constants.ALARM_MODE_ALL, label: 'All' },
  { value: constants.ALARM_MODE_NONNOMINAL, label: 'Non nominal' },
  { value: constants.ALARM_MODE_TOACKNOWLEDGE, label: 'To Acknowledge' },
];

const GroundAlarmFilters = ({ viewId, ...props }) => (
  <div>
    <Col xs={4}>Timeline <Select /></Col>
    <Col xs={4}>
      <DomainFilter viewId={viewId} />
    </Col>
    <Col xs={4}>
      Mode
      <Select
        clearable={false}
        options={MODES}
        value={props.mode}
        onChange={({ value }) => props.updateMode(value)}
      />
    </Col>
  </div>
);
GroundAlarmFilters.propTypes = {
  viewId: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  updateMode: PropTypes.func.isRequired,
};

export default GroundAlarmFilters;
