import React from 'react';
import GroundAlarmFilters from './GroundAlarmFilters';
import GroundAlarmTable from './GroundAlarmTable';

const GroundAlarmView = props => (
  <div style={{ height: '100%', width: '100%' }}>
    <GroundAlarmFilters {...props} />
    <GroundAlarmTable {...props} />
  </div>
);

export default GroundAlarmView;
