import _ from 'lodash/fp';
import async from 'async';
import * as types from '../../types';
import dataMapGenerator from '../../../dataManager/map';
import { add as addMessage } from '../../actions/messages';
import {
  ackSuccess as gmaSuccess,
  ackFailure as gmaFailure,
} from '../../../viewManager/GroundAlarmView/store/actions';

// import {
//   ackSuccess as obaSuccess,
//   ackFailure as obaFailure,
// } from '../../../viewManager/OnboardAlarmView/store/actions';

const ackAction = {
  gma: types.WS_VIEW_GMA_ALARM_ACK,
  oba: types.WS_VIEW_OBA_ALARM_ACK,
};

const epName = {
  gma: 'groundAlarmEP',
  oba: 'onboardAlarmEP',
};

const ackSuccess = {
  gma: gmaSuccess,
  oba: () => ({ type: 'UNKNOWN' }),
};

const ackFailure = {
  gma: gmaFailure,
  oba: () => ({ type: 'UNKNOWN' }),
};

const getNbSuccess = _.compose(_.size, _.filter(_.equals(true)));

const makeAckMiddleware = (requestAck, ackType = 'gma') => ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === ackAction[ackType]) {
    const { viewId, ackId, alarms, comment } = action.payload;
    const dataMap = dataMapGenerator(getState());
    const { dataId, tbdId } = dataMap.perView[viewId].entryPoints[epName[ackType]];
    const requests = alarms.map(({ oid, timestamp }) => (
      (cb) => {
        requestAck(tbdId, dataId, [{ oid, ackRequest: { comment } }], (err) => {
          if (err) {
            dispatch(ackFailure[ackType](viewId, ackId, timestamp));
            dispatch(addMessage('global', 'danger', `Acknowledging error : ${err}`));
            cb(null, false);
            return;
          }
          dispatch(ackSuccess[ackType](viewId, ackId, timestamp));
          cb(null, true);
        });
      }
    ));
    async.parallel(requests, (err, results) => {
      const nbSuccess = getNbSuccess(results);
      dispatch(addMessage('global', 'success', `${nbSuccess} alarms successfully acknowledged`));
    });
  }
  return nextAction;
};

export default makeAckMiddleware;
