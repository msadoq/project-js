import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { sendAlarmAck } from 'viewManager/GroundAlarmView/store/actions';
import { getAckStatus } from 'viewManager/GroundAlarmView/store/uiReducer';
import { getData } from 'viewManager/GroundAlarmView/store/dataReducer';

import AckModal from './AckModal';

const getAlarmLabel = ({ parameterName, lastOccurence }) => `${parameterName} - ${lastOccurence}`;

const getAlarmsByOids = createSelector(
  getData,
  (state, { alarmsOids }) => alarmsOids,
  (data, alarmsOids) => (
    alarmsOids.map(oid => ({
      ...data.lines[oid],
      label: getAlarmLabel(data.lines[oid]),
    }))
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
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AckModal);
