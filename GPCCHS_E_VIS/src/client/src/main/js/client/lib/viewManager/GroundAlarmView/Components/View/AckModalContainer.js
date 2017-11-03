import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AckModal from './AckModal';

import { sendAlarmAck } from '../../store/actions';
import { getData } from '../../store/dataReducer';

const getAlarmsByTimestamps = createSelector(
  getData,
  (state, { alarmsTimestamps }) => alarmsTimestamps,
  (data, alarmsTimestamps) => (
    alarmsTimestamps.map(ts => data.lines[ts])
  )
);

const mapStateToProps = createStructuredSelector({
  alarms: getAlarmsByTimestamps,
});

const mapDispatchToProps = {
  sendAck: sendAlarmAck,
};

export default connect(mapStateToProps, mapDispatchToProps)(AckModal);
