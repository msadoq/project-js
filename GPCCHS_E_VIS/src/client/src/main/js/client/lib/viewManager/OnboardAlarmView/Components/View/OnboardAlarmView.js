import React, { PropTypes } from 'react';
import withDimensions from 'windowProcess/common/hoc/withDimensions';

import OnboardAlarmTable from './table/OnboardAlarmTableContainer';

const OnboardAlarmView = props => (
  <div className="h100 w100 posRelative">
    <OnboardAlarmTable {...props} containerHeight={props.containerHeight} />
  </div>
);
OnboardAlarmView.propTypes = {
  containerHeight: PropTypes.number.isRequired,
};

export default withDimensions({ elementResize: true })(OnboardAlarmView);
