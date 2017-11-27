import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AckModal from './AckModal';
import { sendAlarmAck } from '../../store/actions';
import { getAckStatus } from '../../store/uiReducer';

import { getData } from '../../store/dataReducer';

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
    dispatch(sendAlarmAck(viewId, ackId, alarms, comment, 'gma'))
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  sendAck: comment => dispatchProps.sendAck(stateProps.alarms, comment),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AckModal);
