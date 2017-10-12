import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';

import DomainFilter from './filters/DomainFilterContainer';
import ModeFilter from './filters/ModeFilterContainer';

const GroundAlarmFilters = ({ viewId }) => (
  <div>
    <Col xs={4}>Timeline <Select /></Col>
    <Col xs={4}>
      <DomainFilter viewId={viewId} />
    </Col>
    <Col xs={4}>
      <ModeFilter viewId={viewId} />
    </Col>
  </div>
);
GroundAlarmFilters.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default GroundAlarmFilters;
