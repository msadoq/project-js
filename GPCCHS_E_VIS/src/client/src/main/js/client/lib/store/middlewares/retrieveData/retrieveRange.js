import * as types from '../../types';
import { getRangesRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { newData } from '../../actions/incomingData';
import constants from '../../../constants';

import { getMissingIntervals } from '../../reducers/knownRanges';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { sendArchiveQuery } from '../../actions/knownRanges';
import mergeIntervals from '../../../common/intervals/merge';
import executionMonitor from '../../../common/logManager/execution';

const type = 'RANGE';

const retrieveRange = ipc => ({ dispatch, getState }) => next => (action) => {
  const execution = executionMonitor('middleware:retrieveRange');
  const nextAction = next(action);

  if (action.type === types.VIEWS_NEED_RANGE) {
    execution.start('global');
    const neededRange = action.payload.neededRangeData;
    const tbdIds = Object.keys(neededRange);

    for (let i = 0; i < tbdIds.length; i += 1) {
      const tbdId = tbdIds[i];
      const { dataId, filters, intervals } = neededRange[tbdIds[i]];
      const rangesRecords = getRangesRecords(tbdId, intervals);
      if (Object.keys(rangesRecords[tbdId]).length !== 0) {
        dispatch(newData(rangesRecords));
      }

      let mergedInterval = [];
      for (let k = 0; k < intervals.length; k += 1) {
        execution.start('get missing intervals');
        const missingIntervals = getMissingIntervals(getState(),
          { tbdId,
            queryInterval: intervals[k],
          });
        execution.stop('get missing intervals');

        for (let j = 0; j < missingIntervals.length; j += 1) {
          let queryId;
          if (dataId.comObject === 'groundMonitoringAlarm') {
            queryId = ipc.dc.requestAlarmQuery(
              tbdId,
              dataId,
              constants.GROUND_TYPE,
              constants.ALARM_MODE_ALL,
              missingIntervals[j]
            );
          } else {
            queryId = ipc.dc.requestTimebasedQuery(
              tbdId,
              dataId,
              missingIntervals[j],
              { filters }
            );
          }

          add(queryId, tbdId, type, dataId);
        }

        execution.start('merge interval');
        mergedInterval = mergeIntervals(mergedInterval, missingIntervals);
        execution.stop('merge interval');
      }
      if (mergedInterval.length !== 0) {
        dispatch(sendArchiveQuery(tbdId, dataId, mergedInterval, filters));
      }
    }
    execution.stop('global');
    execution.print();
  }
  return nextAction;
};

export default retrieveRange;
