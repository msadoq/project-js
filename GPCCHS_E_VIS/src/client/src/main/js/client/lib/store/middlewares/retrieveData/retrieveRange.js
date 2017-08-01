import * as types from '../../types';
import { getRangesRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { newData } from '../../actions/incomingData';
import ipc from '../../../serverProcess/ipc';
import { getMissingIntervals } from '../../reducers/knownRanges';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { sendArchiveQuery } from '../../actions/knownRanges';

const type = 'RANGE';

const retrieveRange = () => ({ dispatch, getState }) => next => (action) => {
  if (action.type === types.VIEWS_NEED_RANGE) {
    console.log(action);
    // console.log('[retrieveRange] VIEWS_NEED_RANGE action');
    const neededRange = action.payload.neededRangeData;
    const tbdIds = Object.keys(neededRange);
    for (let i = 0; i < tbdIds.length; i += 1) {
      const tbdId = tbdIds[i];
      const { dataId, filters, intervals } = neededRange[tbdIds[i]];
      const rangesRecords = getRangesRecords(tbdId, intervals);
      if (Object.keys(rangesRecords[tbdId]).length !== 0) dispatch(newData(rangesRecords));


      for (let k = 0; k < intervals.length; k += 1){
        const missingIntervals = getMissingIntervals(getState(), { tbdId, queryInterval: intervals[k] });
        for (let j = 0; j < missingIntervals.length; j += 1){
          // TODO pgaucher :  no filters here ?
          const queryId = ipc.dc.requestTimebasedQuery(tbdId, dataId, missingIntervals[j], { filters });
          add(queryId, tbdId, type, dataId);
          console.log('query Id : ', queryId);
        }
        dispatch(sendArchiveQuery(tbdId, dataId, missingIntervals, filters));
      }
    }
  }
  return next(action);
};

export default retrieveRange;
