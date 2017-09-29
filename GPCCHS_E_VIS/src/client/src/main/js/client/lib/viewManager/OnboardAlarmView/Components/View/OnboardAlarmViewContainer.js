import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import OnboardAlarmView from './OnboardAlarmView';
import { getAlarmDomain, getAlarmTimeline } from '../../store/configurationSelectors';
import { getData } from '../../store/dataReducer';


const mapStateToProps = createStructuredSelector({
  data: getData,
  alarmDomain: getAlarmDomain,
  alarmTimeline: getAlarmTimeline,
});

const OnboardAlarmViewContainer = connect(mapStateToProps)(OnboardAlarmView);

OnboardAlarmViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default OnboardAlarmViewContainer;
