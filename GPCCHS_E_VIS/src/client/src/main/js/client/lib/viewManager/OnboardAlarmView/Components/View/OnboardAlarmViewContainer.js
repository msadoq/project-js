import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import OnboardAlarmView from './OnboardAlarmView';
import { getDomainAlarm, getSessionAlarm } from '../../store/configurationSelectors';
import { getData } from '../../store/dataReducer';


const mapStateToProps = createStructuredSelector({
  data: getData,
  domainAlarm: getDomainAlarm,
  sessionAlarm: getSessionAlarm,
});

const OnboardAlarmViewContainer = connect(mapStateToProps)(OnboardAlarmView);

OnboardAlarmViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default OnboardAlarmViewContainer;
