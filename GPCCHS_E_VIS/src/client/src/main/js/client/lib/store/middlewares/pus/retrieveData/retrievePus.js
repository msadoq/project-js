import * as types from 'store/types';
import executionMonitor from 'common/logManager/execution';
import { PREFIX_PUS } from 'constants';
import { add } from '../../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { sendArchiveQuery } from '../../../actions/pus/knownPus';

// TODO remove this and make a real callback
const makeCallback = () => () => {};

const retrievePus = ipc => ({ dispatch }) => next => (action) => {
  const execution = executionMonitor('middleware:retrievePus');

  if (action.type === types.VIEWS_NEED_PUS) {
    execution.start('global');
    const neededPus = action.payload.neededPusData;
    const ids = Object.keys(neededPus);
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      const { interval, dataId } = neededPus[ids[i]];

      const { apids } = dataId;

      const queryId = ipc.pus.initialize(
        {
          sessionId: dataId.sessionId,
          domainId: dataId.domainId,
          pusService: dataId.pusService, // type de pus 11, mme, 12 ...
          pusServiceApid: apids
            ? apids.map(apid => ({ value: apid.apidRawValue }))
            : null
          ,
        }, // header
        true, // forReplay
        interval[0], // firstTime,
        interval[1], // lastTime,
        false, // continuous,
        makeCallback()
      );

      add(queryId, id, PREFIX_PUS, dataId);
      dispatch(sendArchiveQuery(dataId.pusService, dataId, interval, false));
    }
    execution.stop('global');
    execution.print();
  }
  return next(action);
};

export default retrievePus;
