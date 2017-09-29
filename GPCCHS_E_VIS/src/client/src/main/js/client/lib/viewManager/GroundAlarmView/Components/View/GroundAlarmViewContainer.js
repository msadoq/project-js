import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmView from './GroundAlarmView';
import { getDomainAlarm, getSessionAlarm } from '../../store/configurationSelectors';
import { getData } from '../../store/dataReducer';


const mapStateToProps = createStructuredSelector({
  data: getData,
  domainAlarm: getDomainAlarm,
  sessionAlarm: getSessionAlarm,
});

const GroundAlarmViewContainer = connect(mapStateToProps)(GroundAlarmView);

GroundAlarmViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default GroundAlarmViewContainer;
