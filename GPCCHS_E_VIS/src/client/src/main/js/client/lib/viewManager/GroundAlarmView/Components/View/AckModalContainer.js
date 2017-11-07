import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AckModal from './AckModal';

import { sendAlarmAck } from '../../store/actions';
import { getData, getAckStatus } from '../../store/dataReducer';

const getAlarmsByTimestamps = createSelector(
  getData,
  (state, { alarmsTimestamps }) => alarmsTimestamps,
  (data, alarmsTimestamps) => (
    alarmsTimestamps.map(ts => data.lines[ts])
  )
);

const mapStateToProps = createStructuredSelector({
  alarms: getAlarmsByTimestamps,
  ackStatus: getAckStatus,
});

const mapDispatchToProps = (dispatch, { viewId, ackId }) => ({
  sendAck: (alarms, comment) => (
    dispatch(sendAlarmAck(viewId, ackId, alarms, comment))
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  sendAck: comment => dispatchProps.sendAck(stateProps.alarms, comment),
  ackType: 'gma',
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AckModal);
