import _ from 'lodash/fp';
import async from 'async';
import { ALARM_ACK_TIMEOUT } from 'constants';
import { ackSuccess, ackFailure } from 'viewManager/GroundAlarmView/store/actions';
import * as types from 'store/types';
import dataMapGenerator from 'dataManager/map';
import { add as addMessage } from 'store/actions/messages';

const getAlarmEntryPoint = entryPoints => (
  entryPoints.groundAlarmEP || entryPoints.onboardAlarmEP
);

const getNbSuccess = _.compose(_.size, _.filter(_.equals(true)));

const makeAckMiddleware = requestAck => ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.WS_VIEW_ALARM_ACK) {
    const { viewId, ackId, alarms, comment } = action.payload;
    const dataMap = dataMapGenerator(getState());
    const { entryPoints } = dataMap.perView[viewId];
    const { dataId, tbdId } = getAlarmEntryPoint(entryPoints);
    const requests = alarms.map(({ oid }) => {
      const failure = (err, cb) => {
        dispatch(ackFailure(viewId, ackId, oid, err));
        dispatch(addMessage('global', 'danger', `Acknowledging error : ${err}`));
        cb(null, false);
      };
      return (cb) => {
        const timeoutId = setTimeout(() => failure('Timeout', cb), ALARM_ACK_TIMEOUT * 1000);
        requestAck(tbdId, dataId, [{ oid, ackRequest: { comment } }], (err) => {
          clearTimeout(timeoutId);
          if (err) {
            return failure(err, cb);
          }
          dispatch(ackSuccess(viewId, ackId, oid));
          return cb(null, true);
        });
      };
    });
    async.parallel(requests, (err, results) => {
      const nbSuccess = getNbSuccess(results);
      if (nbSuccess > 0) {
        dispatch(addMessage('global', 'success', `${nbSuccess} alarm${nbSuccess === 1 ? '' : 's'} successfully acknowledged`));
      }
    });
  }
  return nextAction;
};

export default makeAckMiddleware;
