import _ from 'lodash/fp';
import { v4 } from 'uuid';
import * as types from 'store/types';
import { openInCurrentWindow as openModalInCurrentWindow } from 'store/actions/modals';

export const openAckModal = (viewId, alarmsOids) => {
  const ackId = v4();
  return openModalInCurrentWindow({
    type: 'gmaAck',
    title: 'Ground Monitoring Alarm',
    ackId,
    viewId,
    alarmsOids,
  });
};

export const sendAlarmAck = (viewId, ackId, alarms, comment) => ({
  type: types.WS_VIEW_ALARM_ACK,
  payload: {
    viewId,
    ackId,
    alarms: _.isArray(alarms) ? alarms : [alarms],
    comment,
  },
});

export const ackSuccess = (viewId, ackId, oid) => ({
  type: types.WS_VIEW_ALARM_ACK_SUCCESS,
  payload: {
    viewId,
    ackId,
    oid,
  },
});

export const ackFailure = (viewId, ackId, oid, error = '') => ({
  type: types.WS_VIEW_ALARM_ACK_FAILURE,
  payload: {
    viewId,
    ackId,
    oid,
    error,
  },
});

export const toggleSelection = (viewId, oid) => ({
  type: types.WS_VIEW_ALARM_TOGGLE_SELECTION,
  payload: {
    viewId,
    oid,
  },
});

export const toggleSort = (viewId, column) => ({
  type: types.WS_VIEW_ALARM_TOGGLE_SORT,
  payload: {
    viewId,
    column,
  },
});

export const collapseAlarm = (viewId, oid) => ({
  type: types.WS_VIEW_ALARM_COLLAPSE,
  payload: { viewId, oid },
});

export const uncollapseAlarm = (viewId, oid) => ({
  type: types.WS_VIEW_ALARM_UNCOLLAPSE,
  payload: { viewId, oid },
});
