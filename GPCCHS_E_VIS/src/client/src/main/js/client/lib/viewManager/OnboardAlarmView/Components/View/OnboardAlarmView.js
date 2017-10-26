import React, { PropTypes } from 'react';
import OnboardAlarmFilters from './OnboardAlarmFilters';
import OnboardAlarmTable from './table/OnboardAlarmTableContainer';

import withDimensions from '../../../../windowProcess/common/hoc/withDimensions';

const HEADER_HEIGHT = 50; // in pixel

const OnboardAlarmView = props => (
  <div className="h100 w100 posRelative">
    <OnboardAlarmFilters {...props} height={HEADER_HEIGHT} />
    <OnboardAlarmTable {...props} containerHeight={props.containerHeight - HEADER_HEIGHT} />
  </div>
);
OnboardAlarmView.propTypes = {
  containerHeight: PropTypes.number.isRequired,
};

export default withDimensions({ elementResize: true })(OnboardAlarmView);
