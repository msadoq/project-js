import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AckModal from '../../../GroundAlarmView/Components/View/AckModal';

import { sendAlarmAck } from '../../store/actions';
import { getData, getAckStatus } from '../../store/dataReducer';

const getAlarmsByOids = createSelector(
  getData,
  (state, { alarmsOids }) => alarmsOids,
  (data, alarmsOids) => (
    alarmsOids.map(ts => data.lines[ts])
  )
);

const mapStateToProps = createStructuredSelector({
  alarms: getAlarmsByOids,
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
  ackType: 'oba',
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AckModal);
