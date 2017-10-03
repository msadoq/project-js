import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmView from './GroundAlarmView';
import { getAlarmDomain, getAlarmTimeline } from '../../store/configurationSelectors';
import { getData } from '../../store/dataReducer';

import withStub from './withStub';

const mapStateToProps = createStructuredSelector({
  data: getData,
  alarmDomain: getAlarmDomain,
  alarmTimeline: getAlarmTimeline,
});

const GroundAlarmViewContainer = connect(mapStateToProps)(GroundAlarmView);

GroundAlarmViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default withStub()(GroundAlarmViewContainer);
