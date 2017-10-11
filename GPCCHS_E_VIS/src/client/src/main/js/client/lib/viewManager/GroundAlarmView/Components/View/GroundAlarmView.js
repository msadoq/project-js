import React from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';

// import * as constants from '../../../../constants';
import Table from './Table';

// const MODES = [
//   constants.ALARM_MODE_ALL,
//   constants.ALARM_MODE_NONNOMINAL,
//   constants.ALARM_MODE_TOACKNOWLEDGE,
// ];

const GroundAlarmFilters = () => (
  <div>
    <Col xs={4}>Timeline <Select /></Col>
    <Col xs={4}>Domain <Select /></Col>
    <Col xs={4}>Mode<Select /></Col>
  </div>
);

/* eslint-disable react/prefer-stateless-function */
class GroundAlarmView extends React.Component {
  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GroundAlarmFilters />
        <Table {...this.props} />
      </div>
    );
  }
}

export default GroundAlarmView;
