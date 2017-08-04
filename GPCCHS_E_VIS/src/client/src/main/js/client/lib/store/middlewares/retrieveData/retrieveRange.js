import * as types from '../../types';
import { getRangesRecords } from '../../../serverProcess/models/lokiKnownRangesData';
import { newData } from '../../actions/incomingData';
import ipc from '../../../serverProcess/ipc';
import { getMissingIntervals } from '../../reducers/knownRanges';
import { add } from '../../../serverProcess/models/registeredArchiveQueriesSingleton';
import { sendArchiveQuery } from '../../actions/knownRanges';
import mergeIntervals from '../../../common/intervals/merge';

const type = 'RANGE';

const retrieveRange = () => ({ dispatch, getState }) => next => (action) => {
  if (action.type === types.VIEWS_NEED_RANGE) {
    // console.log('[retrieveRange] VIEWS_NEED_RANGE action');
    const neededRange = action.payload.neededRangeData;
    const tbdIds = Object.keys(neededRange);
    // console.log('DEBUT RETIEVE RANGE-----------------------');
    for (let i = 0; i < tbdIds.length; i += 1) {
      // console.log('---' + i + '-----------------------');
      const tbdId = tbdIds[i];
      const { dataId, filters, intervals } = neededRange[tbdIds[i]];
      
      const d1 = new Date(intervals[0][0]);
      const d2 = new Date(intervals[0][1]);


      // console.log('Need range : ', d1.getHours() + ":" + d1.getMinutes() + ":" + d1.getSeconds() , d2.getHours() + ":" + d2.getMinutes() + ":" + d2.getSeconds());
      const rangesRecords = getRangesRecords(tbdId, intervals);
      if (Object.keys(rangesRecords[tbdId]).length !== 0) {
        // console.log('Some data is already present in loki, dipatching new data');
        dispatch(newData(rangesRecords));
      }

      let mergedInterval = [];
      for (let k = 0; k < intervals.length; k += 1){
        const missingIntervals = getMissingIntervals(getState(), { tbdId, queryInterval: intervals[k] });
        
        if (missingIntervals.length !== 0) {
          const d3 = new Date(missingIntervals[0][0]);
          const d4 = new Date(missingIntervals[0][1]);
          // console.log('Missing intervals : ', d3.getHours() + ":" + d3.getMinutes() + ":" + d3.getSeconds() , d4.getHours() + ":" + d4.getMinutes() + ":" + d4.getSeconds());
        }
        
        for (let j = 0; j < missingIntervals.length; j += 1) {
          // console.log('fileters : ', filters);
          const queryId = ipc.dc.requestTimebasedQuery(tbdId, dataId, missingIntervals[j], { filters });
          add(queryId, tbdId, type, dataId);
        }
        mergedInterval = mergeIntervals(mergedInterval, missingIntervals);
      }
      dispatch(sendArchiveQuery(tbdId, dataId, mergedInterval, filters));
    }
    // console.log('fin RETIEVE RANGE-----------------------');
  }
  return next(action);
};

export default retrieveRange;
