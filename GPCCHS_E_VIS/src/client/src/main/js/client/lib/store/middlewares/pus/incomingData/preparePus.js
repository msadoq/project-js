import * as types from 'store/types';
import { newPusData } from 'store/actions/pus';
import executionMonitor from 'common/logManager/execution';
import { PREFIX_PUS } from 'constants';

// TODO @jmira finish when stub works, for now always dispatch new (non encoded) pus data
const preparePus = lokiManager => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type !== types.INCOMING_PUS_DATA) {
    return nextAction;
  }

  const execution = executionMonitor('middleware:preparePus');

  const data = action.payload.data;
  const pusId = 'OBRIT:4:0';
  const timestamp = Date.now();

  execution.start('addRecord');
  lokiManager.addRecord(PREFIX_PUS, pusId, { timestamp, payload: data });
  execution.stop('addRecord');

  dispatch(newPusData(data));

  return nextAction;
};

export default preparePus;
