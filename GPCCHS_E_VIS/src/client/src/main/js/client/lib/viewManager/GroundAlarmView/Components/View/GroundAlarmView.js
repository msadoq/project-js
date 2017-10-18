import React, { PropTypes } from 'react';
import GroundAlarmFilters from './GroundAlarmFilters';
import GroundAlarmTable from './table/GroundAlarmTableContainer';

import withDimensions from '../../../../windowProcess/common/hoc/withDimensions';

const HEADER_HEIGHT = 50; // in pixel

const GroundAlarmView = props => (
  <div className="h100 w100 posRelative">
    <GroundAlarmFilters height={HEADER_HEIGHT} viewId={props.viewId} />
    <GroundAlarmTable
      containerWidth={props.containerWidth}
      containerHeight={props.containerHeight - HEADER_HEIGHT}
      viewId={props.viewId}
    />
  </div>
);
GroundAlarmView.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  viewId: PropTypes.string.isRequired,
};

export default withDimensions({ elementResize: true })(GroundAlarmView);
