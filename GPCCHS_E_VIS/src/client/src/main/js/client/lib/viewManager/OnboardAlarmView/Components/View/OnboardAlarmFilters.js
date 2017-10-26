import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';

import TimelineFilter from './filters/TimelineFilterContainer';
import DomainFilter from './filters/DomainFilterContainer';
import ModeFilter from './filters/ModeFilterContainer';

const OnboardAlarmFilters = ({ viewId, height }) => (
  <div style={{ height: `${height}px` }} >
    <Col xs={4}>
      <TimelineFilter viewId={viewId} />
    </Col>
    <Col xs={4}>
      <DomainFilter viewId={viewId} />
    </Col>
    <Col xs={4}>
      <ModeFilter viewId={viewId} />
    </Col>
  </div>
);
OnboardAlarmFilters.propTypes = {
  viewId: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default OnboardAlarmFilters;
