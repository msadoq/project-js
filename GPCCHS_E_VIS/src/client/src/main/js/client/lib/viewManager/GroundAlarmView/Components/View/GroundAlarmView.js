import React, { PropTypes } from 'react';
import GroundAlarmFilters from './GroundAlarmFilters';
import GroundAlarmTable from './GroundAlarmTable';

const GroundAlarmView = props => (
  <div style={{ height: '100%', width: '100%' }}>
    <GroundAlarmFilters viewId={props.viewId} />
    <GroundAlarmTable {...props} />
  </div>
);
GroundAlarmView.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default GroundAlarmView;
