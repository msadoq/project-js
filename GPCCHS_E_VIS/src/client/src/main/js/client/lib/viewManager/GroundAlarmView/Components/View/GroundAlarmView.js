import React, { PropTypes } from 'react';
import withDimensions from 'windowProcess/common/hoc/withDimensions';

import GroundAlarmTable from './table/GroundAlarmTableContainer';

const GroundAlarmView = props => (
  <div className="h100 w100 posRelative">
    <GroundAlarmTable {...props} containerHeight={props.containerHeight} />
  </div>
);
GroundAlarmView.propTypes = {
  containerHeight: PropTypes.number.isRequired,
};

export default withDimensions({ elementResize: true })(GroundAlarmView);
