import * as types from '../../types';
import { getRangesRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { newData } from '../../actions/incomingData';

import { getMissingIntervals } from '../../reducers/knownRanges';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { sendArchiveQuery } from '../../actions/knownRanges';
import mergeIntervals from '../../../common/intervals/merge';

const type = 'RANGE';

const retrieveRange = ipc => ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.VIEWS_NEED_RANGE) {
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
        const missingIntervals = getMissingIntervals(getState(),
          { tbdId,
            queryInterval: intervals[k],
          });
        for (let j = 0; j < missingIntervals.length; j += 1) {
          const queryId = ipc.dc.requestTimebasedQuery(tbdId,
                                                       dataId,
                                                       missingIntervals[j],
                                                       { filters });
          add(queryId, tbdId, type, dataId);
        }
        mergedInterval = mergeIntervals(mergedInterval, missingIntervals);
      }
      if (mergedInterval.length !== 0) {
        dispatch(sendArchiveQuery(tbdId, dataId, mergedInterval, filters));
      }
    }
  }
  return nextAction;
};

export default retrieveRange;
