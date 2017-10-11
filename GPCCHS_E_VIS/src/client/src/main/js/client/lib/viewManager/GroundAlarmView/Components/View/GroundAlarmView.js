import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';

import * as constants from '../../../../constants';
import Table from './Table';

const MODES = [
  { value: constants.ALARM_MODE_ALL, label: 'All' },
  { value: constants.ALARM_MODE_NONNOMINAL, label: 'Non nominal' },
  { value: constants.ALARM_MODE_TOACKNOWLEDGE, label: 'To Acknowledge' },
];

const GroundAlarmFilters = ({ mode, updateMode }) => (
  <div>
    <Col xs={4}>Timeline <Select /></Col>
    <Col xs={4}>Domain <Select /></Col>
    <Col xs={4}>
      Mode
      <Select
        clearable={false}
        options={MODES}
        value={mode}
        onChange={({ value }) => updateMode(value)}
      />
    </Col>
  </div>
);
GroundAlarmFilters.propTypes = {
  mode: PropTypes.string.isRequired,
  updateMode: PropTypes.func.isRequired,
};

/* eslint-disable react/prefer-stateless-function */
class GroundAlarmView extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    updateMode: PropTypes.func.isRequired,
    domain: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GroundAlarmFilters
          mode={this.props.mode}
          updateMode={this.props.updateMode}
          domain={this.props.domain}
          timeline={this.props.timeline}
        />
        <Table {...this.props} />
      </div>
    );
  }
}

export default GroundAlarmView;
