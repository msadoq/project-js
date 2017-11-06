import _ from 'lodash/fp';
import * as types from '../../types';
import dataMapGenerator from '../../../dataManager/map';

const makeAckMiddleware = requestAck => ({ getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.WS_VIEW_GMA_ALARM_ACK) {
    const { viewId, alarms, comment } = action.payload;
    const dataMap = dataMapGenerator(getState());
    const { dataId, tbdId } = dataMap.perView[viewId].entryPoints.groundAlarmEP;
    const alarmsOids = _.map(_.pick('oid'), alarms);
    alarmsOids.forEach(({ oid }) => {
      requestAck(tbdId, dataId, [{ oid, ackRequest: { comment } }], _.noop);
    });
  }
  return nextAction;
};

export default makeAckMiddleware;
