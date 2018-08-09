import * as types from 'store/types';
// import { PREFIX_PUS_MODELS, PREFIX_PUS_DELTA } from 'constants';
import executionMonitor from 'common/logManager/execution';
import { PREFIX_PUS } from 'constants';
import { getMissingIntervals } from '../../../reducers/pus';
import mergeIntervals from '../../../../common/intervals/merge';
import { add } from '../../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { sendArchiveQuery } from '../../../actions/pus/knownPus';

// TODO remove this and make a real callback
const makeCallback = () => () => {};

const retrievePus = ipc => ({ dispatch, getState }) => next => (action) => {
  const execution = executionMonitor('middleware:retrievePus');
  const nextAction = next(action);

  if (action.type === types.VIEWS_NEED_PUS) {
    execution.start('global');
    const neededPus = action.payload.neededPusData;
    const ids = Object.keys(neededPus);
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      const { intervals, dataId } = neededPus[ids[i]];

      const { apids } = dataId;
      const apidRawValues = apids.map(apid => ({ value: apid.apidRawValue }));

      let mergedInterval = [];
      for (let k = 0; k < intervals.length; k += 1) {
        execution.start('get missing intervals');
        const missingIntervals = getMissingIntervals(getState(),
          { pusService: dataId.pusService, pusId: id, queryInterval: intervals[k] }
        );
        execution.stop('get missing intervals');

        for (let j = 0; j < missingIntervals.length; j += 1) {
          const queryId = ipc.pus.initialize(
            {
              sessionId: dataId.sessionId,
              domainId: dataId.domainId,
              pusService: dataId.pusService, // type de pus 11, mme, 12 ...
              pusServiceApid: apidRawValues, // apids
            }, // header
            false, // forReplay
            missingIntervals[j][0], // firstTime,
            missingIntervals[j][1], // lastTime,
            false, // continuous,
            makeCallback()
          );

          add(queryId, id, PREFIX_PUS, dataId);
        }

        execution.start('merge interval');
        mergedInterval = mergeIntervals(mergedInterval, missingIntervals);
        execution.stop('merge interval');
      }
      if (mergedInterval.length !== 0) {
        dispatch(sendArchiveQuery(dataId.pusService, id, dataId, mergedInterval));
      }
    }
    execution.stop('global');
    execution.print();
  }
  return nextAction;
};

export default retrievePus;
